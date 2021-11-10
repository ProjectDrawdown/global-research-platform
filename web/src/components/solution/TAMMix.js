import { Text, Grid, GridItem } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { humanize } from "util/component-utilities"
import {
  useStringVarpathSelector
} from "redux/selectors.js"
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
      <StyledHeaderGridItem colSpan={4}>
        <BoldText>Technology</BoldText>
      </StyledHeaderGridItem>
      <StyledHeaderGridItem colSpan={4}>
        <BoldText>Adoption %</BoldText>
      </StyledHeaderGridItem>
      <StyledHeaderGridItem colSpan={4}>
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
      <StyledHeaderGridItem colSpan={4}>
        <BoldText>{humanize(name)}</BoldText>
      </StyledHeaderGridItem>
      <StyledHeaderGridItem colSpan={4}>
        {
          adoptionValue &&
            <span>{adoptionValue} %</span>
        }
      </StyledHeaderGridItem>
      <StyledHeaderGridItem colSpan={4}>
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
    </Grid>
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