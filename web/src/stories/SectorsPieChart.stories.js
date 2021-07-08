import React from "react";
import SectorsPieChart from "../components/charts/SectorsPieChart";
import { defaultColors } from "../components/charts/SectorsPieChart.js";

const sectorStartData = [
  {
    sector: "Electricity Generation",
    amount: 25
  },
  {
    sector: "Transport",
    amount: 14
  },
  {
    sector: "Food",
    amount: 24
  },
  {
    sector: "Industry",
    amount: 21
  },
  {
    sector: "Land Sinks",
    amount: 24
  },
  {
    sector: "Ocean Sinks",
    amount: 17
  }
];

const sectorEndData = [
  {
    sector: "Electricity Generation",
    amount: 17
  },
  {
    sector: "Transport",
    amount: 10
  },
  {
    sector: "Food",
    amount: 20
  },
  {
    sector: "Industry",
    amount: 15
  },
  {
    sector: "Land Sinks",
    amount: 34
  },
  {
    sector: "Ocean Sinks",
    amount: 37
  }
];

function makeSinkSourceDataObj(sectorData) {
  const sinkSectors = ["Land Sinks", "Ocean Sinks"];

  const sourceSectors = [
    "Electricity Generation",
    ,
    "Transport",
    "Food",
    "Industry"
  ];

  const sourceSectorData = sectorData.filter(
    x => sourceSectors.indexOf(x.sector) > -1
  );
  const sinkSectorData = sectorData.filter(
    x => sinkSectors.indexOf(x.sector) > -1
  );

  return {
    sources: sourceSectorData,
    sinks: sinkSectorData
  };
}

export default {
  title: "Components/Charts/SectorsPieChart",
  component: SectorsPieChart,
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
    },
    showDrawdownArc: {
      control: {
        type: "boolean"
      }
    },
    drawdownArcWidth: {
      control: {
        type: "number"
      }
    },
    drawdownArcGap: {
      control: {
        type: "number"
      }
    }
  }
};

const mockData = [
  makeSinkSourceDataObj(sectorStartData),
  makeSinkSourceDataObj(sectorEndData)
];

export const Minimal = args => {
  return <SectorsPieChart {...args} />;
};

Minimal.args = {
  data: mockData,
  width: 200,
  height: 200,
  margin: { top: 20, right: 20, bottom: 20, left: 20 },
  showBg: false,
  bgWidth: 0,
  showShadow: false,
  showMultiple: false,
  colors: defaultColors,
  showDrawdownArc: true
};

export const WithStartEndAndBackground = args => {
  return <SectorsPieChart {...args} />;
};

WithStartEndAndBackground.args = {
  data: mockData,
  width: 200,
  height: 200,
  margin: { top: 20, right: 20, bottom: 20, left: 20 },
  showBg: true,
  bgWidth: 30,
  showShadow: false,
  showMultiple: true,
  colors: defaultColors
};
