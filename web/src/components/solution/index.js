import React, { useRef, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid, Flex, Stack } from "@chakra-ui/react";
import Tour from 'reactour';
import Tourtooltip from "components/Tourtooltip";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "services/user";
import steps from "redux/reducers/tour/TourstepsWorkbookSolution";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useStyleConfig,
  useMediaQuery
} from "@chakra-ui/react";
import { breakpoints } from "../../theme";
import TAMForm, { TAMHeader } from "./TAM";
import AdoptionForm, { AdoptionHeader } from "./Adoption";
import EmissionForm, { EmissionHeader } from "./Emission";
import FinanceForm, { FinanceHeader } from "./Finance";
import RawDataForm, { RawDataHeader } from "./RawData";
import ClusterSummary, { ClusterSummaryHeader } from "./ClusterSummary"
import WorkbookFooter from "components/workbook/footer";
import { Navigation } from "../../components/Navigation";
// Legacy default export requirements

import {
  getChildrenByContainerType,
  findChildByContainerType,
  getModalContent,
  getPathByHash
} from "util/component-utilities";

import { Card, CardHeader, CardTitle, CardBody } from "../Card";

export const SolutionHeaderRegion = ({ children }) => children;
export const SolutionLeftColumnRegion = ({ children }) => children;
export const SolutionCardsStack = ({
  children,
  mb = 0,
  mt = 0,
  size = "md",
  stack = "md",
  margin = false,
  col = false,
  custom = false
}) => {
  const styles = {
    ...useStyleConfig(col ? "Col" : "Row", { size }),
    marginTop: margin ? "0.75rem" : undefined
  };
  return (
    <Stack
      mb={mb}
      mt={mt}
      sx={styles}
      direction={
        custom
          ? custom
          : col
          ? {
              base: "column",
              [stack]: "column"
            }
          : {
              base: "column",
              [stack]: "row"
            }
      }
      justify="start"
      spacing="3"
    >
      {children}
    </Stack>
  );
};

export const SolutionBelowRegion = ({ children }) => children;

export const SolutionFormRegion = ({ color, drawer, techData }) => {
  const location = useLocation();
  const drawerPath = getPathByHash("drawer", location.hash);

  return (
    <Card size="max" h="100%">
      <CardHeader color={color} invert={true}>
        <CardTitle icon={faTimes} iconLeft={true} onClick={drawer.onClose}>
          {drawerPath === "tam" && (<TAMHeader />)}
          {drawerPath === "adoption" && (<AdoptionHeader />)}
          {drawerPath === "emissions" && (<EmissionHeader />)}
          {drawerPath === "finances" && (<FinanceHeader />)}
          {drawerPath === "rawdata" && (<RawDataHeader />)}
          {drawerPath === "summary" && (<ClusterSummaryHeader />)}
        </CardTitle>
      </CardHeader>
      <CardBody wrapper={true}>
        <Grid minW="100%">
          {drawerPath === "tam" && (<TAMForm techData={techData} color={color} />)}
          {drawerPath === "adoption" && (<AdoptionForm techData={techData} color={color} />)}
          {drawerPath === "emissions" && (<EmissionForm techData={techData} color={color} />)}
          {drawerPath === "finances" && (<FinanceForm techData={techData} color={color} />)}
          {drawerPath === "rawdata" && (<RawDataForm technology={techData} color={color} />)}
          {drawerPath === "summary" && (<ClusterSummary technology={techData}/>)}
        </Grid>
      </CardBody>
    </Card>
  );
};

const SolutionFormDrawer = ({ children, isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0}>{children}</DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

const SolutionCardModal = ({ children, isOpen, onClose, size = "xl" }) => {
  return (
    <Modal size={size} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx={ size == "full" ? "4rem" : 0 } height={"auto"}>
        <ModalCloseButton zIndex="1500" />
        <ModalBody p={2} mt={10}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const SolutionLayout = ({
  color,
  title,
  technologyId,
  children,
  drawer,
  modal,
  modalPath,
  modalSize = "xl"
}) => {
  const { user, patchUserFromAPI} = useContext(UserContext);

  const solutionHeaderChildren = findChildByContainerType(
    children,
    SolutionHeaderRegion
  );
  const solutionLeftColumnChildren = findChildByContainerType(
    children,
    SolutionLeftColumnRegion
  );
  const solutionCardsRows = getChildrenByContainerType(
    children,
    SolutionCardsStack
  );
  const solutionCardModal = getModalContent(children, modalPath);
  const solutionBelowChildren = findChildByContainerType(
    children,
    SolutionBelowRegion
  );
  const solutionFormChildren = findChildByContainerType(
    children,
    SolutionFormRegion
  );
  const [isXl] = useMediaQuery(`(min-width: ${breakpoints.xl})`);
  const [isXxl] = useMediaQuery(`(min-width: ${breakpoints.xxl})`);
  const isDrawer = () => drawer && drawer.isOpen && !isXl;
  const isSidebar = () => drawer && drawer.isOpen && isXl;
  const getSidebarWidth = () => isXxl ?
    ({ left: "66.66666%", right: "33.33333%" }) :
    ({ left: "60%", right: "40%" });
  const stack = useRef();
  const [showTour, setshowTour] = useState(true);
  const closeTour = () =>{
    setshowTour(false);
    patchUserFromAPI({
      ...user,
      meta: {
        ...user.meta,
        hasOnboarded: true
      }
    });
  }
  return (
    <>
      <Stack direction="row" h="100%">
        <Box
          pr="1rem"
          ref={stack}
          rounded="lg"
          overflowY="auto"
          w={isSidebar() ? getSidebarWidth().left : "100%"}>
          <Box top="0" pos="sticky">
            {solutionHeaderChildren && (
              <Box>{solutionHeaderChildren.props.children}</Box>
            )}
          </Box>
          <Box pb={3}>
            <Flex>
              {solutionLeftColumnChildren && (
                <Box>{solutionLeftColumnChildren.props.children}</Box>
              )}
              <Box w="100%">{solutionCardsRows}</Box>
            </Flex>
            {solutionBelowChildren && (
              <Box>{solutionBelowChildren.props.children}</Box>
            )}
          </Box>
        </Box>
        {isSidebar() && (
          <Box
            ml="0"
            mr="1rem"
            mb="0.75rem"
            w={getSidebarWidth().right}
            ms="0 !important"
            maxH={stack.current?.clientHeight}>
            {solutionFormChildren}
          </Box>
        )}
      </Stack>
      <Box mr="3" flex="1" bg="white">
        <Navigation />
      </Box>
      <WorkbookFooter />
      {isDrawer() && (
        <SolutionFormDrawer isOpen={isDrawer()} onClose={drawer.onClose}>
          {solutionFormChildren}
        </SolutionFormDrawer>
      )}
      {modal.isOpen && (
        <SolutionCardModal isOpen={modal.isOpen} onClose={modal.onClose} size={modalSize}>
          {solutionCardModal}
        </SolutionCardModal>
      )}
      <Tour
      steps={steps}
      isOpen={user.meta.hasOnboarded?!user.meta.hasOnboarded:showTour}
      closeWithMask={false}
      onRequestClose={() => closeTour()}
        CustomHelper={ Tourtooltip } />
    </>
  );
};
