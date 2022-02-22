import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory, useLocation } from "react-router-dom"
import { useDisclosure, Grid, GridItem } from "@chakra-ui/react"
import { useConfigContext } from "contexts/ConfigContext"
import store from "redux/store"
import { getPathByHash } from "util/component-utilities"
import {
  SolutionLayout,
  SolutionHeaderRegion,
  SolutionCardsStack,
} from "components/solution"
import {
  fetchWorkbookThunk,
  calculateMockThunk
} from "redux/reducers/workbook/workbookSlice"
import { 
  useWorkbookIsFullyLoadedSelector,
} from "redux/selectors.js"
import {
  BoundSelect,
} from "components/forms/form-elements.js"
import {
  TechnologyCardGrid,
} from "components/cards/TechnologyCards";
import LoadingSpinner from "components/LoadingSpinner"
import DashboardLayout from "parts/DashboardLayout"
import SolutionHeader from "components/solution/SolutionHeader"
import TabbedDatatable from "components/solution/TabbedDatatable"
import WorkbookHeader from "components/workbook/header"
import TamMixCard from "components/solution/TAMMix"
import TamMixAssumptionCard from "components/solution/TamMixAssumption"
import ClusterResult from "components/solution/ClusterResult"
import ClusterMarketChart from "components/charts/ClusterMarketChart"
import BaseCard from "components/cards/BaseCard"

const HealthAndEducationViewPage = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  // const configState = useConfigContext();
  const {
    settings: { technologyClusterMetadata, technologyMetadata, techMap }
  } = useConfigContext();
  const clusterKeys = Object.keys(technologyClusterMetadata)

  // const workbookIsFullyLoaded = useWorkbookIsFullyLoadedSelector("EMISSIONS ALLOCATIONS in LLDC", false);
  const workbookIsFullyLoaded = useWorkbookIsFullyLoadedSelector("he_data_loaded", false);

  const { name, sector } = technologyClusterMetadata[
    params.technologyId
  ];
  const color = techMap[sector];

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

  useEffect(() => {
    store.dispatch(fetchWorkbookThunk(params.id));
    // NOTE: this is calling mock data
    store.dispatch(calculateMockThunk(params.id, 0, params.technologyId));
  }, [params.technologyId, params.id]);

  // TODO implement full skeletons of children in layout instead of here.
  if (!workbookIsFullyLoaded) {
    return (
      <DashboardLayout showFooter={false}>
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
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout showFooter={false}>
      <SolutionLayout
        color={color}
        modal={modal}
        drawer={drawer}
        title={name}
        modalPath={modalPath}
        modalSize="full"
        technologyId={params.technologyId}
      >
        <SolutionHeaderRegion key="header">
            <WorkbookHeader technologyId={params.technologyId} disableCalculate/>
        </SolutionHeaderRegion>
        <SolutionCardsStack stack="max" mb="0.75rem">
          <SolutionHeader
            color={color}
            title={`Health and Education: ${name}`}
            technologyId={params.technologyId}
          />
        </SolutionCardsStack>
        <SolutionCardsStack col={true} size="max">
          <BaseCard
            title="Clusters"
            size="max"
            color={color}>
            <TechnologyCardGrid
              cols={8}
              technologyIDs={clusterKeys}
              keyString="he-clusters-soln-"
              sectorName=""
              makeOnClickFn={technologyID => techSectorType => () => 
                  history.push(`/workbook/${params.id}/cluster/${technologyID}`)
                }
              isSelectedFn={() => false}
              isFeaturedFn={() => true}
              isClusters>
            </TechnologyCardGrid>
          </BaseCard>
        </SolutionCardsStack>

        {/* For Summary Page */}
        { 
          params.technologyId === "healthandeducation" &&
            <SolutionCardsStack margin={true} mb="0.75rem">
              <SolutionCardsStack col={true} size="xs">
                <BaseCard
                  title="Population Data"
                  size="max"
                  color={color}>
                    <Grid
                      mb={3}
                      gap={4}
                      templateColumns="repeat(12, 1fr)">
                      <GridItem colSpan={12}>
                        <strong>Ref 1 Source</strong>
                      </GridItem>
                      <GridItem colSpan={12}>
                        <BoundSelect
                          activeTechnology="hepopulation"
                          varpath={`population_set`}
                          target="population"
                          options={{
                            Core: "Core",
                            WPP2015: "WPP2015"
                          }}
                          size="sm"
                        />
                      </GridItem>
                    </Grid>
                </BaseCard>
                <BaseCard
                  title="Emission Data"
                  size="max"
                  color={color}>
                    {/* // TODO: change this to emission */}
                    <Grid
                      mb={3}
                      gap={4}
                      templateColumns="repeat(12, 1fr)">
                      <GridItem colSpan={12}>
                        <strong>Ref 1 Source</strong>
                      </GridItem>
                      <GridItem colSpan={12}>
                        <BoundSelect
                          activeTechnology="hepopulation"
                          varpath={`population_set`}
                          target="population"
                          options={{
                            Core: "Core",
                            WPP2015: "WPP2015"
                          }}
                          size="sm"
                        />
                      </GridItem>
                    </Grid>
                </BaseCard>
              </SolutionCardsStack>
              <SolutionCardsStack col={true} size="md">
                <BaseCard
                  title="GT-CO2-EQ Avoided"
                  size="md"
                  color={color}>
                    {/*
                      TODO: review how the data is going to be presented
                        // copy from "Cluster Result for VIEW"
                        // Able to open side drawer for chart
                    */}
                </BaseCard>
              </SolutionCardsStack>

              <SolutionCardsStack col={true} size="max">
                {/*
                  TODO: review how data is going to be presented
                    // copy from ClusterMarketChart for View
                */}
              </SolutionCardsStack>
            </SolutionCardsStack>
        }
        
        <SolutionCardsStack margin={true} mb="0.75rem">
          <SolutionCardsStack col={true} size="sm">
            <TamMixCard 
              size="xl"
              title="TAM Mix"
              color={color}/>
          </SolutionCardsStack>
          <SolutionCardsStack col={true} size="sm">
            <TamMixAssumptionCard 
              size="xl"
              title="Assumptions"
              color={color}/>
          </SolutionCardsStack>
          <SolutionCardsStack col={true} size="md">
            <ClusterResult 
              path="heresult"
              color={color}>
                <TabbedDatatable
                  color={color}
                  title="Calculation Outputs and Integration Data Tables" 
                  withTableTitle={false}
                  sourceListObjectpath="workbook.techData.data" />
            </ClusterResult>
          </SolutionCardsStack>
        </SolutionCardsStack>
        <SolutionCardsStack col={true} size="max">
          <ClusterMarketChart
            sourceListObjectpath="workbook.techData.data" />
        </SolutionCardsStack>
      </SolutionLayout>
    </DashboardLayout>
  )
}

export default HealthAndEducationViewPage