import React from "react";

import { VictoryChart, VictoryArea, VictoryAxis, VictoryStack } from "victory";
import { objToArrayOfObjs } from "../../helpers";
import objectPath from "object-path";
import { Skeleton } from "@chakra-ui/react";
import { useWorkbookIsLoadedSelector } from 'redux/selectors.js';

function MarketChart({ summaryData, techData, technologies }) {
  const tamPerRegion = techData.data.pds_tam_per_region["World"].map(p => {
    return {
      x: parseInt(p.year),
      y: p.value
    };
  });

  // Calculate the units adopted of the current technology.
  const solnPdsUnitsAdopted = techData.data.soln_pds_funits_adopted[
    "World"
  ].map(p => {
    return {
      x: parseInt(p.year),
      y: p.value
    };
  });

  // Filter summary data by technology array arg.
  const technologiesV = Object.keys(summaryData).filter(p =>
    technologies.includes(p)
  );

  const filteredTechnologiesSolnPdsFunitsAdopted = technologiesV.map(technology => {
    const techData = objectPath.has(summaryData, [technology,"soln_pds_funits_adopted","World"]) ? summaryData[technology].soln_pds_funits_adopted["World"] : [];
    return techData;
  });

  const filteredTechnologiesSumOfPdsFunitsAdopted = techData.data.soln_pds_funits_adopted[
    "World"
  ].map(yearData => {
    const sumYear = yearData.year;
    const total = filteredTechnologiesSolnPdsFunitsAdopted
      .reduce((sum, filteredTechnologyUnitsAdopted) => {
        const technologyAdoptionDataInYear = filteredTechnologyUnitsAdopted.find(({year}) => sumYear === year);
        return sum + (technologyAdoptionDataInYear ? technologyAdoptionDataInYear.value : 0);
      }, 0);
    return {
      year: sumYear,
      value: total
    };
  });

  const totalSumOfPdsFunitsAdoptedData = filteredTechnologiesSumOfPdsFunitsAdopted.map(p => ({
    x: parseInt(p.year),
    y: p.value
  }));

  return (
    <VictoryChart padding={{ left: 60, right: 20, bottom: 30, top: 10 }}>
      <VictoryAxis
        tickFormat={(v) => v.toString()}
        style={{
          axis: { stroke: "#f2f2f2" },
          tickLabels: {
            stroke: "#bababa",
            fontSize: 10,
            fill: "#a3a3a3"
          },
          ticks: { stroke: "#bababa", size: 2, verticalAnchor: "middle" },
          grid: { stroke: "#f2f2f2", strokeWidth: 0.5 }
        }}
      />
      <VictoryAxis
        dependentAxis
        style={{
          axis: { stroke: "#f2f2f2" },
          tickLabels: {
            stroke: "#bababa",
            fill: "#a3a3a3",
            fontSize: 15
          },
          ticks: { stroke: "#bababa", size: 2, verticalAnchor: "middle" },
          grid: { stroke: "#f2f2f2", strokeWidth: 0.5 }
        }}
      />
      <VictoryArea
        data={tamPerRegion}
        style={{ data: { fill: "#edf2f7" } }}
        interpolation="natural"
      />
      <VictoryArea
        data={totalSumOfPdsFunitsAdoptedData}
        style={{ data: { fill: "#ffcdc2" } }}
        interpolation="natural"
      />
      <VictoryArea
        data={solnPdsUnitsAdopted}
        style={{ data: { fill: "#ff8f75" } }}
        interpolation="natural"
      />
    </VictoryChart>
  );
}

export default MarketChart;
