import objectPath from "object-path";
import { objectHasAll } from "util/component-utilities.js";

// TODO: Do proper conversion for all the values

export const calculateMarketCapture = (summaryData, techData, technologies) => {
  const tamPerRegionLast = techData.data.pds_tam_per_region["World"][techData.data.pds_tam_per_region["World"].length - 1];
  const solnPdfUnitsAdoptedLast = techData.data.soln_pds_funits_adopted["World"][techData.data.pds_tam_per_region["World"].length - 1];
  return (solnPdfUnitsAdoptedLast.value / tamPerRegionLast.value * 100).toFixed(0);
}

export const calculateEmissionsReduction = (techData) => {
  const total = techData.data.co2_mmt_reduced["World"].filter(p => p.value !== 0).reduce((acc, item) => item.value + acc, 0);
  return total;
}

export const calculateLifetimeSavings = (techData) => {
  // TODO look for lifetime operating savings
  const savingsData = objectPath.get(techData, "data.soln_marginal_operating_cost_savings");
  if (!savingsData) {
    return null;
  }
  const final = savingsData
        .filter(p => p.value && p.value !== 0)
        .reduce((acc, x) => (acc + x.value), 0)
  return final;
}
