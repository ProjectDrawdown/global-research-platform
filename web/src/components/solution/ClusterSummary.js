import styled from "styled-components"
import { Grid, GridItem, Text, Center } from "@chakra-ui/react"
import {
    useStringVarpathSelector,
    useObjectPathSelector
} from "redux/selectors.js"
import React from "react"

const BoldText = styled(Text)`
    font-weight: bold;
`

const ResultWrapper = styled.div`
  padding-bottom: 0.25rem
`

export const ClusterSummaryHeader = () => (
    <span>Gt-CO2-eq Avoided</span>
)

const generateValue = (startYear, endYear, data) => {
    let result = 0;
  
    data.forEach((entry) => {
      if (startYear <= parseInt(entry.year) &&
        endYear >= parseInt(entry.year)) {
        result += entry.value
      }
    })
    
    return (result / 1000).toFixed(2)
}

const ResultHeader = ({
    header_a,
    header_b
  }) => {
    return (
      <Grid
        w="100%"
        mt={3}
        mb={3}
        templateColumns="repeat(12, 1fr)">
          <GridItem colSpan={6}>
            <BoldText>CLUSTERS</BoldText>
          </GridItem>
          <GridItem colSpan={3}>
            <GridItem borderBottom="1px" borderColor="gray.200">
              <Text>{header_a}</Text>
            </GridItem>
          </GridItem>
          <GridItem colSpan={3}>
            <GridItem borderBottom="1px" borderColor="gray.200">
              <Text>{header_b}</Text>
            </GridItem>
          </GridItem>
      </Grid>
    )
}

const ResultBody = ({
    data
}) => {
    return (
        <Grid
        w="100%"
        mt={3}
        mb={3}
        templateColumns="repeat(12, 1fr)">
            {
                data.map((d, index) => (
                    <ResultWrapper key={`cs_${index}`}>
                        <GridItem colSpan={4}>
                            <BoldText>{d.name}</BoldText>
                        </GridItem>
                        <GridItem colSpan={4}>
                            <Text>{d.data_a}</Text>
                        </GridItem>
                        <GridItem colSpan={4}>
                            <Text>{d.data_a}</Text>
                        </GridItem>
                    </ResultWrapper>
                ))
            }
          
      </Grid>
    )
}

const ResultBodyV2 = ({
  data
}) => {
  const clusters = Object.keys(data);

  return (
    <React.Fragment>
      {
        clusters.map((d, index) => (
          <Grid
            w="100%"
            mt={3}
            mb={3}
            templateColumns="repeat(12, 1fr)"> 
            <GridItem colSpan={3}>
              <BoldText>{d}</BoldText>
            </GridItem>
            <GridItem colSpan={3}>
              <GridItem>
                <Center>LLDC</Center>
              </GridItem>
              <GridItem>
                <Center>MDC</Center>
              </GridItem>
            </GridItem>
            <GridItem colSpan={3}>
              <GridItem>
                <Text>{data[d]["LLDC"]?.data_a || "-"}</Text>
              </GridItem>
              <GridItem>
                <Text>{data[d]["MDC"]?.data_a || "-"}</Text>
              </GridItem>
            </GridItem>
            <GridItem colSpan={3}>
              <GridItem>
                <Text>{data[d]["LLDC"]?.data_b || "-"}</Text>
              </GridItem>
              <GridItem>
                <Text>{data[d]["MDC"]?.data_b || "-"}</Text>
              </GridItem>
            </GridItem>
          </Grid>
        ))
      }
    </React.Fragment>
  )
}

const ClusterSummary = ({
    technology
}) => {
    const sourceObj = useObjectPathSelector(
        technology,
        {}
    );

    const startYearA = useStringVarpathSelector(`report_start_year_a`, 'cluster');
    const endYearA = useStringVarpathSelector(`report_end_year_a`, 'cluster');
    const startYearB = useStringVarpathSelector(`report_start_year_b`, 'cluster');
    const endYearB = useStringVarpathSelector(`report_end_year_b`, 'cluster');

    if (!sourceObj.cluster_summary) {
      return <></>
    }

    const allData = sourceObj.cluster_summary.data || {}
    const clusters = Object.keys(allData);
    const results = []
    const resultMerged = {}
    const resultPlastic = {
      name: "non-differential",
      data_a: 0,
      data_b: 0
    }

    clusters.forEach(c => {
      results.push({
        name: c,
        data_a: generateValue(startYearA, endYearA, allData[c]),
        data_b: generateValue(startYearB, endYearB, allData[c])
      })
    })

    results.forEach(c => {
      const clusterData = c.name.split("-")
      const name = clusterData[0].trim();
      const type = clusterData[1].trim();

      // Edge case for plastic
      if (name === "Plastics MMT") {
        resultPlastic.data_a = c.data_a;
        resultPlastic.data_b = c.data_b;
        return;
      };

      if (!resultMerged[name]) {
        resultMerged[name] = {}
      }

      resultMerged[name][type] = {
        data_a: c.data_a,
        data_b: c.data_b
      }
    })

    console.log(resultPlastic);

    return (
      <Grid minW="100%">
        <GridItem>
          <ResultHeader
            header_a={`${startYearA}-${endYearA}`}
            header_b={`${startYearB}-${endYearB}`}
          />

          <ResultBodyV2
            data={resultMerged}
          />

          <Grid
            w="100%"
            mt={3}
            mb={3}
            templateColumns="repeat(12, 1fr)"> 
            <GridItem colSpan={3}>
              <BoldText>{resultPlastic.name}</BoldText>
            </GridItem>
            <GridItem colSpan={3}>
              <GridItem>
                <Center>All</Center>
              </GridItem>
            </GridItem>
            <GridItem colSpan={3}>
              <GridItem>
                <Text>{resultPlastic.data_a || "-"}</Text>
              </GridItem>
            </GridItem>
            <GridItem colSpan={3}>
              <GridItem>
                <Text>{resultPlastic.data_b || "-"}</Text>
              </GridItem>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    )
}

export default ClusterSummary
  