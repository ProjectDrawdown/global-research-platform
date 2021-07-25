import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  doAddPortfolioTechnologyPatchThunk,
  doRemovePortfolioTechnologyPatchThunk
} from "redux/reducers/workbook/workbookSlice";
import { Link as DomLink, useParams, useHistory } from "react-router-dom";
import {
  Text,
  Stack,
  Button,
  Box,
  Heading,
  Flex,
  Link
} from "@chakra-ui/react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";

import { useConfigContext } from "contexts/ConfigContext";

import {
  TechnologyCard,
  TechnologyCardGrid,
  SortedTechnologyCardGrid
} from "components/cards/TechnologyCards";
import { usePortfolioSolutions } from "helpers";

import styled from "styled-components";

const StyledButton = styled(Button)`
  background: white;
  color: #3F3F3F;
  filter: drop-shadow(0.5px 1px 1px rgba(0, 0, 0, 0.33));
  border-radius: 25px;
  &.view {
    background: #3F3F3F;
    color: white;
  }
`;

export const PortfolioCardPaneWrapper = props => {
  const history = useHistory();
  const { mx, w } = props;
  return (
    <Stack w={w} mx={mx} px={4} pt="1rem" ml="12">
      <Stack
        spacing={4}
        flexDirection="row"
        alignItems="middle"
        justifyContent="space-between">
        <Flex>
          <Heading as="h2" textStyle={"portfolio"}>
            {props.title}
          </Heading>
        </Flex>
        <Flex mt="0.5rem !important">
          {props.isEditingPortfolio ? (
            <StyledButton
              size="sm"
              variant="ghost"
              className="view"
              onClick={() => {
                history.push(props.viewLocation);
              }}>
              <CheckIcon mr={2} /> SAVE SELECTION
            </StyledButton>
          ) : (
            <StyledButton
              size="sm"
              variant="ghost"
              onClick={() => {
                history.push(props.editLocation);
              }}>
              <AddIcon mr={2} /> EDIT PORTFOLIO
            </StyledButton>
          )}
        </Flex>
      </Stack>
      <Stack spacing={4}>
        {props.children}
      </Stack>
    </Stack>
  );
};

export const TechnologyCardPaneWrapper = props => {
  const history = useHistory();
  const { color, mx, w } = props;
  return (
    <Stack w={w} mx={mx} px={4} pt="1rem" ml="12">
      <Stack
        spacing={4}
        flexDirection="row"
        alignItems="middle"
        justifyContent="space-between">
        <Flex>
          <Heading as="h2" textStyle={"portfolio"} color={color}>
            {props.title}
          </Heading>
        </Flex>
        <Flex mt="0.5rem !important">
          {props.sectorEdit ? (
            <StyledButton
              size="sm"
              variant="ghost"
              onClick={() => {
                history.push(props.viewLocation);
              }}
              className="view"
            >
              <CheckIcon mr={2} /> SAVE
            </StyledButton>
          ) : (
            <StyledButton
              size="sm"
              variant="ghost"
              onClick={() => {
                history.push(props.editLocation);
              }}
            >
              <AddIcon mr={2} /> EDIT
            </StyledButton>
          )}
        </Flex>
      </Stack>
      <Stack spacing={4}>
        {props.children}
      </Stack>
    </Stack>
  );
};

export const EditPortfolioPane = props => {
  /*x selected logic -  || (type === 'portfolio' && workbooks.indexOf(techID) !== -1) */
  const { viewLocation, mx, w } = props;
  const workbookState = useSelector(state => state.workbook);
  const portfolioSolutions =
    workbookState.workbook && workbookState.workbook.ui
      ? workbookState.workbook.ui.portfolioSolutions || []
      : [];
  const {
    settings: { technologyMetadata }
  } = useConfigContext();
  const allSolutions = Object.keys(technologyMetadata)
    // .sort((a, b) => portfolioSolutions.includes(a) ? -1 : 1);
  const dispatch = useDispatch();
  const handlePortfolioTechnologyClick = async id => {
    const result = await dispatch(
      doRemovePortfolioTechnologyPatchThunk({
        id: workbookState.workbook.id,
        technology: id
      })
    );
    return result;
  };
  const handleNonportfolioTechnologyClick = async id => {
    const result = await dispatch(
      doAddPortfolioTechnologyPatchThunk({
        id: workbookState.workbook.id,
        technology: id
      })
    );
    return result;
  };
  return (
    <PortfolioCardPaneWrapper
      title="MY PORTFOLIO"
      isEditingPortfolio={true}
      viewLocation={viewLocation}
      mx={mx}
      w={w}
    >
      <SortedTechnologyCardGrid
        isEditingPortfolio={true}
        technologyIDs={allSolutions}
        cols={props.cols}
        keyString="nonportfolio-soln-"
        makeOnClickFn={technologyID => () => portfolioSolutions.includes(technologyID) ?
          handlePortfolioTechnologyClick(technologyID) :
          handleNonportfolioTechnologyClick(technologyID)}
        isSelectedFn={technologyID => portfolioSolutions.includes(technologyID)}
        isFeaturedFn={() => true}
      />
    </PortfolioCardPaneWrapper>
  );
};

export const ViewPortfolioPane = props => {
  /*x selected logic -  || (type === 'portfolio' && workbooks.indexOf(techID) !== -1) */
  const { onClose, editLocation, mx, w } = props;
  const history = useHistory();
  const params = useParams();
  const workbookState = useSelector(state => state.workbook);
  const portfolioSolutions = [
    ...( workbookState.workbook && workbookState.workbook.ui
      ? workbookState.workbook.ui.portfolioSolutions || []
      : [] )
  ].sort(() => -1);
  const gotoAndClose = to => {
    history.push(to);
    return onClose();
  };
  return (
    <PortfolioCardPaneWrapper
      title={"MY PORTFOLIO"}
      editLocation={editLocation}
      mx={mx}
      w={w}>
      {portfolioSolutions.length > 0 ? (
        <SortedTechnologyCardGrid
          isEditingPortfolio={false}
          technologyIDs={portfolioSolutions}
          cols={props.cols}
          keyString="portfolio-soln-"
          makeOnClickFn={technologyID => () =>
            gotoAndClose(`/workbook/${params.id}/technologies/${technologyID}`)}
          isSelectedFn={technologyID => portfolioSolutions.includes(technologyID)}
          isFeaturedFn={() => true}
        />
      ) : (
        <Box>
          <Text>The portfolio for this workbook is currently empty.</Text>
          <Text>
            <Link
              textDecoration="underline"
              textColor="brand.blue.700"
              as={DomLink}
              to={editLocation}
            >
              Add technologies to the portfolio
            </Link>{" "}
            to access them quickly.
          </Text>
        </Box>
      )}
    </PortfolioCardPaneWrapper>
  );
};

// TODO refactor this to get disclosure from useDisclosure instead of passing along
export const TechnologyPane = ({
  activeTechnology,
  onClose,
  sectorEdit,
  currentSector,
  sidebar
}) => {
  const editLocation = `#nav/sector/${currentSector}/edit`;
  const viewLocation = `#nav/sector/${currentSector}`;
  const {
    settings: { technologyMetadata, techMap }
  } = useConfigContext();
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const workbookState = useSelector(state => state.workbook);
  const gotoAndClose = to => {
    history.push(to);
    return onClose();
  };
  // TODO refactor as abstract
  //TODO refactor to use a sector ID to sector name map
  const reverseTechMap = Object.keys(techMap).reduce((ret, key) => {
    ret[techMap[key]] = key;
    return ret;
  }, {});
  const sectorName = reverseTechMap[currentSector] || "\u00A0";
  
  const {
    portfolioSolutions,
    sectorTechnologyIDsInPortfolio,
    sectorTechnologyIDsNotInPortfolio,
  } = usePortfolioSolutions(technologyMetadata, sectorName);

  const handlePortfolioTechnologyClick = async id => {
    const result = await dispatch(
      doRemovePortfolioTechnologyPatchThunk({
        id: workbookState.workbook.id,
        technology: id
      })
    );
    return result;
  };
  const handleNonportfolioTechnologyClick = async id => {
    const result = await dispatch(
      doAddPortfolioTechnologyPatchThunk({
        id: workbookState.workbook.id,
        technology: id
      })
    );
    return result;
  };
  return (
    <TechnologyCardPaneWrapper
      title={sectorName}
      sectorEdit={sectorEdit}
      editLocation={editLocation}
      viewLocation={viewLocation}
      currentSector={currentSector}
      color={`brand.${currentSector}.900`}>
      {sectorTechnologyIDsInPortfolio.length > 0 ? (
        <TechnologyCardGrid
          mb="0"
          isEditingCards={sectorEdit}
          technologyIDs={sectorTechnologyIDsInPortfolio}
          keyString="technology-soln-"
          sectorName={sectorName}
          makeOnClickFn={technologyID => () => sectorEdit ?
            handlePortfolioTechnologyClick(technologyID) :
            gotoAndClose(`/workbook/${params.id}/technologies/${technologyID}`)}
          isSelectedFn={technologyID => portfolioSolutions.includes(technologyID)}
          isFeaturedFn={() => true}
        >
          {currentSector === "electricity" && (
            <TechnologyCard
              conventional={true}
              color={"grey"}
              techID={"conventional"}
              featured={false}
              title={"Conventional Technologies"}
              technologyImage={""}
              onClick={() =>
                gotoAndClose(`/workbook/${params.id}/technologies/conventional`)
              }
              selected={activeTechnology === "conventional"}
            />
          )}
        </TechnologyCardGrid>
      ) : (!sectorEdit && (
          <Box>
            <Text>The portfolio for this workbook is currently empty.</Text>
            <Text>
              <Link
                textDecoration="underline"
                textColor="brand.blue.700"
                as={DomLink}
                to={editLocation}
              >
                Add technologies to the portfolio
              </Link>{" "}
              to access them quickly.
            </Text>
          </Box>
        )
      )}
      {(
        <TechnologyCardGrid
          technologyIDs={sectorTechnologyIDsNotInPortfolio}
          keyString="technology-soln-"
          sectorName={sectorName}
          makeOnClickFn={technologyID => () => sectorEdit ?
            handleNonportfolioTechnologyClick(technologyID) :
            gotoAndClose(`/workbook/${params.id}/technologies/${technologyID}`)}
          isSelectedFn={() => false}
          isFeaturedFn={() => true}>
        </TechnologyCardGrid>
      )}
    </TechnologyCardPaneWrapper>
  );
};
