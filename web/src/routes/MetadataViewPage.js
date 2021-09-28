import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory, useLocation } from "react-router-dom"
import { useDisclosure } from "@chakra-ui/react"
import { useConfigContext } from "contexts/ConfigContext"
import { getPathByHash } from "util/component-utilities"
import {
  fetchWorkbookThunk,
  calculateMockThunk
} from "redux/reducers/workbook/workbookSlice";
import store from "redux/store";
import { useWorkbookIsFullyLoadedSelector } from "redux/selectors.js";
import {
  SolutionLayout,
  SolutionHeaderRegion,
  SolutionCardsStack,
} from "components/solution";
import TabbedDatatable from "components/solution/TabbedDatatable"
import SolutionHeader from "components/solution/SolutionHeader";
import WorkbookHeader from "components/workbook/header";
import LoadingSpinner from "components/LoadingSpinner";
import DashboardLayout from "parts/DashboardLayout";

const HealthAndEducationViewPage = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const configState = useConfigContext();
  const workbookIsFullyLoaded = useWorkbookIsFullyLoadedSelector();

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
        technologyId={params.technologyId}
      >
        <SolutionHeaderRegion key="header">
            <WorkbookHeader technologyId={params.technologyId} disableCalculate/>
        </SolutionHeaderRegion>
        <SolutionCardsStack stack="max" mb="0.75rem">
          <SolutionHeader
            color={color}
            title={`${sector}: ${name}`}
            technologyId={params.technologyId}
          />
        </SolutionCardsStack>
        <SolutionCardsStack stack="max" mb="0.75rem">
          <TabbedDatatable sourceListObjectpath="workbook.techData.data" />
        </SolutionCardsStack>
      </SolutionLayout>
    </DashboardLayout>
  )
}

export default HealthAndEducationViewPage