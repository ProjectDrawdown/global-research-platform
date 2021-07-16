import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import DashboardLayout from "../../parts/DashboardLayout";
import { useSelector } from "react-redux";
import {
  SolutionLayout,
  SolutionHeaderRegion,
  SolutionCardsStack,
  SolutionFormRegion,
} from "../solution";

import { useDisclosure, Skeleton, Text } from "@chakra-ui/react";

import EmissionInputs from "../solution/EmissionInputs";
import FinanceInputs from "../solution/FinanceInputs";

import { useConfigContext } from "../../contexts/ConfigContext";

import DrawerLinkCard from "components/cards/DrawerLinkCard";
import MarketChartCard from "components/cards/MarketChartCard";

import SolutionHeader from "components/solution/SolutionHeader";
import WorkbookHeader from "components/workbook/header";
import { useParams } from "react-router-dom";
import store from "../../redux/store";

import {
  fetchWorkbookThunk,
  calculateThunk
} from "../../redux/reducers/workbook/workbookSlice";

import MarketChart from "../charts/MarketChart";
import EmissionsChart from "../charts/EmissionsChart";
import SavingsChart from "../charts/SavingsChart";
import AdoptionChart from "../charts/AdoptionChart";
import StreamChart from "../charts/StreamChart";

import TAMDashboardCard from "components/cards/TAMDashboardCard.js";
import AdoptionDashboardCard from "components/cards/AdoptionDashboardCard.js";

import {
  prettyFormatBigNumber,
  prettyFormatBigWeight
} from "../../util/number-utils.js";

import { objectHasAll, getPathByHash } from "../../util/component-utilities";
import { useWorkbookIsFullyLoadedSelector, useStringVarpathSelector } from "redux/selectors.js";

import {
  calculateMarketCapture,
  calculateEmissionsReduction,
  calculateLifetimeSavings
} from "../../calcs";

import Overlay from "components/Overlay";
import LoadingSpinner from "components/LoadingSpinner";

const EnergyTechnology = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const workbook = useSelector(state => state.workbook);
  const workbookIsFullyLoaded = useWorkbookIsFullyLoadedSelector();

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
    store.dispatch(calculateThunk(params.id, 0, params.technologyId));
  }, [params.technologyId, params.id]);

  const configState = useConfigContext();
  // TODO: figure out how to best catch errors if activeTechnology is undefined
  // without short-circuiting the useEffect hook that sets the activeTechnology
  const { name, sector } = configState.settings.technologyMetadata[
    params.technologyId
  ];
  const color = configState.settings.techMap[sector];

  const technologyCardIDs = Object.keys(
    configState.settings.technologyMetadata
  ).filter(
    techID => configState.settings.technologyMetadata[techID].sector === sector
  );

  const technologies = useStringVarpathSelector('technologies');

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
          <WorkbookHeader technologyId={params.technologyId} />
        </SolutionHeaderRegion>
        <SolutionCardsStack stack="max" mb="0.75rem">
          <SolutionHeader
            color={color}
            title={name}
            technologyId={params.technologyId}
          />
        </SolutionCardsStack>
        <SolutionCardsStack stack="sm">
          <TAMDashboardCard
            {...{ drawer, color, techData: workbook.techData }}
          />
          <AdoptionDashboardCard
            {...{ drawer, color, techData: workbook.techData }}
          />
        </SolutionCardsStack>
        <SolutionCardsStack margin={true}>
          <SolutionCardsStack col={true} size="sm">
            <MarketChartCard
              size="xl"
              path="tam"
              modal={modal}
              title="Market Capture"
              color={color}
              position="relative"
              padding={0}
            >
              <MarketChart
                summaryData={workbook.summaryData}
                techData={workbook.techData}
                technologies={technologyCardIDs}
              />
              <Overlay>
                <Text fontSize="5vw" fontWeight="bold"> {calculateMarketCapture(workbook.summaryData, workbook.techData, technologyCardIDs)}% </Text>
                <Text fontSize="1vw"> market captured </Text>
              </Overlay>
            </MarketChartCard>
          </SolutionCardsStack>
          <SolutionCardsStack col={true} size="lg">
            <SolutionCardsStack stack="sm">
              <MarketChartCard
                size="sm"
                path="emissions"
                modal={modal}
                title="Emissions reduction"
                color={color}
                position="relative"
                padding={0}
              >
                <EmissionsChart
                  data={workbook.projection}
                  techData={workbook.techData}
                />
                <Overlay marginLeft="">
                  <Text fontSize="3vw" fontWeight="bold">
                    {prettyFormatBigWeight(calculateEmissionsReduction(workbook.techData)*1000)}
                  </Text>
                  <Text fontSize="1vw"> CO2-eq reduced </Text>
                </Overlay>
              </MarketChartCard>
              <DrawerLinkCard
                size="lg"
                path="emissions"
                drawer={drawer}
                title="Solution emissions quick inputs"
                color={color}
              >
                <EmissionInputs
                  color={color}
                  technologyId={params.technologyId}
                />
              </DrawerLinkCard>
            </SolutionCardsStack>
            <SolutionCardsStack stack="sm">
              <MarketChartCard
                size="sm"
                path="finances"
                modal={modal}
                title="Lifetime Savings"
                color={color}
                position="relative"
                padding={0}
              >
                <SavingsChart
                  color={color}
                  techData={workbook.techData} />
                <Overlay marginLeft="">
                  <Text fontSize="3vw" fontWeight="bold"> ${prettyFormatBigNumber(calculateLifetimeSavings(workbook.techData))} </Text>
                  <Text fontSize="1vw">  Saved </Text>
                </Overlay>
              </MarketChartCard>
              <DrawerLinkCard
                size="lg"
                path="finances"
                drawer={drawer}
                title="Solution finances quick inputs"
                color={color}
              >
                <FinanceInputs
                  color={color}
                  technologyId={params.technologyId}
                />
              </DrawerLinkCard>
            </SolutionCardsStack>
          </SolutionCardsStack>
        </SolutionCardsStack>
        <SolutionCardsStack stack="2xl">
          <StreamChart data={workbook.technologies} techData={workbook.techData} summaryData={workbook.summaryData} technologies={technologies}  />
        </SolutionCardsStack>
        <SolutionFormRegion
          color={color}
          drawer={drawer}
          techData={workbook.techData}
        />
        <SolutionCardsStack margin={true} w="100%">
          <DrawerLinkCard
            size="lg"
            path="rawdata"
            drawer={drawer}
            title="Raw data"
            color={color}
          >
          </DrawerLinkCard>
        </SolutionCardsStack>
      </SolutionLayout>
    </DashboardLayout>
  );
};

export default EnergyTechnology;
