import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const colors = ["#a6cee3", "#b2df8a", "#1f78b4"];

/**
 * A Tab Component to be used in the Selected Tabs component below
 */
export const TabItem = ({ title }) => <Tab>{title}</Tab>;

export const TabHeader = ({ regions }) => {
  return (
    <TabList>
      {regions.map((region, index) => (
        <TabItem color={colors[index]} title={region.name} />
      ))}
    </TabList>
  );
};

export const SelectedTabs = ({ regions, RegionForm }) => (
  <Tabs>
    <TabHeader regions={regions} />
    <TabPanels>
      {regions.map((region, index) => {
        return (
          <TabPanel key={index}>
            <RegionForm />
          </TabPanel>
        );
      })}
    </TabPanels>
  </Tabs>
);
