import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Input from "../Input";
import { useResizeDetector } from "react-resize-detector";
import { GridItem, Grid, Flex, Text } from "@chakra-ui/react";

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
            <Input
              mr="0"
              px="2"
              size="md"
              autoFocus
              overflow="hidden"
              leftAddon={"$"}
              color={`brand.${color}.900`}
              onFocus={e => e.currentTarget.select()}
              storeValue={values[map.fixedCosts]}
              onKeyDown={event => onKeyDown(event, map.fixedCosts)}
              onBlur={event => onBlur(event, map.fixedCosts)}
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
            <Input
              mr="0"
              px="2"
              size="md"
              autoFocus
              overflow="hidden"
              leftAddon={"$"}
              color={`brand.${color}.900`}
              onFocus={e => e.currentTarget.select()}
              storeValue={values[map.fixedOperatingCost]}
              onKeyDown={event => onKeyDown(event, map.fixedOperatingCost)}
              onBlur={event => onBlur(event, map.fixedOperatingCost)}
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
            <Input
              mr="0"
              px="2"
              size="md"
              autoFocus
              overflow="hidden"
              rightAddon={"%"}
              color={`brand.${color}.900`}
              onFocus={e => e.currentTarget.select()}
              storeValue={values[map.firstCostLearningRatet]}
              onKeyDown={event => onKeyDown(event, map.firstCostLearningRatet)}
              onBlur={event => onBlurPercentage(event, map.firstCostLearningRatet)}
              defaultIsFocused={true}
              formatInputValueFn= { x => (x.substr && x.substr(-1) === ".") ? x : (x * 100) }
              // This isn't currently called, but would be preferable to using onBlurPercentage:
              parseInputValueFn = { x => (x.substr && x.substr(-1) === ".") ? x : (x / 100) }
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
            <Input
              mr="0"
              px="2"
              size="md"
              autoFocus
              overflow="hidden"
              leftAddon={"$"}
              color={`brand.${color}.900`}
              onFocus={e => e.currentTarget.select()}
              storeValue={values[map.variableOperatingCost]}
              onKeyDown={event => onKeyDown(event, map.variableOperatingCost)}
              onBlur={event => onBlur(event, map.variableOperatingCost)}
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
            <Input
              mr="0"
              px="2"
              size="md"
              autoFocus
              overflow="hidden"
              leftAddon={"$"}
              color={`brand.${color}.900`}
              onFocus={e => e.currentTarget.select()}
              storeValue={values[map.fuelOperatingCost]}
              onKeyDown={event => onKeyDown(event, map.fuelOperatingCost)}
              onBlur={event => onBlur(event, map.fuelOperatingCost)}
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
