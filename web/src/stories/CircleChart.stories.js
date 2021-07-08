import React from "react";
import HalfPiesChart from "../components/charts/HalfPiesChart";
import { defaultColors } from "../components/charts/HalfPiesChart";
import { dataTechnologiesEmissions, dataConfig } from "../api/api";
import {
  mockChartData,
  mockSourceSectorsData,
  mockSinkSectorsData
} from "./mocks";

// Transpose API data to each year's emissions for each technology
const dataTechnologyEmissionsByYear = Object.keys(
  dataTechnologiesEmissions[0].data.World
).reduce((acc, year) => {
  acc[year] = dataTechnologiesEmissions.reduce((accYear, dataTechnology) => {
    if (dataConfig.technologyMetadata[dataTechnology.name]) {
      accYear.push({
        name: dataTechnology.name,
        sector: dataConfig.technologyMetadata[dataTechnology.name].sector,
        amount: dataTechnology.data.World[year]
      });
    }
    return accYear;
  }, []);
  return acc;
}, {});

// Aggregate each years technology emissions by sector
const dataSectorEmissionsByYear = Object.entries(
  dataTechnologyEmissionsByYear
).reduce((yearAcc, [year, yearData]) => {
  yearAcc[year] = yearData.reduce((sectorAcc, { sector, amount }) => {
    const currentSectorIndex = sectorAcc.findIndex(x => x.sector === sector);
    if (currentSectorIndex === -1) {
      sectorAcc.push({
        sector,
        amount
      });
    } else {
      sectorAcc[currentSectorIndex].amount += amount;
    }
    return sectorAcc;
  }, []);
  return yearAcc;
}, {});

export default {
  title: "Components/Charts/HalfPiesChart",
  component: HalfPiesChart,
  argTypes: {
    data: {
      control: {
        type: "object"
      }
    },
    width: {
      control: {
        type: "number"
      }
    },
    height: {
      control: {
        type: "number"
      }
    },
    colors: {
      control: {
        type: "object"
      }
    },
    margin: {
      control: {
        type: "object"
      }
    },
    showMultiple: {
      control: {
        type: "boolean"
      }
    },
    showShadow: {
      control: {
        type: "boolean"
      }
    },
    showBg: {
      control: {
        type: "boolean"
      }
    },
    bgWidth: {
      control: {
        type: "number"
      }
    }
  }
};

const Template = args => {
  // Not sure why this has to bin in the args and not normal props.
  args.sourceSectors = mockSourceSectorsData;
  args.sinkSectors = mockSinkSectorsData;
  return <HalfPiesChart {...args} />;
};

export const Minimal = Template.bind({});

Minimal.args = {
  data: mockChartData,
  width: 200,
  height: 200,
  margin: { top: 20, right: 20, bottom: 20, left: 20 },
  showBg: false,
  bgWidth: 0,
  showShadow: false,
  showMultiple: false,
  colors: defaultColors
};

export const WithStartEndAndBackground = Template.bind({});

WithStartEndAndBackground.args = {
  data: mockChartData,
  width: 200,
  height: 200,
  margin: { top: 20, right: 20, bottom: 20, left: 20 },
  showBg: true,
  bgWidth: 30,
  showShadow: false,
  showMultiple: true,
  colors: defaultColors
};

export const MinimalWithMockAPIData = Template.bind({});

MinimalWithMockAPIData.args = {
  data: dataSectorEmissionsByYear,
  width: 200,
  height: 200,
  margin: { top: 20, right: 20, bottom: 20, left: 20 },
  showBg: false,
  bgWidth: 0,
  showShadow: false,
  showMultiple: false,
  colors: defaultColors
};
