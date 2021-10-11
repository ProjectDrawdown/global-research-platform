import { Heading, Text, Grid, GridItem } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { humanize } from "util/component-utilities"
import {
  useStringVarpathSelector
} from "redux/selectors.js"
import { Card, 
  CardBody, 
  CardTitle,
  CardHeader
} from "components/Card"
import {
  SolutionCardsStack,
} from "components/solution"
import { Row } from "components/solution/row"
import {
  BoundSelect,
} from "components/forms/form-elements.js"


const StyledHeaderGridItem = styled(GridItem)`
  color: black;
  font-size: 14px;
  line-height: 21px;
`;

const BoldText = styled(Text)`
  font-weight: bold;
`

const TamMixHeader = () => {
  return (
    <Grid
      mt={3}
      mb={6}
      gap={4}
      templateColumns="repeat(12, 1fr)">
      <StyledHeaderGridItem colSpan={3}>
        <BoldText>Technology</BoldText>
      </StyledHeaderGridItem>
      <StyledHeaderGridItem colSpan={3}>
        <BoldText>Adoption %</BoldText>
      </StyledHeaderGridItem>
      <StyledHeaderGridItem colSpan={3}>
        <BoldText>Integration</BoldText>
      </StyledHeaderGridItem>
    </Grid>
  )
}

const TamMixContent = ({title, data}) => {
  return (
    <Grid
      mt={3}
      mb={3}
      gap={4}
      templateColumns="repeat(12, 1fr)">
      <StyledHeaderGridItem colSpan={3}>
        <BoldText>{humanize(title)}</BoldText>
      </StyledHeaderGridItem>
      <StyledHeaderGridItem colSpan={3}>
        {data['adoption']} %
      </StyledHeaderGridItem>
      <StyledHeaderGridItem colSpan={3}>
        <BoundSelect
            varpath="adoption_prognostication_growth"
            options={{
              ignore: "Ignore",
              solution: "In Solution",
              convention: "In Convention"
            }}
            size="sm"
          />
      </StyledHeaderGridItem>
    </Grid>
  )
}

const TamMix = ({
  color,
  activeTechnology
}) => {
  const varValue = useStringVarpathSelector(`technologies.${activeTechnology}.tam_mix`, 'clusters');

  const mixes = varValue ? Object.keys(varValue) : []

  return (
    <Card size="xl" h="100%">
      <CardHeader color={color}>
        <CardTitle>TAM Mix</CardTitle>
      </CardHeader>
      <CardBody>
        <Grid minW="100%">
          <GridItem px={3}>
            <TamMixHeader />
            {
              mixes.map((item, index) => 
                <TamMixContent
                  key={`tam_mix_${index}`} 
                  title={item}
                  data={varValue[item]}
                />)
            }
          </GridItem>
          <TamResult 
            activeTechnology={activeTechnology}/>
        </Grid>
      </CardBody>
    </Card>
  )
}

const TamResult = ({
  activeTechnology
}) => {
  const varValue = useStringVarpathSelector(`technologies.${activeTechnology}.assumption`, 'clusters');
  const assumptions = varValue ? Object.keys(varValue) : []

  return (
    <GridItem px={3}>
      <Heading size="sm" mb="0.75rem">Assumptions</Heading>
      <SolutionCardsStack stack="sm" mb="0.75rem">
        <Grid minW="100%">
          {
            assumptions.map((item, index) => 
            
              <Row
                key={`assumptions_${index}`}
                label={humanize(item)}
                // todo: fix this mapping
                varpath="emissions_per_funit.value"
                dataType="numeric"/>
            )
          }
          </Grid>
        <SolutionCardsStack stack="sm" mb="0.75rem">
          <span>{' '}</span>
        </SolutionCardsStack>
      </SolutionCardsStack>
    </GridItem>
  )
}

const TamMixSection = ({
  color
}) => {
  const params = useParams();
  const activeTechnology = params.technologyId;

  return (
    <TamMix 
      color={color}
      activeTechnology={activeTechnology}/>
  )
}

export default TamMixSection