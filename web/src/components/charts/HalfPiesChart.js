import React from "react";
import { Arc, Pie, arc as arcPathFactory } from "@visx/shape";
import { Group } from "@visx/group";
import { dataConfig } from "../../api/api";
import { makeSinkSourceDataObj } from "./util";

const getAmount = d => d.amount;

// Margins allow for some extra space if scaled radius goes beyond base.
const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

function HalfPiesChartSegmentPie({
  data,
  outerRadius,
  startAngle,
  endAngle,
  colors,
  showMultiple = false
}) {
  const pieSortValues = (a, b) => b - a;
  return (
    <Pie
      data={data[data.length - 1]}
      pieValue={getAmount}
      pieSortValues={pieSortValues}
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

export default function HalfPiesChart({
  data,
  width,
  height,
  margin = defaultMargin,
  startIndex = null,
  endIndex = null,
  showMultiple = true,
  showBg = false,
  showShadow = false,
  bgWidth = 0,
  colors = {},
  sourceSectors = [],
  sinkSectors = []
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
  const colorsAll = Object.assign({}, dataConfig.defaultChartColors, colors);

  const startData = makeSinkSourceDataObj(
    startIndex ? data[startIndex] : data[0],
    sourceSectors,
    sinkSectors
  );
  const endData = makeSinkSourceDataObj(
    endIndex ? data[endIndex] : data[data.length - 1],
    sourceSectors,
    sinkSectors
  );
  const sourceSectorsStart = startData.sources;
  const sinkSectorsStart = startData.sinks;
  const sourceSectorsEnd = endData.sources;
  const sinkSectorsEnd = endData.sinks;
  const finalShowMultiple = showMultiple && data.length > 1;

  const sinkEndTotal = sinkSectorsEnd.reduce((acc, cur) => {
    return cur.amount + acc;
  }, 0);
  const sourceEndTotal = sourceSectorsEnd.reduce((acc, cur) => {
    return cur.amount + acc;
  }, 0);
  let sourceRadiusScale, sinkRadiusScale, bgColor;
  const chartRadius = maxRadius - (showBg ? bgWidth : 0);

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
          <HalfPiesChartSegmentPie
            data={[sourceSectorsStart, sourceSectorsEnd]}
            showMultiple={finalShowMultiple}
            outerRadius={chartRadius * sourceRadiusScale}
            startAngle={(Math.PI * 3) / 2}
            endAngle={(Math.PI * 5) / 2}
            colors={colorsAll}
          />
          <HalfPiesChartSegmentPie
            data={[sinkSectorsStart, sinkSectorsEnd]}
            showMultiple={finalShowMultiple}
            outerRadius={chartRadius * sinkRadiusScale}
            startAngle={(Math.PI * 1) / 2}
            endAngle={(Math.PI * 3) / 2}
            colors={colorsAll}
          />
        </g>
      </Group>
    </svg>
  );
}
