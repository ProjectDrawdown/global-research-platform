import { 
  VictoryChart,
  VictoryStack,
  VictoryArea,
  VictoryAxis,
  VictoryLegend,
  VictoryTooltip,
  VictoryVoronoiContainer
} from "victory"
import { Grid, GridItem } from "@chakra-ui/react"
import {
  useObjectPathSelector,
} from "redux/selectors.js"

const generateAxis = (data, type, label) => {
  const axis = []

  data[type].forEach((obj) => {
    axis.push({
      x: obj.year,
      y: obj.value,
      l: label
    })
  })

  return axis
}

// TODO: show legend with colors
// TODO: figure out color and size
const ClusterMarketChart = ({ sourceListObjectpath }) => {
  const sourceObj = useObjectPathSelector(
    sourceListObjectpath,
    {}
  );

  if (!sourceObj["EMISSIONS ALLOCATIONS in LLDC"] && !sourceObj["EMISSIONS ALLOCATIONS in MDC"]) {
    return <></>
  }

  const lldc = sourceObj["EMISSIONS ALLOCATIONS in LLDC"]["data"]["Health and Education"]
  const mdc = sourceObj["EMISSIONS ALLOCATIONS in MDC"]["data"]["Health and Education"]


  const lldcConventional = generateAxis(lldc, "conventional", "LLDC")
  const mdcConventional = generateAxis(mdc, "conventional", "MDC")

  return (
      <Grid minW="100%">
        <GridItem>
          <VictoryChart
            height={150}
            padding={{ left: 60, right: 20, bottom: 30, top: 10 }}
            containerComponent={
              <VictoryVoronoiContainer voronoiDimension="x"
                labels={({ datum }) => `${datum.l}: ${datum.y.toFixed(2)} Million Metric Tons CO2`}
                labelComponent={
                  <VictoryTooltip
                    center={{ x: 225, y: 30 }}
                    style={{fontSize: '6px'}}
                    cornerRadius={1}
                    flyoutStyle={{
                      fill: "white",
                      strokeWidth: 0.5
                    }}
                  />
                }
              />
            }
            >
            <VictoryAxis
              tickFormat={(v) => v.toString()}
              style={{
                axis: { stroke: "#f2f2f2" },
                tickLabels: {
                  fontSize: 2,
                  fill: "#a3a3a3"
                },
                ticks: { stroke: "#bababa", size: 2, verticalAnchor: "middle" },
                grid: { stroke: "#f2f2f2", strokeWidth: 0.5 }
              }}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axisLabel: {fontSize: 8, padding: 40, fill: "#bababa"},
                axis: { stroke: "#f2f2f2" },
                tickLabels: {
                  fill: "#a3a3a3",
                  fontSize: 8
                },
                ticks: { stroke: "#bababa", size: 2, verticalAnchor: "middle" },
                grid: { stroke: "#f2f2f2", strokeWidth: 0.5 }
              }}
              label="Culmulative Million Metric Tons CO2"
              fixLabelOverlap={true}
            />

            <VictoryStack>
              <VictoryArea
                data={mdcConventional}
                style={{ data: { fill: "#ff8f75" } }}
                interpolation="natural"
              />

              <VictoryArea
                data={lldcConventional}
                style={{ data: { fill: "#edf2f7" } }}
                interpolation="natural"
              />
            </VictoryStack>
            
          </VictoryChart>
        </GridItem>
        <GridItem>
          <VictoryLegend
            x={175} y={5}
            orientation="horizontal"
            height={25}
            style={{ labels: {fontSize: 4 } }}
            data={[
              { name: "LLDC in Conventional", symbol: { fill: "#edf2f7" } },
              { name: "MDC in Conventional", symbol: { fill: "#ff8f75" } },
            ]}/>
        </GridItem>
      </Grid>
  )
}

export default ClusterMarketChart