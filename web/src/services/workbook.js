import React, { createContext, useReducer } from "react";
import objectPath from "object-path";

export const WorkbookContext = createContext({});

const initialState = {
  workbook: {
    id: 0,
    variations: []
  }
};

export const stripValue = value => {
  return value.replace(".value", "");
};

// TODO: Refactoring this
export const getVariableValue = (
  varpath,
  { scenario, reference, variations },
  target = "scenario"
) => {
  // FIXME update error handling in getVariableValue function
  if (!scenario || !reference || !variations) {
    return null;
  }
  try {
    const { scenario_vars, reference_vars } = variations[0];
    if (target === "scenario") {
      if (objectPath.has(scenario_vars, stripValue(varpath))) {
        const dataEntry = objectPath.get(scenario_vars, varpath);
        return typeof dataEntry === "object" && dataEntry.value
          ? dataEntry.value
          : dataEntry;
      } else if (
        typeof objectPath.get(scenario.data, varpath) !== "undefined"
      ) {
        const dataEntry = objectPath.get(scenario.data, varpath);
        return typeof dataEntry === "object" && dataEntry.value
          ? dataEntry.value
          : dataEntry;
      }
    } else {
      if (objectPath.has(reference_vars, stripValue(varpath))) {
        const dataEntry = objectPath.get(reference_vars, varpath);
        return typeof dataEntry === "object" && dataEntry.value
          ? dataEntry.value
          : dataEntry;
      } else if (
        typeof objectPath.get(reference.data, varpath) !== "undefined"
      ) {
        const dataEntry = objectPath.get(reference.data, varpath);
        return typeof dataEntry === "object" && dataEntry.value
          ? dataEntry.value
          : dataEntry;
      }
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getValuePath = (tech, path, value) =>
  `technologies.${tech}.${path}${value ? ".value": ""}`;

export const getValues = (map, technology, workbook) => {
  const output = {};
  Object.values(map).forEach(key => {
    output[key] =
      getVariableValue(key, workbook || {}) || 0;
  });
  return output;
};

export const setVariableValue = (varpath, { variation }, value) => {
  objectPath.set(variation, `scenario_vars.${varpath}`, value);
  return objectPath.get(variation, `scenario_vars.${varpath}`);
};

export const actions = {
  GET_WORKBOOK: "get workbook",
  GET_WORKBOOK_SUCCESS: "get workbook success"
};

export const workbookReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.GET_WORKBOOK:
      return {
        ...state,
        loading: true
      };
    case actions.GET_WORKBOOK_SUCCESS:
      return {
        ...state,
        workbook: action.data,
        loading: false
      };
    default:
      return state;
  }
};

export const WorkbookContextProvider = ({ children, ...props }) => {
  const [state, dispatch] = useReducer(workbookReducer, initialState);
  return (
    <WorkbookContext.Provider value={{ state, dispatch }} {...props}>
      {children}
    </WorkbookContext.Provider>
  );
};
