import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory, useLocation } from "react-router-dom"
import { useDisclosure } from "@chakra-ui/react"
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
import { useWorkbookIsFullyLoadedSelector } from "redux/selectors.js"
import LoadingSpinner from "components/LoadingSpinner"
import DashboardLayout from "parts/DashboardLayout"
import SolutionHeader from "components/solution/SolutionHeader"
import TabbedDatatable from "components/solution/TabbedDatatable"
import WorkbookHeader from "components/workbook/header"
import TamMix from "components/solution/TAMMix"
import ClusterResult from "components/solution/ClusterResult"
import ClusterMarketChart from "components/charts/ClusterMarketChart"
import BaseCard from "components/cards/BaseCard"

const HealthAndEducationViewPage = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const configState = useConfigContext();

  const workbookIsFullyLoaded = useWorkbookIsFullyLoadedSelector("EMISSIONS ALLOCATIONS in LLDC", false);

  const { name, sector } = configState.settings.technologyMetadata[
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
            size="max">
            <ClusterMarketChart
              sourceListObjectpath="workbook.techData.data" />
          </BaseCard>
        </SolutionCardsStack>
        <SolutionCardsStack margin={true} mb="0.75rem">
          <SolutionCardsStack col={true} size="sm">
            <BaseCard
              size="xl"
              title="TAM Mix"
              color={color}>
              <TamMix />
            </BaseCard>
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
      </SolutionLayout>
    </DashboardLayout>
  )
}

export default HealthAndEducationViewPage