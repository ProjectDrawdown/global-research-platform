import React from "react";
import { Circle, Arc, Pie, arc as arcPathFactory } from "@visx/shape";
import { Group } from "@visx/group";

const getAmount = d => d.amount;

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };
export const defaultColors = {
  buildup: "#A6A6A6",
  drawdown: "#FFF0B1",
  "Electricity Generation": "#FF4C24",
  Transport: "#009B9E",
  Food: "#529334",
  Industry: "#3885CC",
  "Land Sinks": "#C87828",
  "Ocean Sinks": "#007494"
};

function SectorsPieChartSegmentPie({
  data,
  outerRadius,
  startAngle,
  endAngle,
  colors,
  showMultiple = true
}) {
  return (
    <Pie
      data={data[data.length - 1]}
      pieValue={getAmount}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
    >
      {pie => {
        return pie.arcs.map((arc, index) => {
          const { sector, amount: endAmount } = arc.data;
          const endArcPath = pie.path(arc);
          const startRatio = data[0][index].amount / endAmount;
          const startArcPathFunc = arcPathFactory({
            innerRadius: startRatio > 1 ? outerRadius : 0,
            outerRadius: outerRadius * startRatio
          });
          const startArcPath = startArcPathFunc(arc);
          const outlineArcPathFunc = arcPathFactory({
            innerRadius: 0,
            outerRadius:
              showMultiple && startRatio > 1
                ? outerRadius * startRatio
                : outerRadius
          });
          const outlinePath = outlineArcPathFunc(arc);
          const arcFill = colors[sector];
          return (
            <g key={`arc-${sector}-${index}`}>
              <path d={endArcPath} fill={arcFill} strokeWidth="0" />
              {showMultiple && (
                <path d={startArcPath} fill={arcFill} strokeWidth="0" />
              )}
              {showMultiple && (
                <path
                  d={startArcPath}
                  fill="rgba(255,255,255,0.5)"
                  strokeWidth="0"
                  stroke="#FFF"
                />
              )}
              <path
                d={outlinePath}
                stroke="#FFF"
                fill="rgba(0,0,0,0)"
                strokeWidth="2"
              />
            </g>
          );
        });
      }}
    </Pie>
  );
}

export default function SectorsPieChart({
  data,
  width,
  height,
  margin = defaultMargin,
  showMultiple = true,
  showBg = true,
  showShadow = true,
  bgWidth = 0,
  showDrawdownArc = false,
  drawdownArcWidth = 12,
  drawdownArcGap = 2,
  colors = {}
}) {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  // TODO: determine max radius based on start and end values, then adjust the
  // outerRadius of the pie to a value that will yeild the full maxRadius
  const maxRadius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + margin.top;
  const left = centerX + margin.left;
  const colorsAll = Object.assign({}, defaultColors, colors);

  const sourceSectorsStart = data[0].sources;
  const sinkSectorsStart = data[0].sinks;
  const sourceSectorsEnd = data[data.length - 1].sources;
  const sinkSectorsEnd = data[data.length - 1].sinks;
  const allSectorsStart = [...sinkSectorsStart, ...sourceSectorsStart];
  const allSectorsEnd = [...sinkSectorsEnd, ...sourceSectorsEnd];
  const finalShowMultiple = showMultiple && data.length > 1;

  const sinkEndTotal = sinkSectorsEnd.reduce((acc, cur) => {
    return cur.amount + acc;
  }, 0);
  const sourceEndTotal = sourceSectorsEnd.reduce((acc, cur) => {
    return cur.amount + acc;
  }, 0);
  let sourceRadiusScale, sinkRadiusScale, bgColor;
  const chartRadius = maxRadius - (showBg ? bgWidth : 0);

  // TODO determine why sinkRadius still proovides the correct scale with a single pie.
  // It's a holdover from the HalfPies chart
  if (sinkEndTotal < sourceEndTotal) {
    sourceRadiusScale = 1;
    sinkRadiusScale = sinkEndTotal / sourceEndTotal;
    bgColor = colorsAll.buildup;
  } else {
    sinkRadiusScale = 1;
    sourceRadiusScale = sourceEndTotal / sinkEndTotal;
    bgColor = colorsAll.drawdown;
  }

  return (
    <svg width={width} height={height}>
      {showShadow && (
        <filter id="shadow">
          <feDropShadow dx="0" dy="0" stdDeviation="1" />
        </filter>
      )}
      <Group top={top} left={left}>
        {showBg && (
          <Arc
            outerRadius={chartRadius + bgWidth}
            innerRadius={
              chartRadius * Math.min(sinkRadiusScale, sourceRadiusScale)
            }
            startAngle={0}
            endAngle={Math.PI * 2}
            data={[1]}
            stroke="#FFF"
            strokeWidth="4"
            fill={bgColor}
          ></Arc>
        )}
        <g style={showShadow ? { filter: "url(#shadow)" } : {}}>
          <SectorsPieChartSegmentPie
            data={[allSectorsStart, allSectorsEnd]}
            startAngle={Math.PI}
            endAngle={Math.PI * 3}
            showMultiple={finalShowMultiple}
            outerRadius={chartRadius /* * sourceRadiusScale*/}
            colors={colorsAll}
          />
          {showDrawdownArc && (
            <Arc
              outerRadius={chartRadius + drawdownArcGap + drawdownArcWidth}
              innerRadius={chartRadius + drawdownArcGap}
              startAngle={Math.PI}
              endAngle={
                Math.PI +
                (Math.PI * 2 * sinkEndTotal) / (sinkEndTotal + sourceEndTotal)
              }
              data={[1]}
              fill={bgColor}
            ></Arc>
          )}
        </g>
      </Group>
    </svg>
  );
}
