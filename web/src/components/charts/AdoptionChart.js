import React, { forwardRef } from "react";
import { objectHasAll } from "util/component-utilities.js";
import RegionalDataLineChart from "components/charts/RegionalDataLineChart";

const AdoptionChart = ({ techData }) => {
  if (!objectHasAll(techData, ["data.soln_ref_funits_adopted.World"])) {
    return <div>Error Loading Data</div>;
  }
  const dataSolnPDSUnitsAdopted = techData.data.soln_pds_funits_adopted[
    "World"
  ].map(p => {
    return {
      x: p.year,
      y: p.value
    };
  });
  const dataSolnRefUnitsAdopted = techData.data.soln_ref_funits_adopted[
    "World"
  ].map(p => {
    return {
      x: p.year,
      y: p.value
    };
  });
  return (
    <RegionalDataLineChart
      dataCollections={[
        { World: dataSolnPDSUnitsAdopted },
        { World: dataSolnRefUnitsAdopted }
      ]}
    />
  );
};

export default AdoptionChart;
