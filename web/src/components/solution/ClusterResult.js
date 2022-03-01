import styled from "styled-components"
import { Grid, GridItem, Text, Center } from "@chakra-ui/react"
import {
  useStringVarpathSelector,
  useObjectPathSelector
} from "redux/selectors.js"

const BoldText = styled(Text)`
  font-weight: bold;
`

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
        <GridItem colSpan={3}>
          {' '}
        </GridItem>
        <GridItem colSpan={3}>
          {' '}
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

const ResultContainerWrapper = ({ children, rows }) => {
  return (
    <GridItem 
      colSpan={3}>
      <Grid
        templateRows={`repeat(${rows}, 1fr)`}>
          {children}
      </Grid>
    </GridItem>
  )
}

const ResultDataContainer = ({
  color = null,
  text
}) => {
  return(
    <GridItem
      bgColor={color ? color: ""}>
      <Text
        pt={2}
        pb={2}
        pl={1}
        fontSize={["8px", "8px", "10px", "10px", "10px", "md"]}
      >{text}</Text>
    </GridItem>
  )
}

const ResultContainer = ({ type, color, data, rows }) => {
  const primaryColor = `brand.${color}.100`
  const secondaryColor = `brand.${color}.400`

  return (
    <Grid
      w="100%"
      mt={3}
      mb={8}
      templateColumns="repeat(12, 1fr)">
      <ResultContainerWrapper rows={rows}>
        <GridItem rowStart={1}>
          <Center>
            <BoldText
              pt={2}
              pb={2}
            >
              {type}
            </BoldText>
          </Center>
        </GridItem>
      </ResultContainerWrapper>
      <ResultContainerWrapper rows={rows}>
        {
          data[0][`${type.toLowerCase()}_solution`] && data[0][`${type.toLowerCase()}_conventional`] &&
          <>
            <ResultDataContainer
              color={primaryColor}
              text="SOLUTION"
            />
            <ResultDataContainer
              color={secondaryColor}
              text="CONVENTIONAL"
            />
          </>
        }
      </ResultContainerWrapper>
      {
        data.map((result, i) => 
          <ResultContainerWrapper
            rows={rows}
            key={`result_${i}`}
          >
            {
              result[`${type.toLowerCase()}_solution`] && result[`${type.toLowerCase()}_conventional`] ?
              <>
                <ResultDataContainer
                  color={primaryColor}
                  text={result[`${type.toLowerCase()}_solution`]}
                />
                <ResultDataContainer
                  color={secondaryColor}
                  text={result[`${type.toLowerCase()}_conventional`]}
                />
              </>
              :
              <ResultDataContainer
                color={primaryColor}
                text={result[`${type.toLowerCase()}`]}
              />
            }
          </ResultContainerWrapper>
        )
      }
    </Grid>
  )
}

const calculateSolution = (startYear, endYear, data) => {
  const lldc_conventional = generateValue(startYear, endYear, data["EMISSIONS ALLOCATIONS in LLDC"]["data"]["Health and Education"].conventional)
  const lldc_solution = generateValue(startYear, endYear, data["EMISSIONS ALLOCATIONS in LLDC"]["data"]["Health and Education"].solution)
  const mdc_conventional = generateValue(startYear, endYear, data["EMISSIONS ALLOCATIONS in MDC"]["data"]["Health and Education"].conventional)
  const mdc_solution = generateValue(startYear, endYear, data["EMISSIONS ALLOCATIONS in MDC"]["data"]["Health and Education"].solution)

  return {
    lldc_conventional,
    lldc_solution,
    mdc_conventional,
    mdc_solution,
    total_conventional: (parseFloat(lldc_conventional) + parseFloat(mdc_conventional)).toFixed(2),
    total_solution: (parseFloat(lldc_solution) + parseFloat(mdc_solution)).toFixed(2)
  }
}

const calculateSolutionSummary = (startYear, endYear, data) => {
  const lldc = generateValue(startYear, endYear, data["co2_summary"]["data"]["LLDC"])
  const mdc = generateValue(startYear, endYear, data["co2_summary"]["data"]["MDC"])

  return {
    lldc,
    mdc,
    total: (parseFloat(lldc) + parseFloat(mdc)).toFixed(2)
  }
}

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

const ClusterResult = ({
  color,
  path,
  type = "cluster"
}) => {
  const startYearA = useStringVarpathSelector(`report_start_year_a`, 'cluster');
  const endYearA = useStringVarpathSelector(`report_end_year_a`, 'cluster');
  const startYearB = useStringVarpathSelector(`report_start_year_b`, 'cluster');
  const endYearB = useStringVarpathSelector(`report_end_year_b`, 'cluster');

  const data = useObjectPathSelector('workbook.techData.data')
  let data_a
  let data_b
  let rows = 2

  if (type === "cluster") {
    if (!data["EMISSIONS ALLOCATIONS in LLDC"] && !data["EMISSIONS ALLOCATIONS in MDC"]) {
      return <></>
    }
  
    data_a = calculateSolution(startYearA, endYearA, data)
    data_b = calculateSolution(startYearB, endYearB, data)
  } else {
    if (!data["co2_summary"]) {
      return <></>
    }
  
    data_a = calculateSolutionSummary(startYearA, endYearA, data)
    data_b = calculateSolutionSummary(startYearB, endYearB, data)
    rows = 1
  }

  

  return (
    <Grid minW="100%">
      <GridItem>
        <ResultHeader
          header_a={`${startYearA}-${endYearA}`}
          header_b={`${startYearB}-${endYearB}`}
        />

        <ResultContainer
          type="LLDC"
          data={[data_a, data_b]}
          color={color}
          rows={rows}
        />

        <ResultContainer
          type="MDC"
          data={[data_a, data_b]}
          color={color}
          rows={rows}
        />

        <ResultContainer
          type="Total"
          data={[data_a, data_b]}
          color={color}
          rows={rows}
        />
      </GridItem>
    </Grid>
  )
}

export default ClusterResult