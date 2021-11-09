import React from "react";
import { SolutionLayout } from "../components/solution";
import EnergyTechnology from "../components/technologies/EnergyTechnology";
import { Route } from "react-router-dom";

export default {
  title: "Components/Solution"
};

export const SolutionElectricity = () => (
  <Route
    exact
    path="/workbook/1/technologies/solarpvutil"
    render={(props) => (
      <EnergyTechnology />
    )}
  />
);

// export const SolutionFood = () => (
//   <Solution color="food" title="Reduced Food Waste" />
// );

// export const FinanceSection = () => <Finance />;

// export const EmissionSection = () => <Emission />;
