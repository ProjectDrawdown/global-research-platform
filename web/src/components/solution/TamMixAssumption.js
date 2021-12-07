import { Grid, GridItem } from "@chakra-ui/react"
import {
  SolutionCardsStack,
} from "components/solution"
import { Row } from "components/solution/row"

const TamResult = () => {
  return (
    <GridItem px={3}>
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


const TamMixAssumption = ({
  color
}) => {
  return (<TamResult />)
}

export default TamMixAssumption