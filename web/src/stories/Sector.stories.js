import React from "react";
import TotalAddressableMarket from "../components/sector/TotalAddressableMarket";

export default {
  title: "Components/Sector"
};

export const TotalAddressableMarketSection = () => (
  <TotalAddressableMarket
    regions={[{ name: "Global" }, { name: "USA" }, { name: "EU" }]}
  />
);
