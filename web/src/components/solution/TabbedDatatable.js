import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import {
  useObjectPathSelector,
} from "redux/selectors.js"

import DataTableCard from "components/cards/DataTableCard"

const TabbedDatatable = ({
  sourceListObjectpath
}) => {
  return (
    <Render sourceListObjectpath={sourceListObjectpath} />
  )
}

const Render = ({
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
                title={tableName}
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
