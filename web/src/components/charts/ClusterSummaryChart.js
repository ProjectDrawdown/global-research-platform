import { VictoryChart, VictoryStack, VictoryArea, VictoryAxis, VictoryLegend } from "victory"
import { Grid, GridItem } from "@chakra-ui/react"
import {
  useObjectPathSelector,
} from "redux/selectors.js"
import BaseCard from "components/cards/BaseCard"

const generateAxis = (data) => {
  const axis = []

  data.forEach((obj) => {
    axis.push({
      x: obj.year,
      y: obj.value
    })
  })

  return axis
}

const ClusterSummaryChart = ({ sourceListObjectpath }) => {
  const sourceObj = useObjectPathSelector(
    sourceListObjectpath,
    {}
  );

  if (!sourceObj.data) {
    return <></>
  }

  const lldc = generateAxis(sourceObj.data.LLDC);
  const mdc = generateAxis(sourceObj.data.MDC);
  const aofp = generateAxis(sourceObj.data.AOFP);

  return (
    <BaseCard
      title={"Total Gt CO2-eq Avoided from Population Change, by country development status*"}
      size="max">
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
              label="TWh"
              fixLabelOverlap={true}
            />
            <VictoryStack>
              <VictoryArea
                data={lldc}
                style={{ data: { fill: "#edf2f7" } }}
                interpolation="natural"
              />

              <VictoryArea
                data={mdc}
                style={{ data: { fill: "#ffcdc2" } }}
                interpolation="natural"
              />

              <VictoryArea
                data={aofp}
                style={{ data: { fill: "#ff8f75" } }}
                interpolation="natural"
              />
            </VictoryStack>
            
          </VictoryChart>
        </GridItem>
        <GridItem>
          <VictoryLegend
            x={125} y={5}
            orientation="horizontal"
            height={25}
            style={{ labels: {fontSize: 4 } }}
            data={[
              { name: "Least & Less Developed Countries", symbol: { fill: "#edf2f7" } },
              { name: "More Developed Countries", symbol: { fill: "#ffcdc2" } },
              { name: "Air, Oceanic Freight and Plastic", symbol: { fill: "#ff8f75" } },
            ]}/>
        </GridItem>
      </Grid>
    </BaseCard>
  )
}

export default ClusterSummaryChart