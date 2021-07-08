import React from "react";
import { WorkbookCard } from "../components/WorkbookCard";
import { mockChartData } from "./mocks";

const workbook = {
  title: "Drawdown 2020",
  author: "Chad Frischmann",
  currentYear: "2020",
  updateDate: "2020-12-30",
  baseScenarioName: "PDS1-2018",
  referenceName: "BusinessAsUsual-2018",
  note:
    "This is an udpated version of the Drawdown model with 2020 data source updates.",
  data: mockChartData
};

const Template = args => {
  return <WorkbookCard workbook={workbook} {...args} />;
};

export default {
  title: "Components/Workbook/Card",
  component: WorkbookCard
};

export const Basic = Template.bind({});
