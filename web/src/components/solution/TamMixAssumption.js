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
            dataType="numeric"
            chart={false} />
          <Row
            label="Used Fixed Weight"
            target="cluster"
            varpath="use_fixed_weight"
            dataType="boolean" />
          <Row
            label="Impact of Ed. Attainment"
            target="cluster"
            varpath="impact_of_ed_attainment"
            dataType="percent"
            chart={false}  />
          <Row
            label="Twh per TWH"
            target="cluster"
            varpath="Twh_per_TWH"
            dataType="numeric"
            chart={false}  />
          <Row
            label="Twh per Million m3 of Water produced"
            target="cluster"
            varpath="Twh_per_water"
            dataType="numeric"
            chart={false}  />
          <Row
            label="Fuel (TJ) unit per TWH"
            target="cluster"
            varpath="fuel_unit_per_TWh"
            dataType="numeric"
            chart={false} />
          <Row
            label="Fuel (TJ) unit per TWH (Car Fuel unit (Liters) per Pkm)"
            target="cluster"
            varpath="fuel_unit_per_TWh_car"
            dataType="numeric"
            chart={false} />
          <Row
            label="Fuel (TJ) unit per TWH (Bus Fuel unit (Liters) per Pkm)"
            target="cluster"
            varpath="fuel_unit_per_TWh_bus"
            dataType="numeric"
            chart={false} />
          <Row
            label="Fuel (TJ) unit per TWH (Liters per Billion Ton-Nmiles)"
            target="cluster"
            varpath="fuel_unit_per_TWh_freight"
            dataType="numeric"
            chart={false} />
          <Row
            label="Fuel (TJ) unit per TWH (Fuel unit (Liter) per million tonne-km)"
            target="cluster"
            varpath="fuel_unit_per_TWh_air"
            dataType="numeric"
            chart={false} />
          <Row
            label="Direct Emissions (t CO2-eq per TWh (th) Final Energy)"
            target="cluster"
            varpath="direct_emission_co2"
            dataType="numeric"
            chart={false}/>
          <Row
            label="Direct Emissions (t CH4-CO2eq per TWh (th) Final Energy (34 GWP))"
            target="cluster"
            varpath="direct_emission_ch4_co2"
            dataType="numeric"
            chart={false}/>
          <Row
            label="Direct Emissions (t N2O-CO2eq per TWh (th) Final Energy (298 GWP))"
            target="cluster"
            varpath="direct_emission_n2o_co2"
            dataType="numeric"
            chart={false}/>
          <Row
            label="Direct Emissions (t CO2-eq per Million Metric Tonnes of Paper Produced)"
            target="cluster"
            varpath="direct_emission_paper"
            dataType="numeric"
            chart={false}/>
          <Row
            label="Direct Emissions (t CO2-eq per MMt of Plastic Produced Annually)"
            target="cluster"
            varpath="direct_emission_plastic"
            dataType="numeric"
            chart={false}/>
          <Row
            label="Indirect Emissions (t CO2-eq per Million Metric Tonnes of Paper Produced)"
            target="cluster"
            varpath="indirect_emission_paper"
            dataType="numeric"
            chart={false}/>
            
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