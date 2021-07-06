import React from "react"
import { GridItem } from "@chakra-ui/react"
import PropTypes from "prop-types"
import { Row } from "./row"
import {
  StyledSpacer,
  ACHeader
} from "./AdvancedControlls"
import { StyledParagraph } from "components/tools/QuestionBox"

/**
 * Simple Header for Finance Tab
 */
export const FinanceHeader = () => (
  <span>Solution Finances (advanced)</span>
)

const FirstCostToolTip = () => (
  <>
    <StyledParagraph><strong>First Cost per Implementation Unit</strong></StyledParagraph>
    <StyledParagraph>
      This is the cost of acquisition and the cost of installation (sometimes one and the same) or the cost of initiating a program/practice 
      (for solutions where there is no direct artifact to acquire and install) per Implementation unit of the SOLUTION.
    </StyledParagraph>
    <StyledParagraph>
      E.g. What is the cost to acquire and install rooftop solar PV?
    </StyledParagraph>
  </>
)

/**
 * Represent all of the form inputs in the Finance Advance Controls.
 */
const FinanceForm = ({
  color
}) => (
  <GridItem px={3}>

    <ACHeader
      comparisonColumn={true}
    />
    
    <Row
      label="First Cost / kW (US$2014)"
      TooltipWidget={FirstCostToolTip}
      varpath="start_year_cost.value"
      dataType="numeric"
      leftAddon="$"
      color={color}
      conventionalpath="data.technologies.fossilfuelelectricity.fixed_oper_cost_per_iunit.value" />

    <Row
      label="First Cost Learning Rate"
      varpath="first_cost_efficiency_rate"
      dataType="percent"
      rightAddon="%"
      color={color}
      conventionalpath="data.technologies.fossilfuelelectricity.first_cost_efficiency_rate" />

    <StyledSpacer />

    <Row
      label="Fixed Operating Cost / kW / Annum"
      varpath="fixed_oper_cost_per_iunit.value"
      dataType="numeric"
      leftAddon="$"
      color={color}
      conventionalpath="data.technologies.fossilfuelelectricity.fixed_oper_cost_per_iunit.value" />

    <Row
      label="Variable Operating Cost (VOM) / kWh"
      varpath="var_oper_cost_per_funit.value"
      dataType="numeric"
      leftAddon="$"
      color={color}
      conventionalpath="data.technologies.fossilfuelelectricity.var_oper_cost_per_funit.value" />

    <StyledSpacer />

    <Row
      label="Fuel Cost Per kWh"
      varpath="fuel_cost_per_funit"
      dataType="numeric"
      conventional="12.34"
      leftAddon="$"
      color={color}
      conventionalpath="data.technologies.fossilfuelelectricity.fuel_cost_per_funit" />

    <Row
      label="Type of Fuel Consumed"
      varpath="???"
      dataType="select"
      helper={false}
      color={color}
      options={{
        "Source 1": "Source 1"
      }} />

    <StyledSpacer />

    <Row
      label="NPV Discount Rate"
      varpath="npv_discount_rate"
      dataType="percent"
      rightAddon="%"
      color={color} />

    <StyledSpacer />

    <Row
      label="Average Annual Use"
      varpath="avg_annual_use.value"
      dataType="numeric"
      rightAddon="h"
      color={color}
      conventionalpath="data.technologies.fossilfuelelectricity.avg_annual_use.value" />

    <Row
      label="Lifetime Capacity"
      varpath="lifetime_capacity.value"
      dataType="numeric"
      rightAddon="h"
      color={color}
      conventionalpath="data.technologies.fossilfuelelectricity.lifetime_capacity.value" />

  </GridItem>
)

FinanceForm.propTypes = {
  /**
   * color theme for form
   */
  color: PropTypes.string
}

export default FinanceForm
