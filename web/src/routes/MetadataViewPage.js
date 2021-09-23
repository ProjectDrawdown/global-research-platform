import { useParams } from "react-router-dom"
import { useHistory, useLocation } from "react-router-dom"
import { Tabs, TabList, TabPanels, Tab, TabPanel, useDisclosure } from "@chakra-ui/react"
import { useConfigContext } from "contexts/ConfigContext";
import { getPathByHash } from "util/component-utilities";
import {
  SolutionLayout,
  SolutionHeaderRegion,
  SolutionCardsStack,
} from "components/solution";
import DataTableCard from "components/cards/DataTableCard"
import SolutionHeader from "components/solution/SolutionHeader";
import WorkbookHeader from "components/workbook/header";
import DashboardLayout from "parts/DashboardLayout";

const HealthAndEducationViewPage = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const configState = useConfigContext();

  const { name, sector } = configState.settings.technologyStaticMetaData[
    params.technologyId
  ];
  const color = configState.settings.techMap[sector];

  const drawerPath = getPathByHash("drawer", location.hash);
  const modalPath = getPathByHash("modal", location.hash);

  const drawer = useDisclosure({
    isOpen: !!drawerPath,
    onClose: () => history.push({ hash: "" })
  });

  const modal = useDisclosure({
    isOpen: !!modalPath,
    onClose: () => history.push({ hash: "" })
  });

  return (
    <DashboardLayout showFooter={false}>
      <SolutionLayout
        color={color}
        modal={modal}
        drawer={drawer}
        title={name}
        modalPath={modalPath}
        technologyId={params.technologyId}
      >
        <SolutionHeaderRegion key="header">
            <WorkbookHeader technologyId={params.technologyId} />
        </SolutionHeaderRegion>
        <SolutionCardsStack stack="max" mb="0.75rem">
          <SolutionHeader
            color={color}
            title={name}
            technologyId={params.technologyId}
          />
        </SolutionCardsStack>
        <SolutionCardsStack stack="max" mb="0.75rem">
          {/*
            TODO: once API structure is finalize
              * Tab loops through from object type
          */}
          <Tabs 
            orientation="vertical">
            <TabPanels>
              <TabPanel>
                <DataTableCard />
              </TabPanel>
            </TabPanels>
            <TabList>
              <Tab>
                Sample
              </Tab>

            </TabList>
          </Tabs>
        </SolutionCardsStack>
      </SolutionLayout>
    </DashboardLayout>
  )
}

export default HealthAndEducationViewPage