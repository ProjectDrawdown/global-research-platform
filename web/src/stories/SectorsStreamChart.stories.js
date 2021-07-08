import React from "react";
import StreamChart from "../components/charts/StreamChart";
import { defaultColors } from "../components/charts/HalfPiesChart";
import { randomData } from "../api/api";

export default {
  title: "Components/Charts/StreamChart",
  component: StreamChart,
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
  return <StreamChart {...args} />;
};

export const Minimal = Template.bind({});

Minimal.args = {
  data: randomData,
  width: 900,
  height: 300,
  margin: { top: 20, right: 20, bottom: 20, left: 20 },
  showBg: false,
  bgWidth: 0,
  colors: defaultColors
};
