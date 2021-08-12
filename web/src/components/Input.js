import React, { useEffect } from "react";
import {
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Input,
  Switch as ChakraSwitch,
  Textarea as ChakraTextarea,
  Select as ChakraSelect
} from "@chakra-ui/react";

const noop = () => null;

// FIXME use Formik to handle change events and such
export const InputWithAddons = ({
  leftAddon,
  placeholder,
  rightAddon,
  addonStyle,
  handleSubmit = noop,
  size = "md",
  storeValue,
  // Brute force approach to blacklisting these attributes from inputProps
  varpath,
  varpathfull,
  varpathFull,
  dataType,
  conventional,
  activeTechnology,
  InputWidget,
  width = "100%",
  color = "black",
  borderRadius = "md",
  inputStyle = {},
  defaultIsFocused = false,
  // Functions to parse inputs values at a lower level than the binding fns. 
  // Used for cases other than bound input widgets.
  formatInputValueFn = x => x,
  parseInputValueFn = x => x,
  // Everything else gets passed to the input component itself
  ...inputProps
}) => {
  // We manage the state inside this component so it's most responsive. See
  // Redux state guideline docs.
  const [value, setValue] = React.useState(storeValue);
  const [isFocused, setIsFocused] = React.useState(defaultIsFocused);
  const inputValue = formatInputValueFn(value);
  const trimmedValue = (typeof inputValue === "number") ? Number(inputValue).toFixed(3) : inputValue;

  // But we need to reset the value if the store changes, so we use an effect
  // tracking the storeValue prop.
  useEffect(() => setValue(storeValue), [storeValue]);
  // THIS APPROACH DOES NOT WORK DUE TO A CRITICAL EDGE CASE:
  // When a user is trying to add a decimal, the number is briefly not a valid
  // number (after they have entered '.' but not '0') Because we do not store
  // the unparsed / unformatted state of the component anywhere, this is not a
  // valid state and the . is truncated...  We probably need a deeper fix here,
  // using component state or a different store to hold individual widget
  // states, then subscribing to changes to the store in our inputs and updating
  // that widget state if the store changes.
  const handleChange = (e) => {
    const newValue = parseInputValueFn(e.target.value);
    if (newValue != value) {
      setValue(parseInputValueFn(e.target.value));
    }
  }

  return (
    <InputGroup size={size} {...inputStyle}>
      {leftAddon && (
        <InputLeftAddon
          {...addonStyle}
          children={leftAddon}
          borderRadius={borderRadius} />
      )}
      {/* Override Input width to fix box overflow issues when input has addons */}
      <Input
        w={width}
        bg="white"
        tabIndex="1"
        color={color}
        value={isFocused ? inputValue : trimmedValue}
        onChange={handleChange}
        placeholder={placeholder}
        borderRadius={borderRadius}
        {...inputStyle}
        onFocus={(e) => setIsFocused(true)}
        onBlur={async (e) => {
          handleSubmit(e);
          setIsFocused(false)
          return e;
        }}
        {...inputProps}
      />
      {rightAddon && (
        <InputRightAddon
          {...addonStyle}
          children={rightAddon}
          borderRadius={borderRadius} />
      )}
    </InputGroup>
  );
};

export const Switch = ({ storeValue, handleSubmit = noop }) => {
  const [value, setValue] = React.useState(storeValue);
  const handleChange = (e) => setValue(e.target.checked);
  React.useEffect(() => setValue(storeValue), [storeValue]);
  return (
    <ChakraSwitch
      size="lg"
      mt={2}
      isChecked={value}
      onChange={handleChange}
      onBlur={handleSubmit}
    />
  );
}


export const Textarea = ({
  storeValue,
  handleSubmit = noop,
  setInactive = noop,
  setActive = noop,
  ...textareaProps
}) => {
  const [value, setValue] = React.useState(storeValue);
  const handleChange = (e) => { setValue(e.target.value); };
  React.useEffect(() => setValue(storeValue), [storeValue]);
  return (
    <ChakraTextarea
      value={value}
      onChange={handleChange}
      onBlur={handleSubmit}
      {...textareaProps}
    />
  );
};

export const Select = ({
  storeValue,
  placeholder = "Select option",
  options = [],
  handleSubmit = noop,
  // Brute force approach to blacklisting these attributes from inputProps
  varpath,
  varpathfull,
  varpathFull,
  dataType,
  conventional,
  activeTechnology,
  InputWidget,
  color,
  ...selectProps
}) => {
  const [value, setValue] = React.useState(storeValue);
  const handleChange = (e) => {
    setValue(e.target.value);
    handleSubmit(e);
  }
  
  if (!Array.isArray(options) && typeof options === "object") {
    options = Object.entries(options);
  }

  useEffect(() => setValue(storeValue), [storeValue]);
 
  return (
    <ChakraSelect
      bg="white"
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      {...selectProps}
      color="#3F3F3F"
      iconColor="black"
      focusBorderColor="#CBD5E0">
      {options.map((option, i) => {
        console.log(option);
        if (Array.isArray(option)) {
          const [key, val] = option;
          // In some cases, dropdown object will have tooltip to help understand option details
          // in that case, option object will print as follow
          // {
          //   "VAL": {
          //     "name": "VAL"
          //     "details": "SOME_DETAILS"
          //   }
          // }
          if (typeof label === "object") {
            return (
              <option value={val} key={i}>
                {val.name}
              </option>
            );
          }
          
          return (
            <option value={val} key={i}>
              {key}
            </option>
          );
        } else {
          return (
            <option value={option} key={i}>
              {option}
            </option>
          );
        }
      })}
    </ChakraSelect>
  );
};

export default InputWithAddons;
