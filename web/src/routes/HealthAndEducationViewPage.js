import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory, useLocation } from "react-router-dom"
import { useDisclosure, Grid, GridItem } from "@chakra-ui/react"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
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
  useStringVarpathSelector
} from "redux/selectors.js"
import {
  BoundSelect,
} from "components/forms/form-elements.js"
import {
  TechnologyCardGrid,
} from "components/cards/TechnologyCards";
import LoadingSpinner from "components/LoadingSpinner"
import DashboardLayout from "parts/DashboardLayout"
import { SolutionFormRegion } from "components/solution";
import SolutionHeader from "components/solution/SolutionHeader"
import TabbedDatatable from "components/solution/TabbedDatatable"
import WorkbookHeader from "components/workbook/header"
import TamMixCard from "components/solution/TAMMix"
import TamMixAssumptionCard from "components/solution/TamMixAssumption"
import ClusterResult from "components/solution/ClusterResult"
import ClusterMarketChart from "components/charts/ClusterMarketChart"
import ClusterSummaryChart from "components/charts/ClusterSummaryChart"
import BaseCard from "components/cards/BaseCard"
import DrawerLinkCard from "components/cards/DrawerLinkCard";

const EmissionDataSelector = () => (
  <Grid
    mb={3}
    gap={4}
    templateColumns="repeat(12, 1fr)">
    <GridItem colSpan={12}>
      <strong>Ref 1 Source</strong>
    </GridItem>
    <GridItem colSpan={12}>
      <BoundSelect
        activeTechnology="heemissionfactor"
        varpath={`emission_set`}
        target="population"
        options={{
          default: "default",
        }}
        size="sm"
      />
    </GridItem>
  </Grid>
)

const PopulationSelector = () => (
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
)

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

  const selectedPopulation = useStringVarpathSelector(
    'technologies.hepopulation.population_set',
    "population"
  )

  const selectedEmissionsFactor = useStringVarpathSelector(
    'technologies.heemissionfactor.emission_set',
    "population"
  )

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
            color={color}
            isTogglable>
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

        {/* For Summary Page 
          TODO: map selected with the data mapping
        */}
        { 
          params.technologyId === "healthandeducation" &&
          <SolutionCardsStack col={true} size="max">
            <SolutionCardsStack margin={true} mb="0.75rem">
              <SolutionCardsStack col={true} size="sm">
                <BaseCard
                  title="Population Data"
                  size="max"
                  path="populationdata"
                  icon={faQuestionCircle}
                  color={color}>
                    <PopulationSelector>
                      <TabbedDatatable
                          color={color}
                          title="Population Data" 
                          withTableTitle={false}
                          sourceListObjectpath={`workbook.workbook.population.data.technologies.hepopulation.${selectedPopulation}.data`} />
                    </PopulationSelector>
                </BaseCard>
              </SolutionCardsStack>
              <SolutionCardsStack col={true} size="sm">
                <BaseCard
                  title="Emission Data"
                  size="max"
                  path="emissionfactor"
                  icon={faQuestionCircle}
                  color={color}>
                    <EmissionDataSelector>
                      <TabbedDatatable
                          color={color}
                          title="Emission Factor" 
                          withTableTitle={false}
                          sourceListObjectpath={`workbook.workbook.population.data.technologies.heemissionfactor.${selectedEmissionsFactor}.data`} />
                    </EmissionDataSelector>
                </BaseCard>
              </SolutionCardsStack>
              <SolutionCardsStack col={true} size="lg">
              <DrawerLinkCard
                size="full"
                path="summary"
                drawer={drawer}
                title="GT-CO2-EQ Avoided"
                color={color}
              >
                <ClusterResult
                  title="GT-CO2-EQ Avoided"
                  size="lg"
                  type="summary"
                  path="summary"
                  pathType="drawer"
                  color={color} />
              </DrawerLinkCard>
                
              </SolutionCardsStack>
            </SolutionCardsStack>
            <SolutionCardsStack col={true} size="max">
              <BaseCard
                title="Total Gt CO2-eq Avoided from Population Growth, by country development status*"
                size="max"
                color={color}>
                <ClusterSummaryChart
                  sourceListObjectpath="workbook.techData.data.co2_avoided" />
              </BaseCard>
            </SolutionCardsStack>
          </SolutionCardsStack>
        }
      
      { 
        params.technologyId !== "healthandeducation" &&
          <SolutionCardsStack col={true} size="max">
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
                <BaseCard
                  path="heresult"
                  title="Result"
                  size="xl"
                  icon={faQuestionCircle}
                  color={color}>
                  <ClusterResult
                    path="heresult"
                    color={color}>
                      <TabbedDatatable
                        color={color}
                        title="Total Emissions Avoided due to Health & Education (Million Metric Tons CO2)" 
                        withTableTitle={false}
                        sourceListObjectpath="workbook.techData.data" />
                  </ClusterResult>
                </BaseCard>
              </SolutionCardsStack>
            </SolutionCardsStack>
            <SolutionCardsStack col={true} size="max">
              <BaseCard
                path="heresult"
                title="Total Emissions Avoided due to Health & Education (Million Metric Tons CO2)"
                size="max"
                icon={faQuestionCircle}
                color={color}>
                <ClusterMarketChart
                  path="heresult"
                  sourceListObjectpath="workbook.techData.data">
                    <TabbedDatatable
                        color={color}
                        title="Total Emissions Avoided due to Health & Education (Million Metric Tons CO2)" 
                        withTableTitle={false}
                        sourceListObjectpath="workbook.techData.data" />
                </ClusterMarketChart>
              </BaseCard>
            </SolutionCardsStack>
          </SolutionCardsStack>
        }
        <SolutionFormRegion
          color={color}
          drawer={drawer}
          techData="workbook.techData.data"
        />
      </SolutionLayout>
    </DashboardLayout>
  )
}

export default HealthAndEducationViewPage