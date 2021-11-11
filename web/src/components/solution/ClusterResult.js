import styled from "styled-components"
import { useHistory } from "react-router-dom"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import { Grid, GridItem, Text, Center } from "@chakra-ui/react"
import {
  useStringVarpathSelector,
  useObjectPathSelector
} from "redux/selectors.js"
import { 
  Card,
  CardBody,
  CardTitle,
  CardHeader
 } from "components/Card"

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

const ResultContainerWrapper = ({ children }) => {
  return (
    <GridItem 
      colSpan={3}>
      <Grid
        templateRows="repeat(2, 1fr)">
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
      >{text}</Text>
    </GridItem>
  )
}

const ResultContainer = ({ type, color, data }) => {
  const primaryColor = `brand.${color}.100`
  const secondaryColor = `brand.${color}.400`

  return (
    <Grid
      w="100%"
      mt={3}
      mb={8}
      templateColumns="repeat(12, 1fr)">
      <ResultContainerWrapper>
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
      <ResultContainerWrapper>
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
      </ResultContainerWrapper>
      {
        data.map((result, i) => 
          <ResultContainerWrapper
            key={`result_${i}`}
          >
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
          </ResultContainerWrapper>
        )
      }
    </Grid>
  )
}

const calculateSolution = (startYear, endYear, data) => {
  const lldc_conventional = generateValue(startYear, endYear, data["EMISSIONS ALLOCATIONS in LLDC"]["Health and Education"].conventional)
  const lldc_solution = generateValue(startYear, endYear, data["EMISSIONS ALLOCATIONS in LLDC"]["Health and Education"].solution)
  const mdc_conventional = generateValue(startYear, endYear, data["EMISSIONS ALLOCATIONS in MDC"]["Health and Education"].conventional)
  const mdc_solution = generateValue(startYear, endYear, data["EMISSIONS ALLOCATIONS in MDC"]["Health and Education"].solution)

  return {
    lldc_conventional,
    lldc_solution,
    mdc_conventional,
    mdc_solution,
    total_conventional: parseFloat(lldc_conventional) + parseFloat(mdc_conventional),
    total_solution: parseFloat(lldc_solution) + parseFloat(mdc_solution)
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
  path
}) => {
  const history = useHistory();
  const startYearA = useStringVarpathSelector(`report_start_year_a`, 'cluster');
  const endYearA = useStringVarpathSelector(`report_end_year_a`, 'cluster');
  const startYearB = useStringVarpathSelector(`report_start_year_b`, 'cluster');
  const endYearB = useStringVarpathSelector(`report_end_year_b`, 'cluster');

  const data = useObjectPathSelector('workbook.techData.data')

  const data_a = calculateSolution(startYearA, endYearA, data)
  const data_b = calculateSolution(startYearB, endYearB, data)

  return (
    <Card size="xl">
      <CardHeader color={color}>
        <CardTitle
          icon={faQuestionCircle}
            onClick={() => history.push({ hash: `#modal/${path}` })
          }>
            Result
        </CardTitle>
      </CardHeader>
      <CardBody>
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
            />

            <ResultContainer
              type="MDC"
              data={[data_a, data_b]}
              color={color}
            />

            <ResultContainer
              type="Total"
              data={[data_a, data_b]}
              color={color}
            />
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  )
}

export default ClusterResult