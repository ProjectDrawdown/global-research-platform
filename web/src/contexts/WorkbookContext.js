// FIXME DELETE THIS FILE AFTER CONFIRMING IT IS NOT BEING USED
import React, { useReducer } from "react";
import { runCalculation, fetchProjection } from "../api/api";
import objectPath from "object-path";

export const mockState = {
  workbook: {},
  scenario: {},
  reference: {},
  variation: {},
  activeTechnology: "solarpvutil"
};

const stripValue = value => {
  return value.replace(".value", "");
};

// TODO: rework this to use proper useWorkbookContext approach
// This setter won't work as is (is setting on an internally scoped copy).
export const setVariableValue = (varpath, variation, value) => {
  objectPath.set(variation, `scenario_vars.${varpath}`, value);
  return objectPath.get(variation, varpath);
};

export const WorkbookContext = React.createContext({
  ...mockState,
  setVariableValue
});

function useWorkbookContext() {
  const context = React.useContext(WorkbookContext);
  if (!context) {
    throw new Error(
      `setActiveTechnology must be used within a ConfigContextProvider`
    );
  }
  return context;
}

function WorkbookContextProvider({ children, ...props }) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_WORK_BOOK":
        return { ...state, ...action.data };
      case "SET_PROJECTION":
        return { ...state, projection: action.data };
      case "SET_INPUT_VALUE":
        const newState = Object.assign({}, state);
        objectPath.set(newState, action.varpath, action.value);
        return { ...state, ...newState };
      default:
        return state;
    }
  }, {});
  const [activeTechnology, setActiveTechnology] = React.useState(
    props.value.activeTechnology || 0
  );
  const [activeRow, setActiveRow] = React.useState();
  const [type, setType] = React.useState("default");
  const [workbooks, setWorkbooks] = React.useState(["onshorewind"]);
  const value = Object.assign(props.value, {
    setActiveTechnology,
    activeTechnology,
    setActiveRow,
    activeRow,
    workbooks,
    setWorkbooks,
    type,
    setType,
    // appData,
    // setWorkBook,
    state,
    dispatch,
    runCalculation,
    fetchProjection
  });
  return (
    <WorkbookContext.Provider value={value}>
      {children}
    </WorkbookContext.Provider>
  );
}

export { useWorkbookContext, WorkbookContextProvider };
