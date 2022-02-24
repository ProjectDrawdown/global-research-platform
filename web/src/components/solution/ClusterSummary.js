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
          <GridItem colSpan={4}>
            <BoldText>CLUSTERS</BoldText>
          </GridItem>
          <GridItem colSpan={4}>
            <GridItem borderBottom="1px" borderColor="gray.200">
              <Text>{header_a}</Text>
            </GridItem>
          </GridItem>
          <GridItem colSpan={4}>
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
                    <React.Fragment key={`cs_${index}`}>
                        <GridItem colSpan={4}>
                            <BoldText>{d.name}</BoldText>
                        </GridItem>
                        <GridItem colSpan={4}>
                            <Text>{d.data_a}</Text>
                        </GridItem>
                        <GridItem colSpan={4}>
                            <Text>{d.data_a}</Text>
                        </GridItem>
                    </React.Fragment>
                ))
            }
          
      </Grid>
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

    clusters.forEach(c => {
      results.push({
        name: c,
        data_a: generateValue(startYearA, endYearA, allData[c]),
        data_b: generateValue(startYearB, endYearB, allData[c])
      })
    })

    return (
      <Grid minW="100%">
        <GridItem>
          <ResultHeader
            header_a={`${startYearA}-${endYearA}`}
            header_b={`${startYearB}-${endYearB}`}
          />

          <ResultBody
            data={results}
          />
        </GridItem>
      </Grid>
    )
}

export default ClusterSummary
  