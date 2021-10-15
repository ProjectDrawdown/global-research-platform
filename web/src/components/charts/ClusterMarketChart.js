import { VictoryChart, VictoryArea, VictoryAxis, VictoryLegend } from "victory"
import { Grid, GridItem } from "@chakra-ui/react"
import {
  useObjectPathSelector,
} from "redux/selectors.js"

const generateAxis = (data, type) => {
  const axis = []

  data[type].forEach((obj) => {
    axis.push({
      x: obj.year,
      y: obj.value
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

  const lldc = sourceObj["EMISSIONS ALLOCATIONS in LLDC"]["Health and Education"]
  const mdc = sourceObj["EMISSIONS ALLOCATIONS in MDC"]["Health and Education"]


  const lldcConventional = generateAxis(lldc, "conventional")
  const lldcSolution = generateAxis(lldc, "solution")

  const mdcConventional = generateAxis(mdc, "conventional")
  const mdcSolution = generateAxis(mdc, "solution")

  return (
    <Grid minW="100%">
      <GridItem>
        <VictoryChart
          height={150}
          padding={{ left: 60, right: 20, bottom: 30, top: 10 }}
          >
          <VictoryAxis
            tickFormat={(v) => v.toString()}
            style={{
              axis: { stroke: "#f2f2f2" },
              tickLabels: {
                fontSize: 8,
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
            label="TWh"
            fixLabelOverlap={true}
            width="100%"
          />
          <VictoryArea
            data={lldcConventional}
            style={{ data: { fill: "#edf2f7" } }}
            interpolation="natural"
          />
          <VictoryArea
            data={lldcSolution}
            style={{ data: { fill: "#ffcdc2" } }}
            interpolation="natural"
          />
          <VictoryArea
            data={mdcConventional}
            style={{ data: { fill: "#ff8f75" } }}
            interpolation="natural"
          />
          <VictoryArea
            data={mdcSolution}
            style={{ data: { fill: "#FF542E" } }}
            interpolation="natural"
          />
        </VictoryChart>
      </GridItem>
      <GridItem>
        <VictoryLegend
          x={100} y={10}
          orientation="horizontal"
          height={25}
          style={{ labels: {fontSize: 6 } }}
          data={[
            { name: "LLDC in Convetional", symbol: { fill: "#edf2f7" } },
            { name: "LLDC in Solution", symbol: { fill: "#ffcdc2" } },
            { name: "MDC in Conventional", symbol: { fill: "#ff8f75" } },
            { name: "MDC in Solution", symbol: { fill: "#FF542E" } }
          ]}/>
      </GridItem>
    </Grid>
  )
}

export default ClusterMarketChart