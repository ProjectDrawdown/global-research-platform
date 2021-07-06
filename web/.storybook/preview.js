import { ChakraProvider, useColorMode, Flex, Button, useColorModeValue } from "@chakra-ui/react";
import { Fonts } from "../src/Fonts"
import theme from "../src/theme";
import { WorkbookContextProvider, getVariableValue, setVariableValue, mockState as mockStateForWorkbook } from '../src/contexts/workbook-context.js'
import { ConfigContextProvider, mockState as mockStateForConfig } from '../src/contexts/ConfigContext.js'
import { BrowserRouter as Router } from 'react-router-dom';

const ColorModeToggleBar = () => {
  const { toggleColorMode } = useColorMode()
  const nextMode = useColorModeValue("dark", "light")

  return (
    <Flex justify="flex-end" mb={4}>
      <Button
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${nextMode} mode`}
        variant="ghost"
        color="current"
        marginLeft="2"
        onClick={toggleColorMode}
        icon={<div></div>}
      />
    </Flex>
  )
}

const withChakra = (StoryFn) => (
  <ChakraProvider theme={theme}>
    <Fonts />
    <div id="story-wrapper" style={{ minHeight: "100vh" }}>
      <ColorModeToggleBar />
      <StoryFn />
    </div>
  </ChakraProvider>
)

const withWorkbookContext = (StoryFn) => {
  return <WorkbookContextProvider value={mockStateForWorkbook}>
    <StoryFn />
  </WorkbookContextProvider>
}

const withConfigContext = (StoryFn) => (
    <ConfigContextProvider value={mockStateForConfig}>
      <StoryFn />
    </ConfigContextProvider>
)

const withRouter = (StoryFn) => (
  <Router>
    <StoryFn />
  </Router>
)

export const decorators = [
  withRouter,
  withChakra,
  withWorkbookContext,
  withConfigContext
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
