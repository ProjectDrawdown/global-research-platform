import React from "react";
import { dataConfig } from "../api/api.js";

export const mockState = {
  settings: dataConfig
};

export const ConfigContext = React.createContext({
  settings: dataConfig
});

function useConfigContext() {
  const context = React.useContext(ConfigContext);
  if (!context) {
    throw new Error(
      `setActiveTechnology must be used within a ConfigContextProvider`
    );
  }
  return context;
}

function ConfigContextProvider(props) {
  // Merge props values with Provider value
  // const value = Object.assign({}, valueActiveTechnology, props.value)
  // Create full props array of both
  // const updatedProps = Object.assign({}, props, {value})
  return <ConfigContext.Provider {...props} />;
}
export { ConfigContextProvider, useConfigContext };
