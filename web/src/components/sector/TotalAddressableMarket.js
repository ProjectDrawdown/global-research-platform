import React from "react";
import { SelectedTabs } from "../Tabs";
import { Input, Stack } from "@chakra-ui/react";

import { AreaStack } from "@visx/shape";
import { GradientOrangeRed } from "@visx/gradient";
import { scaleTime, scaleLinear } from "@visx/scale";

const data = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 }
];

const yMax = 200;
const xMax = 500;

const xScale = scaleTime({
  range: [0, xMax],
  domain: [
    Math.min(...data.map(() => data.value)),
    Math.max(...data.map(() => data.value))
  ]
});
const yScale = scaleLinear({
  range: [yMax, 0]
});

const getDate = d => d;
const getY0 = d => d[0] / 100;
const getY1 = d => d[1] / 100;

const RegionForm = () => (
  <Stack spacing={3}>
    <Input placeholder="large size" size="lg" />
    <Input placeholder="default size" size="md" />
    <Input placeholder="small size" size="sm" />
  </Stack>
);

export default ({ regions }) => (
  <React.Fragment>
    <svg width={500} height={200}>
      <GradientOrangeRed id="stacked-area-orangered" />
      <rect x={0} y={0} width={500} height={200} fill={"white"} rx={14} />
      <AreaStack
        top={0}
        left={0}
        keys={[0, 1, 2, 3, 4]}
        data={data}
        x={d => xScale(getDate(d.data)) ?? 0}
        y0={d => yScale(getY0(d)) ?? 0}
        y1={d => yScale(getY1(d)) ?? 0}
      >
        {({ stacks, path }) =>
          stacks.map(stack => (
            <path
              key={`stack-${stack.key}`}
              d={path(stack) || ""}
              stroke="transparent"
              fill="url(#stacked-area-orangered)"
            />
          ))
        }
      </AreaStack>
    </svg>
    <SelectedTabs regions={regions} RegionForm={RegionForm}></SelectedTabs>
  </React.Fragment>
);
