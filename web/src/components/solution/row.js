import React, { useState } from "react"
import {
  Grid,
  GridItem,
  Text,
  Collapse,
  useTheme
} from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import VMA from "./VMA"
import store from "../../redux/store"
import { useSelector } from "react-redux"
import { setActiveFormRow } from "../../redux/reducers/workbook/workbookUISlice"
import { QuestionBox } from "components/tools/QuestionBox"
import {
  BoundNumInput,
  BoundUSDInput,
  BoundPercentInput,
  BoundSelect,
  BoundSourceSelect,
  BoundBooleanSwitch,
  BoundTextarea
} from "components/forms/form-elements.js"

function getTechnologyCategoryID(technologyID) {
  // FIXME get category from technology dynamically
  // to do this we will need to do a bunch of things:
  // 1. create category ID strings for all sectors
  // 2. associate all solutions with the corresponding category ID
  // 3. resolve an issue where the schema uses `electricity_generation` but the brand styling uses `electricity`
  return "electricity_generation";
}

const MinichartDataType = (dataType) => {
  switch (dataType) {
    case "USD":
    case "percent":
    case "numeric":
      return true;
    default:
      return false;
  };
};

const VVMADataType = (dataType) => {
  switch (dataType) {
    case "USD":
    case "percent":
    case "numeric":
    case "select":
      return true;
    default:
      return false;
  };
};

const InputWidgetForDataType = ({dataType, ...props}) => {
  switch (dataType) {
    case "numeric":
      return (<BoundNumInput {...props} />);
    case "USD":
      return (<BoundUSDInput {...props} />);
    case "percent":
      return (<BoundPercentInput {...props} />);
    case "boolean":
      return (<BoundBooleanSwitch {...props} />);
    case "textarea":
      return (<BoundTextarea {...props} />);
    case "select":
      return (<BoundSelect {...props} />);
    case "source":
      return (<BoundSourceSelect {...props} />);
    default:
      return (<BoundNumInput {...props} />);
  };
};

export const StyledMinichartDiv = styled.div`
  display: inline-block;
  border: 1px solid #CBD5E0;
  transition: all 0.2s;
  font-size: 14px;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-radius: 3px;
  height: 2.5rem;
  width: 100%;
`;

export const StyledMinichartValue = styled.div`
  display: inline-block;
  position: relative;
  height: 100%;
  z-index: 10;
  width: 3px;
  top: 0;
`;

export const StyledMinichartRange = styled.div`
  display: inline-block;
  background: #CBD5E0;
  position: relative;
  z-index: 1;
  height: 80%;
  bottom: 10%;
`;

export const StyledMinichartConventional = styled.div`
  display: inline-block;
  background: #718096;
  position: relative;
  height: 100%;
  z-index: 10;
  width: 2px;
  top: 0;
`;

export const Minichart = ({
  color,
  start: startRef = 10,
  end: endRef = 90,
  val: valRef = 0,
  conVal: conValRef = 100
}) => {
  const theme = useTheme();
  const minMax = (number) => Math.min(100, Math.max(0, number));
  const [ start, end, val, conVal ] =
    [ startRef, endRef, valRef, conValRef ]
      .map(number => minMax(number));
  const width = Math.abs(end - start);
  if ( end - start < 0 ) {
    start = 100 - start;
  }
  const [ valueState, setValueState ] = useState({
    value: val,
    conValue: conVal,
    leftRange: {
      left: `${start}%`,
      width: `calc(${( width / 2 )}% - 2.5px)`,
      borderRight: "0.75px dashed #718096"
    },
    rightRange: {
      left: `${start}%`,
      width: `calc(${( width / 2 )}% - 2.5px)`,
      borderLeft: "0.75px dashed #718096"
    }
  });
  return (
    <StyledMinichartDiv>
      <StyledMinichartValue
        style={{
          background: theme.colors.brand[color][900],
          left: `${valueState.value}%`
        }} />
      <StyledMinichartRange style={valueState.leftRange} />
      <StyledMinichartRange style={valueState.rightRange} />
      <StyledMinichartConventional
        style={{
          left: `${( valueState.conValue - width )}%`
        }} />
    </StyledMinichartDiv>
  );
};

export const Row = ({
  label,
  onChange,
  InputWidget = InputWidgetForDataType,
  TooltipWidget,
  getValueFn,
  parseValueFn = val => val,
  formatValueFn = val => val,
  isSelected,
  varType = "technologies",
  activeTechnology,
  activeCategory,
  varpath,
  conventionalpath,
  dataType,
  question = true,
  helper = true,
  chart = true,
  spacings = true,
  colSpanLeft = 6,
  colSpanRight = 6,
  color,
  ...inputProps
}) => {
  const params = useParams();
  activeTechnology = activeTechnology || params.technologyId;
  if (varType === "categories") {
    activeCategory =
      activeCategory || getTechnologyCategoryID(activeTechnology);
  }

  const varpathFull =
    varType === "categories"
      ? `${varType}.${activeCategory}.${varpath}`
      : `${varType}.${activeTechnology}.${varpath}`;

  // Only select the activeRow so we don't do extra renders
  const activeRow = useSelector(state => state.workbookUI.activeFormRow);
  const isActive = activeRow === varpath;
  const setAsActive = () => {
    store.dispatch(setActiveFormRow(varpath));
  };
  // const conventionalValue = (workbookState && conventionalpath) ? workbookState.getVariableValue(conventionalpath, workbookState) : '';

  const [isHovered, setIsHovered] = useState(false);
  const [mouseDown, setMouseDDown] = useState(false);

  // TODO Can these be streamlined with hover groups in Chakra?
  const miniChart = () => chart && MinichartDataType(dataType);
  const showHelper = () => helper && VVMADataType(dataType) && isActive;
  const bottomSpacing = () => !spacings ? 0 : ( showHelper() ? 1 : 1.5 );
  const onFocus = () => setAsActive();

  return (
    <Grid
      tabIndex="-1"
      onFocus={onFocus}
    >
      <Grid
        gap={4}
        my={!spacings ? 0 : 1}
        templateColumns="repeat(12, 1fr)">
        <GridItem colSpan={colSpanLeft} my={2} textAlign="right" whiteSpace="nowrap">
          {question && TooltipWidget && ( isActive || isHovered ) && (
            <QuestionBox
              TooltipWidget={TooltipWidget}
            />
          )}
           <Text
              w={question && ( isActive || isHovered ) ? "calc(100% - 36px - 1rem)" : "100%"}
              d="inline-block"
              fontSize="14px"
              lineHeight="40px"
              fontWeight="700"
              verticalAlign="middle"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis">
              {label}
            </Text>
        </GridItem>
        <GridItem colSpan={miniChart() ? ( colSpanRight / 2 ) : colSpanRight} my={2}>
          <InputWidget
            dataType={dataType}
            colorScheme={color}
            varType={varType}
            varpath={varpath}
            activeTechnology={activeTechnology}
            width="100%"
            color={`brand.${color}.900`}
            {...inputProps} />
        </GridItem>
      </Grid>
      {showHelper() && (
        <Grid
          templateColumns="repeat(12, 1fr)">
          <GridItem colSpan={12}>
            <Collapse in={isActive}>
              <VMA
                dataType={dataType}
                technologyId={activeTechnology}
                varpath={varpath}
                varpathFull={varpathFull}
                right={0}
                color={color}
                onInputChange={onChange}
              />
            </Collapse>
          </GridItem>
        </Grid>
      )}
    </Grid>
  );
};
