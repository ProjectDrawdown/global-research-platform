import { Tabs, TabList, TabPanels, Tab, TabPanel, Heading, VStack } from "@chakra-ui/react"
import {
  useObjectPathSelector,
} from "redux/selectors.js"

import DataTableCard from "components/cards/DataTableCard"

const TabbedDatatable = ({
  withTableTitle = true,
  sourceListObjectpath
}) => {
  return (
    <VStack>
      <Heading size="lg">Calculation Outputs and Integration Data Tables</Heading>
      <Render
        withTitle={withTableTitle}
        sourceListObjectpath={sourceListObjectpath} />
    </VStack>
  )
}

const Render = ({
  withTitle,
  sourceListObjectpath
}) => {
  const sourceObj = useObjectPathSelector(
    sourceListObjectpath,
    {}
  );
  const allData = Object.keys(sourceObj)

  return(
    <Tabs 
      orientation="vertical">
      <TabPanels>
        {
          allData.map((tableName, i) =>
            <TabPanel>
              <DataTableCard
                title={withTitle ? tableName : null}
                sourceListObjectpath={`${sourceListObjectpath}.${tableName}`}
                key={`tab_data_${i}`}
              />
            </TabPanel>
          )
        }
      </TabPanels>
      <TabList>
        {
          allData.map((tableName, i) =>
            <Tab key={`tab_${i}`}>
              {tableName}
            </Tab>
          )
        }
      </TabList>
    </Tabs>
  )
  
}

export default TabbedDatatable
