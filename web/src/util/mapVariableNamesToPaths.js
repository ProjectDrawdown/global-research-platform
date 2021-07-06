// FIXME this function should not be needed. The API should use paths instead of
// variable names.

export const mapOfVariableNamesToVarpaths = {
    solution_category: ["meta", `solution_category`],
    ch4_co2_per_funit: ["scenario", `ch4_co2_per_funit`],
    ch4_is_co2eq: ["scenario", `ch4_is_co2eq`],
    n2o_co2_per_funit: ["scenario", `n2o_co2_per_funit`],
    n2o_is_co2eq: ["scenario", `n2o_is_co2eq`],
    soln_emissions_per_funit: ["scenario", `emissions_per_funit`],
    soln_energy_efficiency_factor: ["scenario", `energy_efficiency_factor`],
    soln_fuel_efficiency_factor: ["scenario", `fuel_efficiency_factor`],
    soln_fuel_emissions_factor: ["scenario", `fuel_emissions_factor`],
    soln_indirect_co2_per_iunit: ["scenario", `indirect_co2_per_iunit`],
    co2eq_conversion_source: ["scenario", `co2eq_conversion_source`],
    npv_discount_rate: ["scenario", `npv_discount_rate`],
    pds_2014_cost: ["scenario", `current_year_cost`],
    soln_first_cost_below_conv: ["scenario", `first_cost_below_conv`],
    soln_first_cost_efficiency_rate: ["scenario", `first_cost_efficiency_rate`],
    soln_fixed_oper_cost_per_iunit: ["scenario", `fixed_oper_cost_per_iunit`],
    soln_fuel_cost_per_funit: ["scenario", `fuel_cost_per_funit`],
    soln_lifetime_capacity: ["scenario", `lifetime_capacity`],
    soln_var_oper_cost_per_funit: ["scenario", `var_oper_cost_per_funit`],
    emissions_grid_range: ["scenario", `grid_range`],
    emissions_grid_source: ["scenario", `grid_source`],
    report_end_year: ["workbook", `report_end_year`],
    report_start_year: ["workbook", `report_current_year`],
    soln_annual_energy_used: ["scenario", `annual_energy_used`],
    soln_avg_annual_use: ["scenario", `avg_annual_use`],
    pds_adoption_use_ref_years: ["scenario", `use_ref_years`],
    pds_base_adoption: ["scenario", `base_adoption`],
    source_until_2014: ["category", `source_until_current_year`],
    source_after_2014: ["category", `source_after_current_year`],
    trend: ["category", `trend`],
    growth: ["category", `growth`],
    low_sd_mult: ["category", `low_sd_mult`],
    high_sd_mult: ["category", `high_sd_mult`],
};

export const mapOfTargetsAndVarpathsToVariableNames = Object.entries(mapOfVariableNamesToVarpaths).reduce((acc, [varname, [target, varpath]]) => {
  acc[target] = acc[target] || {};
  acc[target][varpath] = varname;
  return acc;
}, {});

export function getVarpathForVariableName(varname) {
  return mapOfVariableNamesToVarpaths[varname];
}

export function getVarnameForVarpath(varpath, target = "scenario") {
  return mapOfTargetsAndVarpathsToVariableNames[target] && mapOfTargetsAndVarpathsToVariableNames[target][varpath];
}

// TODO implement varpathfull helper if needed
// function helperMakeVarpathFullBase(target) {
//   switch (target) {
//   case "category":
//     return ["categories", sectorId];
//   case "meta":
//     return []
//   }
  
// }

// export function getVarnameForVarpathFull(args) {
//   const { varpathFull, target = "scenario", technologyId, sectorId, conventionalId } = args;
//   [varname, varpathData] = Object.entries(mapOfVariableNamesToVarpaths).find( ([varname, [entryTarget, entryVarpath]]) => {
//     const entryVarpathFullParts = 
//     return target === entryTarget && varpathFull === ``
//   })
// }

// export function mapVariablePathsToNames(args) {
//   const namesToPathsMap = mapVariableNamesToPaths(args);
//   return Object.fromEntries(Object.entries(namesToPathsMap).map(([a, b]) => [b.toString(), a]));
// }

// export default mapVariableNamesToPaths;
