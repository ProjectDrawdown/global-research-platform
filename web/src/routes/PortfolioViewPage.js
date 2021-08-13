import React, { useEffect, useContext, useState } from "react"
import { useParams, useLocation, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { fetchWorkbookThunk } from "redux/reducers/workbook/workbookSlice"
import {showHelpMode,hideHelpMode} from "../redux/reducers/workbook/workbookUISlice"
import { useConfigContext } from "contexts/ConfigContext"
import { Stack, Box } from "@chakra-ui/react"
import PortfolioLayout from "parts/PortfolioLayout"
import { Navigation } from "components/Navigation"
import {
  ViewPortfolioPane,
} from "components/TechnologyCardPanes"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import tour from "../tour.png"
import { UserContext } from "services/user"

const ViewPortfolioPage = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const configState = useConfigContext();
  const [ width, setWidth ] = useState(window.innerWidth);
  const { user, patchUserFromAPI } = useContext(UserContext);
  const {HelpMode} = useSelector(state=>state.workbookUI)
  const [CompletedTour, setCompletedTour] = useState(user.meta.hasOnboarded);
  const resetOnboarding = async () => {
    const result = await patchUserFromAPI({
      ...user,
      meta: {
        ...user.meta,
        hasOnboarded: false
      }
    });
  };
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      patchUserFromAPI({
        ...user,
        meta: {
          ...user.meta,
          hasOnboarded: true
        }
      });
      history.push("#");
    },
  });

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  });

  useEffect(() => {
    dispatch(fetchWorkbookThunk(params.id));
  }, [params.id]);

  React.useEffect(() => {
    if (user && (!user.meta || !user.meta.hasOnboarded)) {
      onOpen();
    }
  }, [user]);

  React.useEffect(
    () => {
      if (location.hash === "#show-onboarding") {
        dispatch(showHelpMode());
        onOpen();
        if (HelpMode === true){
          dispatch(hideHelpMode());
        }
        history.push("#");
      }
    }, [location.hash]);

  return (
    <PortfolioLayout showFooter={false}>
      <Stack direction="row" h="100%" mx="auto">
        <ViewPortfolioPane
          onClose={() => null}
          title="MY TECHNOLOGIES"
          editLocation={`/workbook/${params.id}/portfolio/edit`}
          cols={Math.round(window.innerWidth / 250)}
          mx="auto"
          w="100%"
        />
      </Stack>
      <Box mr="3" flex="1" bg="white">
        <Navigation CompletedTour={CompletedTour} setCompletedTour={setCompletedTour}/>
      </Box>
    </PortfolioLayout>
  );
};

export default ViewPortfolioPage;
