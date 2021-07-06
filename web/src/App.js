import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import "./App.css";
import Router from "./router";
import ChakraGDPRPopup from "components/ChakraGDPRPopup";
import { Fonts } from "./Fonts";
import ErrorBoundary from "./errorBoundary";

import { UserContextProvider } from "./services/user";

function App() {
  return (
    <div className="App">
        <ChakraProvider theme={theme}>
          <ErrorBoundary>
            <UserContextProvider>
              <Fonts />
              <div style={{ position: "relative", minHeight: "100vh" }}>
                <Router />
                <ChakraGDPRPopup />
              </div>
            </UserContextProvider>
          </ErrorBoundary>
        </ChakraProvider>
    </div>
  );
}

export default App;
