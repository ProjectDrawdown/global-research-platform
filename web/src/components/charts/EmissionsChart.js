import React from "react";

import { VictoryChart, VictoryArea, VictoryAxis, VictoryStack } from "victory";

// FIXME centralize all helpre files in either util or helpers
import { objToArrayOfObjs } from "../../helpers";
import { objectHasAll } from "util/component-utilities.js";

function EmissionsChart({ techData }) {
  if (!objectHasAll(techData, ["data.co2_mmt_reduced", "data.co2_mmt_reduced.World"])) {
    return <div>Error Loading Data</div>;
  }
  const points = techData.data.co2_mmt_reduced["World"]
    .filter(p => p.value !== 0)
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
          <VictoryArea
            data={points}
            style={{ data: { fill: "#ff8f75" } }}
            interpolation="natural"
          />
        </VictoryStack>
      </VictoryChart>
    </>
  );
}

export default EmissionsChart;
