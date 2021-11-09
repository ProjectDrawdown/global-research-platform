import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import { Card, 
  CardBody, 
  CardTitle,
  CardHeader
} from "components/Card"
import {
  useObjectPathSelector,
} from "redux/selectors.js"

import DataTableCard from "components/cards/DataTableCard"

const TabbedDatatable = ({
  color,
  title = null,
  withTableTitle = true,
  sourceListObjectpath
}) => {
  return (
    <Card size="max">
      {
        title ?
        <CardHeader color={color}>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        :
        <></>
      }
      <CardBody>
        <Render
          withTitle={withTableTitle}
          sourceListObjectpath={sourceListObjectpath} />
      </CardBody>
    </Card>
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
      w="100%"
      orientation="vertical">
      <TabPanels>
        {
          allData.map((tableName, i) =>
            <TabPanel
              key={`tab_data_${i}`}>
              <DataTableCard
                title={withTitle ? tableName : null}
                sourceListObjectpath={`${sourceListObjectpath}.${tableName}`}
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
