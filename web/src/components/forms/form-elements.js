import React from "react";
import { useParams } from "react-router-dom";
import { VStack, Skeleton } from "@chakra-ui/react";
import styled from "styled-components"
import { InputWithAddons, Switch, Textarea, Select } from "../Input";
import store from "../../redux/store";
import { useSelector } from "react-redux";
import {
  doUpdateWorkbookVariationVariableThunk
} from "../../redux/reducers/workbook/workbookSlice";
import {
  useObjectPathSelector,
  useStringVarpathSelector,
  useWorkbookIsLoadedSelector,
  useWorkbookHasAuthorSelector
} from "redux/selectors.js";
import { sourcesObjectToOptionsArray } from "util/form-utilities.js"
import { QuestionBox, StyledParagraph } from "components/tools/QuestionBox"

const regions = [
  "World",
  "EU",
  "USA",
  "China",
  "India",
  "OECD90",
  "Latin America",
  "Eastern Europe",
  "Asia (Sans Japan)",
  "Middle East and Africa"
];

// TODO modify to also support array varpath format (might be simpler)
// const stripValue = value => {
//   return value.replace(".value", "");
// };

const FlexWidgetComponent = styled.div`
  order: 1;
`

const FlexQuestionBox = styled.div`
  order: 2;
  `

const InputTooltip = ({
  title,
  body
}) => (
  <div>
    <StyledParagraph><strong>{title}</strong></StyledParagraph>
    <StyledParagraph>{body}</StyledParagraph>
  </div>
)

const FlexWrapper = styled.div`
  display: flex;
`

const validateOptions = (option) => {
  if (typeof option != 'object' || (!option.name || !option.details)) {
    console.warn("Invalid options format for tooltip feature")
  }
}

export const getVarPathFull = (varType = "technologies", activeTechnology, varpath, value = false) =>
  ( varType === "categories" ?
    `${varType}.electricity_generation.${varpath}${value ? ".value": ""}` :
    `${varType}.${activeTechnology}.${varpath}${value ? ".value": ""}` )

export const BoundFormElement = props => {
  const {
    WidgetComponent,
    getValueFn = event => event.target.value,
    parseValueFn = val => val,
    formatValueFn = val => val,
    compareFn = (oldVal, newVal) => oldVal === newVal,
    varType = "technologies",
    varpath,
    region, // for updating a single region value within a var
    target = "scenario",
    inputTooltipEnabled = false,
    ...inputProps
  } = props;

  const workbookHasAuthor = useWorkbookHasAuthorSelector();
  // Disable workbooks that have no owner or where the ID is not defined.
  const disabled = props.disabled || !workbookHasAuthor;

  const params = useParams();
  const activeTechnology =
        props.activeTechnology ||
        params.technologyId;

  const varpathFull =
    props.varpathFull || getVarPathFull(varType, activeTechnology, varpath);

  const [error, setError] = React.useState(false);
  // TODO narrow this selector to just what we need for this element
  // 1. The value of getVariableValue on the workbook for this path
  // 2. Use a thunk and action for all changes to value state, so we don't need all that logic here

  const workbookState = useSelector(state => state.workbook);
  const workbookIsLoaded = useWorkbookIsLoadedSelector();
  const varValue = useStringVarpathSelector(varpathFull, target);

  if (!workbookIsLoaded) {
    return (
      <Skeleton>
        <InputWithAddons disabled={true} />
      </Skeleton>
    );
  }

  let displayValue;
  if (region) {
    displayValue = varValue ? formatValueFn(varValue[region]) : null;
  } else {
    displayValue = formatValueFn(varValue);
  }

  // In some cases, dropdown object will have tooltip to help understand option details
  // in that case, option object will print as follow:
  // {
  //   "VAL": {
  //     "name": "VAL"
  //     "details": "SOME_DETAILS"
  //   }
  // }
  // This will capture the details object
  let displayValueDetails;
  if (inputTooltipEnabled) {
    validateOptions(inputProps.options[displayValue])
    displayValueDetails = inputProps.options[displayValue]?.details
  }

  const handleSubmit = async event => {
    const oldValue = varValue;
    const parsedWidgetValue = parseValueFn(getValueFn(event));
    const newValue = region
      ? Object.assign({}, oldValue, {
          [region]: parsedWidgetValue
        })
      : parseValueFn(getValueFn(event));

    const unchanged =
      region !== undefined
        ? compareFn(oldValue[region], newValue[region])
        : compareFn(oldValue, newValue);
    // Do not dispatch a state change if the varpath is empty
    if (!unchanged && varpath && varpath !== "") {
      await store.dispatch(
        doUpdateWorkbookVariationVariableThunk({
          workbookId: workbookState.workbook.id,
          variationIndex: 0, // FIXME this should be dynamic based on current highest index
          technology: activeTechnology,
          target,
          varpathFull,
          oldValue,
          newValue
        })
      );
    }
  };

  return (
    <FlexWrapper>
      <FlexWidgetComponent>
        <WidgetComponent
          {...inputProps}
          handleSubmit={handleSubmit}
          storeValue={displayValue}
          isInvalid={error}
          disabled={disabled}
        />
      </FlexWidgetComponent>
      
      {
        inputTooltipEnabled &&
        <FlexQuestionBox>
          <QuestionBox 
            TooltipWidget={() => (
              <InputTooltip 
                title={displayValue}
                body={displayValueDetails}/>
            )}
          />
        </FlexQuestionBox>
      }
      
      {error && error.msg}
      
    </FlexWrapper>
  );
};

const formatNumericValue = x => {
  if (x === undefined || x === null) {
    return x;
  } else {
    return isNaN(x) ? 0 : x;
  }
};
const parseNumericValue = x => parseFloat(x);

export const BoundNumInput = props => {
  const defaults = {
    formatValueFn: formatNumericValue,
    parseValueFn: parseNumericValue,
    getValueFn: event => event.target.value
  };
  const widgetProps = Object.assign(defaults, props);
  return (
    <BoundFormElement WidgetComponent={InputWithAddons} {...widgetProps} />
  );
};

export const BoundUSDInput = props => {
  const defaults = {
    formatValueFn: formatNumericValue,
    parseValueFn: parseNumericValue,
    getValueFn: event => event.target.value,
    leftAddon: "$"
  };
  const widgetProps = Object.assign(defaults, props);
  return (
    <BoundFormElement WidgetComponent={InputWithAddons} {...widgetProps} />
  );
};

// TODO Should this also convert between fractional and percent notation (e.g. /100)
export const BoundPercentInput = props => {
  const defaults = {
    formatValueFn: x => (x.substr && x.substr(-1) === ".") ? x : (x * 100),
    parseValueFn: x => (x.substr && x.substr(-1) === ".") ? x : (x / 100),
    getValueFn: event => event.target.value,
    rightAddon: "%"
  };
  const widgetProps = Object.assign(defaults, props);
  return (
    <BoundFormElement WidgetComponent={InputWithAddons} {...widgetProps} />
  );
};

export const BoundBooleanSwitch = props => {
  // FIXME use technology color instead of hardcoded electricity color
  const colorScheme = props.colorScheme || "brand.electricity";
  const getValueFn = (e) => e.target.checked ? true : false;
  return (
    <BoundFormElement
      WidgetComponent={Switch}
      colorScheme={colorScheme}
      getValueFn = {getValueFn}
      {...props}
    />
  );
};

export const BoundTextarea = props => {
  return <BoundFormElement WidgetComponent={Textarea} {...props} />;
};

export const BoundJSONTextarea = props => {
  const defaults = {
    formatValueFn: x => JSON.stringify(x),
    parseValueFn: x => JSON.parse(x),
    getValueFn: event => event.target.value,
    compareFn: (oldVal, newVal) =>
      JSON.stringify(oldVal) === JSON.stringify(newVal)
  };
  props = Object.assign({}, defaults, props);
  return <BoundFormElement WidgetComponent={Textarea} {...props} />;
};

export const BoundSelect = props => {
  return <>
      <BoundFormElement WidgetComponent={Select} {...props} />
    </>;
};

export const BoundNumericRegionInputs = props => {
  const defaults = {
    formatValueFn: formatNumericValue,
    parseValueFn: parseNumericValue,
    getValueFn: event => event.target.value
  };
  const widgetProps = Object.assign(defaults, props);
  return (
    <VStack>
      {regions.map(region => (
        <BoundFormElement
          key={region}
          WidgetComponent={InputWithAddons}
          leftAddon={region}
          size="sm"
          region={region}
          key={`${props.varpathFull}.${region}`}
          {...widgetProps}
        />
      ))}
    </VStack>
  );
};

// FIXME add "ALL SOURCES" to API
export const BoundSourceSelect = props => {
  const {
    sourceListObjectpath,
    additionalOptions = [],
    ...formElementProps
  } = props;
  const sourcesObj = useObjectPathSelector(
    sourceListObjectpath,
    {}
  );
  const sourcesOptions = sourcesObjectToOptionsArray(sourcesObj, additionalOptions);
  return <BoundFormElement
           options={sourcesOptions}
           WidgetComponent={Select}
           {...formElementProps}
         />;
}
