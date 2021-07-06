import React, { forwardRef } from "react";
import { objectHasAll, rotateRegionalData } from "util/component-utilities.js";
import RegionalDataLineChart from "components/charts/RegionalDataLineChart";
import { Skeleton } from "@chakra-ui/react";
import {
  useObjectPathSelector,
  useWorkbookIsFullyLoadedSelector
} from "redux/selectors.js";

const TAMChart = ({ techData }) => {
  let isLoaded = true;
  const stateTAMPerRegionPDS = useObjectPathSelector("workbook.techData.data.pds_tam_per_region", {});
  const stateTAMPerRegionRef = useObjectPathSelector("workbook.techData.data.ref_tam_per_region", {});
  // debugger

  if (
    !(stateTAMPerRegionPDS &&
      stateTAMPerRegionRef &&
      Object.keys(stateTAMPerRegionPDS).length &&
      Object.keys(stateTAMPerRegionRef).length)
  ) {
    // debugger
    return (
      <Skeleton isLoaded={false} h="m">
        Hello?
      </Skeleton>
    );
  }

  const dataTAMPerRegionPDS = rotateRegionalData(stateTAMPerRegionPDS);
  const dataTAMPerRegionRef = rotateRegionalData(stateTAMPerRegionRef);

  return (
    <RegionalDataLineChart
      dataCollections={[dataTAMPerRegionPDS, dataTAMPerRegionRef]}
    />
  );
};

export default TAMChart;
