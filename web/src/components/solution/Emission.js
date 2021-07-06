import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInoutAddon } from "../../theme/icons";
import { Row } from "./row";
import {
  StyledSpacer,
  ACHeader
} from "./AdvancedControlls";

export const EmissionHeader = () => (
  <span>Solution Emissions (advanced)</span>
);

const EmissionForm = props => (
  <GridItem px={3}>

    <ACHeader />

    <Row
      label="Direct Emissions"
      varpath="emissions_per_funit.value"
      dataType="numeric"
      rightAddon="t"
      color={props.color} />

    <Row
      label="Indirect Emissions"
      varpath="indirect_co2_per_iunit.value"
      dataType="USD"
      leftAddon="$"
      color={props.color} />

    <StyledSpacer />

    <Row
      label="CH4-CO2eq Tons Reduced"
      varpath="ch4_co2_per_funit.value"
      dataType="numeric"
      rightAddon="t"
      color={props.color} />

    <Row
      label="N2O-CO2eq Tons Reduced"
      varpath="no2_co2_per_funit.value"
      dataType="numeric"
      rightAddon="t"
      color={props.color} />

    <StyledSpacer />

    <Row
      label="Use CO2-eq for PPM?"
      varpath="emissions_use_co2eq"
      dataType="boolean"
    />

    <Row label="N2O is CO2eq?"
         varpath="n2o_is_co2eq"
         dataType="boolean"
    />

    <Row label="co2 is co2eq?"
         varpath="co2_is_co2eq"
         dataType="boolean"
    />

    <StyledSpacer />

    <Row
      label="Conversion Source"
      varpath="co2eq_conversion_source"
      dataType="select"
      options={[
        "AR5 with feedback",
        "AR4",
        "SAR"
      ]}
    />

    <StyledSpacer />

    <Grid
      mt={7}
      mb={6}
      px={4}
      py={2}
      bg="#EDF2F7"
      templateColumns="repeat(12, 1fr)">

      <GridItem colSpan={12}>
        <Row
          label="Reference Grid Emissions !TODO!"
          varpath=""
          dataType="numeric"
          conventional="12.34"
          rightAddon="t"
          question={false}
          helper={false}
          chart={false}
          color={"grey"} />
      </GridItem>

      <GridItem colSpan={6}>
        <Row
          label="Grid Source"
          varpath="grid_source"
          dataType="select"
          question={false}
          helper={false}
          spacings={false}
          color={"grey"}
          options={[
            "IPCC Only",
            "Meta Analysis"
          ]} />
        <Row
          label="Grid Range"
          varpath="grid_range"
          dataType="select"
          color={props.color}
          options={{
            Mean: "Mean",
            Low: "Low",
            High: "High"
          }}
        />
      </GridItem>

      <GridItem colSpan={6}>
        <Row
          label="Mean !TODO!"
          varpath=""
          dataType="USD"
          conventional="12.34"
          leftAddon="$"
          question={false}
          helper={false}
          chart={false}
          spacings={false}
          color={"grey"}
          colSpanLeft={4}
          colSpanRight={8}
          addonStyle={{
            color: "#3F3F3F",
            backgroundColor: "#CBD5E0"
          }}
          rightAddon={(
            <FontAwesomeIcon
              size="lg"
              icon={faInoutAddon}
              color={"#3F3F3F"} />
          )} />
      </GridItem>

      <GridItem colSpan={6} colStart={7}>
        <Row
          label="High !TODO!"
          varpath=""
          dataType="USD"
          conventional="12.34"
          leftAddon="$"
          question={false}
          helper={false}
          chart={false}
          spacings={false}
          color={"grey"}
          colSpanLeft={4}
          colSpanRight={8}
          addonStyle={{
            color: "#3F3F3F",
            backgroundColor: "#CBD5E0"
          }}
          rightAddon={(
            <FontAwesomeIcon
              size="lg"
              icon={faInoutAddon}
              color={"#3F3F3F"} />
          )} />
      </GridItem>

      <GridItem colSpan={6} colStart={7}>
        <Row
          label="Low !TODO!"
          varpath=""
          dataType="USD"
          conventional="12.34"
          leftAddon="$"
          question={false}
          helper={false}
          chart={false}
          spacings={false}
          color={"grey"}
          colSpanLeft={4}
          colSpanRight={8}
          addonStyle={{
            color: "#3F3F3F",
            backgroundColor: "#CBD5E0"
          }}
          rightAddon={(
            <FontAwesomeIcon
              size="lg"
              icon={faInoutAddon}
              color={"#3F3F3F"} />
          )} />
      </GridItem>
    </Grid>

    <StyledSpacer />

    <Row
      label="Energy Efficiency Factor"
      varpath="energy_efficiency_factor.value"
      dataType="USD"
      leftAddon="$"
      color={props.color}
    />

    <Row
      label="Fuel Cost per Unit"
      varpath="fuel_cost_per_funit.value"
      color={props.color}
    />
    <Row
      label="Fuel Emissions Factor"
      varpath="fuel_emissions_factor.value"
      color={props.color}
    />
    <Row
      label="Total Energy Used per Unit"
      varpath="annual_energy_used.value"
      color={props.color}
    />

    <StyledSpacer />


    <h3>NOT IMPLEMENTED</h3>
    <Row
      label="Type of GHG Emitted"
      varpath=""
      dataType="select"
      helper={false}
      color={props.color}
      options={[
      ]} />

    <Row
      label="Type of Fuel Consumed"
      varpath=""
      dataType="select"
      helper={false}
      color={props.color}
      options={{
        "Source 1": "Source 1"
      }} />

  </GridItem>
);

export default EmissionForm;
