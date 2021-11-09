import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Input from "../Input";
import { useResizeDetector } from "react-resize-detector";
import { GridItem, Grid, Flex, Text } from "@chakra-ui/react";
import { Row } from "./row";

import { useMultipleStringVarpathsSelector } from "redux/selectors.js";

import {
  revealInputBlurEventFactory,
  revealInputKeyDownEventFactory,
  revealInputClickEventFactory
} from "../../util/events-utilities";

import {
  inputsPaneResizeSettings
} from "../../util/component-utilities";

import {
  formatDisplayNumber
} from "../../util/form-utilities";

import {
  getVarPathFull,
} from "../forms/form-elements";

export const StyledText = styled(Text)`
  cursor: pointer;
`;

const EmissionInputs = ({ color, technologyId }) => {
  const { width, ref } = useResizeDetector();

  const map = {
    directEmissions: getVarPathFull("technologies", technologyId, "emissions_per_funit", true),
    indireectEmissions: getVarPathFull("technologies", technologyId, "indirect_co2_per_iunit", true)
  };

  const workbookState = useSelector(state => state.workbook);
  const { workbook } = workbookState;
  const [inputState, setInputState] = useState(false);
  const [cols, setCols] = useState(inputsPaneResizeSettings(400));
  const values = useMultipleStringVarpathsSelector(Object.values(map));

  const onBlur = revealInputBlurEventFactory(
    setInputState,
    technologyId,
    workbook,
    values
  );

  const onKeyDown = revealInputKeyDownEventFactory(
    setInputState,
    onBlur,
    values
  );

  const onClick = revealInputClickEventFactory(setInputState);

  useEffect(() => setCols(inputsPaneResizeSettings(width)), [width]);

  return (
    <Grid w="100%" ref={ref} gap={cols.gap} templateColumns={cols.template}>
      <GridItem px="1rem" colSpan={cols.leftCol}>
        <Flex h="100%" alignItems="center">
          <Text fontWeight="bold" fontSize="md">
            Direct Emissions
          </Text>
        </Flex>
      </GridItem>
      <GridItem px={cols.xPadding} colSpan={cols.rightCol}>
        <Flex h="100%" alignItems="center" justifyContent={cols.align}>
          {inputState === map.directEmissions ? (
            <Row
              varpath="emissions_per_funit.value"
              dataType="numeric"
              rightAddon="tCO2"
              color={color}
              chart={false}
              helper={false}
              question={false}
              colSpanLeft={0}
              colSpanRight={10}
            />
          ) : (
            <StyledText
              fontSize="2xl"
              onClick={() => onClick(map.directEmissions)}
            >
              <strong>{formatDisplayNumber(values[map.directEmissions])}</strong>
              &nbsp;tCO2
            </StyledText>
          )}
        </Flex>
      </GridItem>
      <GridItem px="1rem" colSpan={cols.leftCol}>
        <Flex h="100%" alignItems="center">
          <Text fontWeight="bold" fontSize="md">
            Indirect Emissions
          </Text>
        </Flex>
      </GridItem>
      <GridItem px={cols.xPadding} colSpan={cols.rightCol}>
        <Flex h="100%" alignItems="center" justifyContent={cols.align}>
          {inputState === map.indireectEmissions ? (
            <Row
              varpath="indirect_co2_per_iunit.value"
              dataType="numeric"
              rightAddon="tCO2"
              color={color}
              chart={false}
              helper={false}
              question={false}
              colSpanLeft={0}
              colSpanRight={10}
            />
          ) : (
            <StyledText
              fontSize="2xl"
              onClick={() => onClick(map.indireectEmissions)}
            >
              <strong>{formatDisplayNumber(values[map.indireectEmissions])}</strong>
              &nbsp;tCO2
            </StyledText>
          )}
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default EmissionInputs;
