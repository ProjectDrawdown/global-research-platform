import { Heading, Text, Grid, GridItem } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { humanize } from "util/component-utilities"
import {
  useStringVarpathSelector
} from "redux/selectors.js"
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

const TamMixContent = ({
  name,
  activeTechnology
}) => {
  const adoptionValue = useStringVarpathSelector(
    `technologies.${activeTechnology}.tam_mix_adoption_${name}`,
    'cluster'
  );

  return (
    <Grid
      mt={3}
      mb={3}
      gap={4}
      templateColumns="repeat(12, 1fr)">
      <StyledHeaderGridItem colSpan={3}>
        <BoldText>{humanize(name)}</BoldText>
      </StyledHeaderGridItem>
      <StyledHeaderGridItem colSpan={3}>
        {
          adoptionValue &&
            <span>{adoptionValue} %</span>
        }
      </StyledHeaderGridItem>
      <StyledHeaderGridItem colSpan={3}>
        <BoundSelect
            varpath={`tam_mix_integration_${name}`}
            target="cluster"
            options={{
              ignore: "Ignore",
              solution: "In Solution",
              convention: "In Conventional"
            }}
            size="sm"
          />
      </StyledHeaderGridItem>
    </Grid>
  )
}

const TamMix = ({
  activeTechnology
}) => {
  const varValue = useStringVarpathSelector(`technologies.${activeTechnology}`, 'cluster', 0, false);
  const keys = varValue ? Object.keys(varValue) : []

  console.log(varValue)

  // loop through the selector to create the object
  const data = []
  keys.forEach((name) => {
    if (name.includes("tam_mix_integration")) {
      // getting the title
      data.push(name.replace("tam_mix_integration_", ""))
    }
  })

  return (
    <Grid minW="100%">
      <GridItem px={3}>
        <TamMixHeader />
        {
          data.map((name, index) => 
            <TamMixContent
              key={`tam_mix_${index}`} 
              name={name}
              activeTechnology={activeTechnology}
            />)
        }
      </GridItem>
      <TamResult 
        activeTechnology={activeTechnology}/>
    </Grid>
  )
}

const TamResult = () => {
  return (
    <GridItem px={3}>
      <Heading size="sm" mb="0.75rem">Assumptions</Heading>
      <SolutionCardsStack stack="sm" mb="0.75rem">
        <Grid minW="100%">
          <Row
            label="Fixed Weighting Factor"
            target="cluster"
            varpath="fixed_weighting_factor"
            dataType="numeric" />
          <Row
            label="Used Fixed Weight"
            target="cluster"
            varpath="use_fixed_weight"
            dataType="boolean" />
          <Row
            label="Impact of Ed. Attainment"
            target="cluster"
            varpath="impact_of_ed_attainment"
            dataType="numeric" />
          <Row
            label="Twh per TWH"
            target="cluster"
            varpath="Twh_per_TWH"
            dataType="numeric" />
          <Row
            label="Fuel unit per TWH"
            target="cluster"
            varpath="fuel_unit_per_TWh"
            dataType="numeric" />
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