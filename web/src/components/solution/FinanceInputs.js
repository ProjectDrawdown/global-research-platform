import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Input from "../Input";
import { useResizeDetector } from "react-resize-detector";
import { GridItem, Grid, Flex, Text } from "@chakra-ui/react";
import { Row } from './row';
import {useDispatch} from "react-redux";
import {setCalculatedOff} from "../../redux/reducers/workbook/workbookSlice.js"

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

const FinanceInputs = ({ color, technologyId }) => {
  const { width, ref } = useResizeDetector();

  const map = {
    fixedCosts: getVarPathFull("technologies", technologyId, "start_year_cost", true),
    fixedOperatingCost: getVarPathFull("technologies", technologyId, "fixed_oper_cost_per_iunit", true),
    firstCostLearningRatet: getVarPathFull("technologies", technologyId, "first_cost_efficiency_rate"),
    variableOperatingCost: getVarPathFull("technologies", technologyId, "var_oper_cost_per_funit", true),
    fuelOperatingCost: getVarPathFull("technologies", technologyId, "fuel_cost_per_funit")
  };

  const workbookState = useSelector(state => state.workbook);
  const { workbook } = workbookState;
  const [inputState, setInputState] = useState(false);
  const [cols, setCols] = useState(inputsPaneResizeSettings(400));
  const values = useMultipleStringVarpathsSelector(Object.values(map));
  const dispatch = useDispatch();


  const onBlur = revealInputBlurEventFactory(
    setInputState,
    technologyId,
    workbook,
    values
  );

  const onBlurPercentage = revealInputBlurEventFactory(
    setInputState,
    technologyId,
    workbook,
    values,
    false,
    x => parseFloat(x) / 100
  );

  const onKeyDown = revealInputKeyDownEventFactory(
    setInputState,
    onBlur,
    values
  );

  const handleChange = () =>{
    dispatch(setCalculatedOff());
  }
  const onClick = revealInputClickEventFactory(setInputState);

  useEffect(() => setCols(inputsPaneResizeSettings(width)), [width]);

  return (
    <Grid w="100%" ref={ref} gap={cols.gap} templateColumns={cols.template}>
      <GridItem px="1rem" colSpan={cols.leftCol}>
        <Flex h="100%" alignItems="center">
          <Text fontWeight="bold" fontSize="md">
            Fixed costs
          </Text>
        </Flex>
      </GridItem>
      <GridItem px={cols.xPadding} colSpan={cols.rightCol}>
        <Flex h="100%" alignItems="center" justifyContent={cols.align}>
          {inputState === map.fixedCosts ? (
            <Row
              onChange={handleChange}
              varpath="start_year_cost.value"
              dataType="numeric"
              leftAddon="$"
              color={color}
              chart={false}
              helper={false}
              question={false}
              colSpanLeft={0}
              colSpanRight={10}
            />
          ) : (
            <StyledText fontSize="2xl" onClick={() => onClick(map.fixedCosts)}>
              $&nbsp;<strong>{formatDisplayNumber(values[map.fixedCosts])}</strong>
            </StyledText>
          )}
        </Flex>
      </GridItem>
      <GridItem px="1rem" colSpan={cols.leftCol}>
        <Flex h="100%" alignItems="center">
          <Text fontWeight="bold" fontSize="md">
            Fixed operating cost
          </Text>
        </Flex>
      </GridItem>
      <GridItem px={cols.xPadding} colSpan={cols.rightCol}>
        <Flex h="100%" alignItems="center" justifyContent={cols.align}>
          {inputState === map.fixedOperatingCost ? (
            <Row
              varpath="fixed_oper_cost_per_iunit.value"
              dataType="numeric"
              rightAddon="%"
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
              onClick={() => onClick(map.fixedOperatingCost)}
            >
              $&nbsp;
              <strong>{formatDisplayNumber(values[map.fixedOperatingCost])}</strong>
            </StyledText>
          )}
        </Flex>
      </GridItem>
      <GridItem px="1rem" colSpan={cols.leftCol}>
        <Flex h="100%" alignItems="center">
          <Text fontWeight="bold" fontSize="md">
            First cost learning rate
          </Text>
        </Flex>
      </GridItem>
      <GridItem px={cols.xPadding} colSpan={cols.rightCol}>
        <Flex h="100%" alignItems="center" justifyContent={cols.align}>
          {inputState === map.firstCostLearningRatet ? (
            <Row
              varpath="first_cost_efficiency_rate.value"
              dataType="numeric"
              rightAddon="%"
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
              onClick={() => onClick(map.firstCostLearningRatet)}
            >
              <strong>{formatDisplayNumber(values[map.firstCostLearningRatet] * 100)}</strong>
              &nbsp;%
            </StyledText>
          )}
        </Flex>
      </GridItem>
      <GridItem px="1rem" colSpan={cols.leftCol}>
        <Flex h="100%" alignItems="center">
          <Text fontWeight="bold" fontSize="md">
            Variable operating cost
          </Text>
        </Flex>
      </GridItem>
      <GridItem px={cols.xPadding} colSpan={cols.rightCol}>
        <Flex h="100%" alignItems="center" justifyContent={cols.align}>
          {inputState === map.variableOperatingCost ? (
            <Row
              varpath="var_oper_cost_per_funit.value"
              dataType="numeric"
              leftAddon="$"
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
              onClick={() => onClick(map.variableOperatingCost)}
            >
              $&nbsp;
              <strong>{formatDisplayNumber(values[map.variableOperatingCost])}</strong>
            </StyledText>
          )}
        </Flex>
      </GridItem>
      <GridItem px="1rem" colSpan={cols.leftCol} colStart={cols.offset}>
        <Flex h="100%" alignItems="center">
          <Text fontWeight="bold" fontSize="md">
            Fuel operating cost
          </Text>
        </Flex>
      </GridItem>
      <GridItem px={cols.xPadding} colSpan={cols.rightCol}>
        <Flex h="100%" alignItems="center" justifyContent={cols.align}>
          {inputState === map.fuelOperatingCost ? (
            <Row
              varpath="fuel_cost_per_funit.value"
              dataType="numeric"
              leftAddon="$"
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
              onClick={() => onClick(map.fuelOperatingCost)}
            >
              $&nbsp;<strong>{formatDisplayNumber(values[map.fuelOperatingCost])}</strong>
            </StyledText>
          )}
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default FinanceInputs;
