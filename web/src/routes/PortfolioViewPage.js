import React, { useEffect, useContext, useState } from "react"
import { useParams, useLocation, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchWorkbookThunk } from "redux/reducers/workbook/workbookSlice"
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
        onOpen();
      }
    }, [location.hash]);

  return (
    <PortfolioLayout showFooter={false}>

      <Modal isOpen={isOpen} size="full" nClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={16}>
          <ModalHeader>Workbook Tour</ModalHeader>

          <ModalBody>
            <Box overflowY="scroll" maxHeight="70vh"> 
              <Image
                src={tour}
                h="100%"
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close and don't show me again
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
        <Navigation />
      </Box>
    </PortfolioLayout>
  );
};

export default ViewPortfolioPage;
