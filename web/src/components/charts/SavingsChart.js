import React from "react";
import { objectHasAll } from "util/component-utilities.js";
import { VictoryChart, VictoryBar, VictoryArea, VictoryAxis, VictoryStack } from "victory";

function SavingsChart({ techData }) {
  if (!objectHasAll(techData,["data.soln_marginal_operating_cost_savings"])) {
    return "There's no data.";
  }

  const data = techData.data.soln_marginal_operating_cost_savings;
  
  if (!data) {
    return "There's no data.";
  }

  const points = data
  // FIXME: the code ranges to 2140 for some reason, instead of filtering nulls
  // we should just always set domain to start and end of the study.
        .filter(p => p.value && p.value !== 0)
        .map(p => {
          return {
            x: parseInt(p.year),
            y: p.value
          };
        });

  return (
    <>
      <VictoryChart padding={{ left: 25, right: 25, bottom: 30, top: 10 }}>
        <VictoryAxis
          tickFormat={(v) => v.toString()}
          style={{
            axis: { stroke: "#f2f2f2" },
            tickLabels: {
              stroke: "#bababa",
              fontSize: "20",
              fill: "#b0b0b0"
            },
            ticks: {
              stroke: "#bababa",
              size: 2,
              verticalAnchor: "middle",
              paddingLeft: -10
            }
          }}
        />
        <VictoryStack>
          <VictoryBar
            data={points}
            barRatio={1}
            alignment="start"
            style={{ data: { fill: "#ff8f75" } }}
            interpolation="linear"
          />
        </VictoryStack>
      </VictoryChart>
    </>
  );
}

export default SavingsChart;
