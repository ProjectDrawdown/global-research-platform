import React, { useRef, useContext, createRef, useState } from "react";
import { Button} from "@chakra-ui/react";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {showHelpMode} from "../redux/reducers/workbook/workbookUISlice"
import steps from "../redux/reducers/tour/Toursteps";
import stepsWorkbook from "../redux/reducers/tour/TourstepsWorkbook";
import TooltipHelp from "../HelpMode/TooltipHelp";
import { UserContext } from "services/user"
import Tour from 'reactour'
import {
  useTheme,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Stack,
  Divider,
  Heading,
  IconButton,
  Radio,
  RadioGroup,
  Portal
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUniversity,
  faBuilding,
  faUser,
  faBell,
  faWater,
  faTree,
  faNotesMedical,
  faIndustry,
  faSeedling,
  faCity,
  faTruck,
  faBolt,
  faFolder
} from "@fortawesome/free-solid-svg-icons";
import { GlobeOutline, AddCircleOutline } from "react-ionicons";
import { ArrowRightIcon, ArrowLeftIcon, QuestionIcon } from "@chakra-ui/icons";
import Tourtooltip from "./Tourtooltip"
import styled from "styled-components";

import { getPathByHash } from "../util/component-utilities";

import {
  TechnologyPane,
  ViewPortfolioPane,
  EditPortfolioPane
} from "components/TechnologyCardPanes";

library.add(faUniversity, faBuilding, faUser, faIndustry, faTruck);

export const PortfolioSortRadios = () => {
  const [value, setValue] = useState("1");
  return (
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction="row">
        <Heading as="label" size="xs">
          Sort:
        </Heading>
        <Radio size="sm" value="1">
          Sector
        </Radio>
        <Radio size="sm" value="2">
          A-Z
        </Radio>
        <Radio size="sm" value="3">
          Agency Level
        </Radio>
      </Stack>
    </RadioGroup>
  );
};

const ButtonSector = ({ brandColor, selected, ...props }) => {
  const theme = useTheme();
  return (
    <IconButton
      bg={`brand.${brandColor}.900`}
      as={Link}
      colorScheme={brandColor}
      size="sm"
      style={{
        opacity: selected ? 1.0 : 0.4,
        boxShadow: selected ? theme.shadows["md"] : "none"
      }}
      to={props.to || "#"}
      {...props}
    />
  );
};

const StyledNavigationStack = styled(Stack)`
  position: fixed;
  margin-top: auto;
  margin-bottom: auto;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  z-index: 1500;
`;

const SideNavigation = ({
  activeItem,
  workbookId,
  isOpen,
  onOpen,
  onClose,
  btnRef,
  navRef,
  showAgencyFilters = false
}) => {
  const {HelpMode} = useSelector(state=>state.workbookUI);
  return (
    <StyledNavigationStack
      direction="column"
      spacing={2}
      py={4}
      px={2}
      bg="white"
      w="fit-content"
      shadow="sm"
      ml="1"
      ref={navRef}
    >
      {isOpen ? (
        <TooltipHelp content="Hello this is a Tooltip" direction="right" show={HelpMode}>
        <ButtonSector
          variant="ghost"
          icon={<ArrowLeftIcon className="first-step"/>}
          as={Link}
          to="#"
        />
        </TooltipHelp>
      ) : (
        <TooltipHelp content="Hello this is a Tooltip" direction="right" show={HelpMode}>
        <ButtonSector
          variant="ghost"
          icon={<ArrowRightIcon className="first-step"/>}
          as={Link}
          to="#nav/portfolio"
        />
        </TooltipHelp>
      )}
      <ButtonSector
        variant="outline"
        selected={activeItem === "portfolio" || activeItem === "edit"}
        icon={<FontAwesomeIcon icon={faFolder} />}
        to="#nav/portfolio"
      />
      <Divider />
      <ButtonSector
        brandColor="electricity"
        selected={activeItem === "electricity"}
        icon={
          <FontAwesomeIcon className="second-step"  icon={faBolt} data-tut="reactour__iso"/>
        }
        to="#nav/sector/electricity"
      />
      <ButtonSector
        brandColor="food"
        selected={activeItem === "food"}
        to="#nav/sector/food"
        icon={<FontAwesomeIcon icon={faSeedling} />}
      />
      <ButtonSector
        brandColor="industry"
        selected={activeItem === "industry"}
        to="#nav/sector/industry"
        icon={
        <FontAwesomeIcon className="third-step" icon={faIndustry} />
      }
      />
      <ButtonSector
        brandColor="transport"
        selected={activeItem === "transport"}
        to="#nav/sector/transport"
        icon={<FontAwesomeIcon icon={faTruck} />}
      />
      <ButtonSector
        brandColor="buildings"
        selected={activeItem === "buildings"}
        to="#nav/sector/buildings"
        icon={<FontAwesomeIcon icon={faCity} />}
      />
      <ButtonSector
        brandColor="health"
        selected={activeItem === "health"}
        to="#nav/sector/health"
        icon={<FontAwesomeIcon icon={faNotesMedical} />}
      />
      <ButtonSector
        brandColor="land"
        selected={activeItem === "land"}
        to="#nav/sector/land"
        icon={<FontAwesomeIcon icon={faTree} />}
      />
      <ButtonSector
        brandColor="coastal"
        selected={activeItem === "coastal"}
        to="#nav/sector/coastal"
        icon={<FontAwesomeIcon icon={faWater} />}
      />
      <ButtonSector
        brandColor="engineering"
        selected={activeItem === "engineering"}
        to="#nav/sector/engineering"
        icon={<FontAwesomeIcon icon={faBell} />}
      />
      {showAgencyFilters && (
        <>
          <Divider />
          <ButtonSector
            brandColor="blue"
            icon={<FontAwesomeIcon icon={faUser} />}
          />
          <ButtonSector
            brandColor="blue"
            icon={<FontAwesomeIcon icon={faBuilding} />}
          />
          <ButtonSector
            brandColor="blue"
            icon={<FontAwesomeIcon icon={faUniversity} />}
          />
          <ButtonSector
            brandColor="blue"
            icon={<GlobeOutline color="white" />}
          />
          <Divider />
          <ButtonSector
            brandColor="blue"
            icon={<AddCircleOutline color="white" />}
          />
        </>
      )}
      <ButtonSector
        to={`/workbook/${workbookId}#show-onboarding`}
        variant="ghost"
        icon={<QuestionIcon/>}
      />
    </StyledNavigationStack>
  );
};

export const Navigation = () => {
  // TODO refactor as abstract
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const activeTechnology = params.technologyId;
  const workbookId = params.id;
  const {HelpMode} = useSelector(state=>state.workbookUI);
  const dispatch = useDispatch();
  const { user, patchUserFromAPI } = useContext(UserContext);
  const stopTour =()=>{
    patchUserFromAPI({
      ...user,
      meta: {
        ...user.meta,
        hasOnboarded: true
      }
    });
  }

  const navigationPath = getPathByHash("nav", location.hash);
  const portfolioPath = getPathByHash("portfolio", "#" + navigationPath);
  const sectorPath = getPathByHash("sector", "#" + navigationPath);
  const sectorEdit = sectorPath && location.hash.indexOf("edit") > -1;
  const secondPath = portfolioPath || sectorPath || navigationPath;

  const btnRef = useRef();
  const navRef = createRef(null);
  const navSidebarRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure({
    isOpen: !!navigationPath,
    onOpen: () => {
      navRef.current.scrollIntoView();
    },
    onClose: () => {
      history.push({ hash: "" });
    }
  });
  let navContent;
  if (!!navigationPath) {
    switch (true) {
      case /sector/.test(navigationPath):
        const navPaneSector = sectorPath;
        navContent = (
          <TechnologyPane
            sidebar={true}
            onClose={onClose}
            sectorEdit={sectorEdit}
            activeTechnology={activeTechnology}
            currentSector={navPaneSector}
          />
        );
        break;
      default:
        if (portfolioPath === "edit") {
          navContent = (
            <EditPortfolioPane
              cols={3}
              viewLocation="#nav/portfolio"
              onClose={onClose}
            />
          );
        } else {
          navContent = (
            <ViewPortfolioPane
              cols={3}
              editLocation="#nav/portfolio/edit"
              onClose={onClose}
            />
          );
        }
        break;
    }
  }

  return (
    <>
      <Drawer
        size="xl"
        placement="left"
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerBody p={0} bg="gray.50">
              <div ref={navSidebarRef} />
              {navContent}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Portal containerRef={!!navigationPath && navSidebarRef}>
        <SideNavigation
          btnRef={btnRef}
          navRef={navRef}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          activeItem={secondPath}
          workbookId={workbookId}
        />
      </Portal>
      <Tour
      steps={steps}
      isOpen={!user.meta.hasOnboarded}
      closeWithMask={false}
      onRequestClose={() => stopTour()}
      lastStepNextButton={<Button>Done! You are ready to start working</Button>}
        CustomHelper={ Tourtooltip } />
      <div className="start-tour" style={{ position: "absolute", top: "0" }}></div>
    </>
  );
};
