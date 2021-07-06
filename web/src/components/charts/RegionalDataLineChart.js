import React, { forwardRef } from "react";
import { useTheme, GridItem, Heading } from "@chakra-ui/react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";

const RegionalDataLineChart = ({ dataCollections, tam }) => {
  const chakraTheme = useTheme();
  const lineColors = {
    World: chakraTheme.colors.brand.blue[900]
  };
  const lineStyles = [
    {},
    { strokeDasharray: [2, 2] },
    { strokeDasharray: [5, 2] },
    { strokeDasharray: [1, 1] }
  ];
  // Creates an array of objects with styles for each region. Regions are styled
  // with the same color across all datasets, each dataset has a standard dash /
  // line treatment across all regions.
  const lineStrokes = lineStyles.map(styleObj => {
    return Object.entries(lineColors).reduce((acc, [region, color]) => {
      acc[region] = Object.assign({}, styleObj, { stroke: color });
      return acc;
    }, {});
  });
  return (
    <VictoryChart>
      {dataCollections.map((datasetCollection, colIdx) =>
        Object.entries(datasetCollection).map(([region, dataset], setIdx) => {
          return (
            <VictoryLine
              interpolation="natural"
              style={{
                data: lineStrokes[colIdx][region]
              }}
              data={dataset}
            />
          );
        })
      )}
      <VictoryAxis
        style={{
          tickLabels: { fontSize: 10 },
          grid: { stroke: "#f0f0f0" }
        }}
        tickFormat={t => (t % 10 === 0 ? `${Math.round(t)}` : null)}
      />
      <VictoryAxis
        style={{
          tickLabels: { fontSize: 10 },
          grid: { stroke: "#f0f0f0" }
        }}
        dependentAxis
      />
    </VictoryChart>
  );
};

export default RegionalDataLineChart;
