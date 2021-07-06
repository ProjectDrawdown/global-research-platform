import React from "react";
import { Accordion, Item } from "../components/Accordion";
import TotalAdressableMarket from "../components/sector/TotalAddressableMarket";

export const StandardAccordion = () => (
  <Accordion>
    <Item title="Total Addressable Market">
      <TotalAdressableMarket
        regions={[{ name: "Global" }, { name: "USA" }, { name: "EU" }]}
      />
    </Item>
    <Item title="Conventional Finances"></Item>
  </Accordion>
);

export default {
  title: "Components/Accordion",
  component: Accordion
};
