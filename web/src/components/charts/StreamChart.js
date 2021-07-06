import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryArea,
  VictoryStack,
  VictoryAxis,
  VictoryLabel,
  VictoryTooltip
} from "victory";
import { dataConfig } from "../../api/api";
import { makeSinkSourceDataObj } from "./util";

export default function StreamChart({
  width,
  height,
  data,
  startYear = 2020,
  endYear = 2060,
  techData,
  summaryData,
  technologies,
  iunitIndirectEmissions
}) {
  const minY = -100000;
  const maxY = 100000;
  const domain = { x: [startYear, endYear] };
  // Show ticks for every decade
  
  return <div></div>;

  const colors = ["brown", "lightblue", "#FF4C24", "#009B9E", "#529334", "#3885CC", "#C87828", "#007494"];
  const sectors = ['Buildings and Cities', 'Electricity Generation', 'Food', 'Land Use'];

  const drawdown = 2031;

  const sources = ["onshorewind", "geothermal"];
  const sinks = ["microwind", "solarpvroof"];

  const pdsEmissions = [];
  sectors.map((p) => {
    const technologiesV = dataConfig.technologiesBySector;
    const indirectEmissions = technologiesV[p].map((item) => {
      if (technologies[item]) {
        let indirectCo2PerIunitValue;
        console.log(p, item, technologies[item]);
        if (p === 'Electricity Generation' && typeof technologies[item].indirect_co2_per_iunit.value !== "undefined") {
          indirectCo2PerIunitValue = technologies[item].indirect_co2_per_iunit.value
        } else {
          indirectCo2PerIunitValue = technologies[item].indirect_co2_per_iunit;
        }
        return indirectCo2PerIunitValue;
      } else {
        return 0;
      }
    }).reduce((acc, p) => acc + p, 0);

    const diff = summaryData.sectors[p].reference_emissions['World'].map((item, i) => 
      ({ year: item.year, value: item.value + summaryData.sectors[p].emissions_reduction['World'][i].value + indirectEmissions }
    ));

    pdsEmissions.push({sector: p, diff});
  });

  const values = pdsEmissions.map((item) => {
    const points = [];
    item.diff.forEach((p) => {
      points.push({ x: parseInt(p.year), y: p.value });
    });
    return points;
  });

  const sourceTotalData = pdsEmissions.map(
    (item, index) => {
      return {
        x: startYear + index,
        y: pdsEmissions.reduce((ySum, items) => {
          const yearValues = items.diff.find(({ year: x2, value: y2 }) => x2 === 0);
          const yearValue = yearValues ? yearValues.value : 0;
          return ySum;
        }, 0)
      };
    }
  );

  // Original line showing net between sources and sinks, was not legible.
  // const netEmissionsData = sourceTotalData.map(({x,y}, idx) => ({ x: x, y: y - sinkTotalData[idx].y}));
  
  return (
    <div style={{ width: '100%' }}>
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="drawdownGradient" y1="0%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3f424a"/>
            <stop offset="50%" stopColor="#3f424a"/>
            <stop offset="75%" stopColor="#3d4f78"/>
            <stop offset="100%" stopColor="#5ea163"/>
          </linearGradient>
        </defs>
      </svg>
      <VictoryChart
        height={90}
        padding={{ top: 10, bottom: 10, right: 0, left: 20 }}
        label="Drawdown Treshold: Emissions vs. Sequestration"
        vectorEffect="non-scaling-stroke"
      >
        <VictoryStack
          labelComponent={<VictoryTooltip />}
        >
          {values.map((d, i) => (
            <VictoryArea
              interpolation="natural"
              style={{
                data: { width: width, height: height, fill: colors[i] },
                axis: { fontSize: 10 }
              }}
              data={d}
            />
          ))}
        </VictoryStack>
        {/* <VictoryLine
          style={{
            data: { stroke: "#000", strokeWidth: 1, strokeDasharray: [2, 2] },
            parent: { border: "1px solid #000"}
          }}
          data={netEmissionsData}
          interpolation="natural"
        /> */}
        <VictoryAxis
          tickLabelComponent={<VictoryLabel dx={-2} style={{
            fill: "white",
            textAnchor: "end",
            verticalAnchor: "end",
            fontSize: (tick) => parseInt(tick) === drawdown ? 10 : 6 }
          }/>}
          vectorEffect="non-scaling-stroke"
          style={{
            axis: {
              stroke: "url(#drawdownGradient)",
              strokeWidth: 30,
              strokeLinecap: "square"
            },
            tickLabels: {
              padding: 2
            }
          }}
          tickFormat={t => (Math.abs(drawdown - t) > 3 || drawdown === t) ? `${Math.round(t)}` : ''}
          fixLabelOverlap={true}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={t => ""}
          style={{
            axis: {
              display: "none"
            },
            // TODO display tick labels when units are correct
            tickLabels: {
              display: "none"
            },
            grid: {
              stroke: "#CCC",
              strokeDasharray: [1, 3]
            }
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: {
              stroke: "#CCC",
              strokeDasharray: [1, 3]
            },
            tickLabels: {
              display: "none",
              fill: "gray",
              fontSize: 6,
              padding: 2,
              x: -10
            }
          }}
        />
      </VictoryChart>
    </div>
  );
}
