import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  GridItem,
} from "@chakra-ui/react";
import AdoptionChart from "components/charts/AdoptionChart.js";
import {
  BoundNumericRegionInputs,
  BoundSourceSelect
} from "components/forms/form-elements.js";
import { Row } from "./row";
import IfIn from "components/IfIn.js";
import {
  useArrayVarpathSelector
} from "redux/selectors.js";
import {
  StyledSpacer,
  ACHeader
} from "./AdvancedControlls"
import { StyledParagraph } from "components/tools/QuestionBox"

const LINEAR = "Linear";
const EXISTING = "Existing Adoption Prognostications";
const CUSTOMIZED = "Fully Customized PDS";
const BASS = "Bass Diffusion S-Curve";
const LOGISTIC = "Logistic S-Curve";
const CUSTOM_SCURVE = "Customized S-Curve Adoption";
const NONE = "None";
const DEFAULT = "Default";
const CUSTOM = "Custom";

const PDS_BASIS_OPTIONS = {
  // Linear: {
  //   "name": "Linear",
  //   "details": "Linear projection from base year amount"
  // },
  "Existing Adoption Prognostications": {
    "name": "Existing Adoption Prognostications",
    "details": "Interpolated curve fitting with 1 or more data set inputs (high/med/low ~ +sd/fit/-sd)"
  },
  "Fully Customized PDS": {
    "name": "Fully Customized PDS",
    "details": "Prognostication analysis using raw / direct adoption values for each year/region instead of existing research"
  },
  // "Bass Diffusion S-Curve": {
  //   "name": "Bass Diffusion S-Curve",
  //   "details": "Sigmoid function using Bass Diffusion curve interpolating between a start and end point.",
  // },
  // "Logistic S-Curve": {
  //   "name": "Logistic S-Curve",
  //   "details": "Sigmoid function using Logistic curve for interpolating between a start and end point."
  // },
  // "Customized S-Curve Adoption": {
  //   "name": "Customized S-Curve Adoption",
  //   "details": "Sigmoid function using Logistic curve for interpolating between a start and end point."
  // },
  None: "None"
}

/**
 * Adoption Header is shown at the top of the slide-out drawer that is revealed when clicking the "expand" icon on the Adoption (Global) card.
 */
export const AdoptionHeader = () => (
  <span>Solution Adoption (advanced)</span>
);

/**
 * This is the prototype of the tooltip for Base Adoption
 */
const BaseAdoptionTooltip = () => (
  <>
    <StyledParagraph><strong>Hello World</strong></StyledParagraph>
  </>
)

/**
 * The Adoption Form is the content of the drawer that is revealed when clicking the "expand" icon on the Adoption (Global) card. The `techData` data property is required which contains the adoption data retrieved from the API server.
 *
 * This form contains a variety of controls for adjusting input values concerning adoption rates for the Drawdown model. Adjusting any input value here should save the values on the server. Note that this does not re-compute the model until the user clicks the "compute" circle.
 *
 * TODO: explain useParams()
 */
const AdoptionForm = (props) => {
  const params = useParams();
  const activeTechnology = params.technologyId;
  const scenarioBasisVarpath = `technologies.${activeTechnology}.adoption_basis`;
  const workbookPDSAdoptionBasis = useArrayVarpathSelector([
    "technologies",
    activeTechnology,
    "adoption_basis"
  ]);
  const workbookRefAdoptionBasis = useArrayVarpathSelector(
    ["technologies", activeTechnology, "adoption_basis"],
    "reference"
  );

  return (
    <GridItem px={3}>

      <Box w="100%">
        <AdoptionChart techData={props.techData} />
      </Box>
      
      <Row
        label="PDS Basis"
        varpath="adoption_basis"
        dataType="select"
        color={props.color}
        helper={false}
        options={PDS_BASIS_OPTIONS}
        inputTooltipEnabled={true}
      />

      <ACHeader />
      
      <IfIn set={[]} value={workbookPDSAdoptionBasis}>
        <Row
          label="Base Adoption"
          TooltipWidget={BaseAdoptionTooltip}
          varpath="adoption_base"
          color={props.color}
          InputWidget={BoundNumericRegionInputs} />
      </IfIn>

      <IfIn
        set={[BASS, LOGISTIC, CUSTOM_SCURVE]}
        value={workbookPDSAdoptionBasis}>
        <Row
          label="Final Percentage"
          varpath="adoption_final_percentage"
          color={props.color}
          InputWidget={BoundNumericRegionInputs} />
      </IfIn>

      <IfIn set={[EXISTING]} value={workbookPDSAdoptionBasis}>
        <Row
          label="Growth"
          varpath="adoption_prognostication_growth"
          color={props.color}
          dataType="select"
          options={{
            Low: "Low",
            Medium: "Medium",
            High: "High"
          }} />
      </IfIn>

      <IfIn set={[LINEAR]} value={workbookPDSAdoptionBasis}>
        <Row
          label="Growth"
          varpath="adoption_prognostication_growth"
          color={props.color}
          dataType="percent" />
      </IfIn>

      <IfIn set={[EXISTING]} value={workbookPDSAdoptionBasis}>
        <Row
          label="Trend"
          varpath="adoption_prognostication_trend"
          color={props.color}
          dataType="select"
          options={{
            Linear: "Linear",
            "2nd Poly": "2nd Poly",
            "3rd Poly": "3rd Poly",
            Exp: "Exp"
          }} />
        <Row
          label="Source"
          varpath="adoption_prognostication_source"
          InputWidget={BoundSourceSelect}
          sourceListObjectpath="workbook.techData.metadata.ad_data_sources"
          color={props.color}
          additionalOptions={[]} />
      </IfIn>

      <IfIn set={[CUSTOMIZED]} value={workbookPDSAdoptionBasis}>
        <Row
          label="Custom Dataset Name"
          varpath="adoption_custom_name"
          color={props.color}
          dataType="input"
          disabled={true} />
      </IfIn>

      <IfIn set={[]} value={workbookPDSAdoptionBasis}>
        <Row
          label="Regional Data"
          varpath="adoption_regional_data"
          color={props.color}
          dataType="textarea"
          InputWidget={BoundNumericRegionInputs} />
      </IfIn>

      <Row
        label="Use Reference Year Data"
        varpath="adoption_use_ref_years"
        color={props.color}
        dataType="boolean" />

      <StyledSpacer />

      <Row
        label="Adoption Basis"
        varpath="soln_ref_adoption_basis"
        color={props.color}
        dataType="select"
        options={{
          Default: "Default",
          Custom: "Custom"
        }} />

      <IfIn set={[DEFAULT]} value={workbookRefAdoptionBasis}>
        <Row
          label={`Base Adoption`}
          TooltipWidget={BaseAdoptionTooltip}
          varpath={`adoption_base`}
          color={props.color}
          target="reference"
          InputWidget={BoundNumericRegionInputs} />
      </IfIn>

      {/*<IfIn
        set={[DEFAULT]}
        value={workbookRefAdoptionBasis}>
        {regions.map((region) => (
          <Row
            label={`Base Adoption: ${region}`}
            varpath={`adoption_base.${region}`}
            target="reference" />
        ))}
      </IfIn>*/}

      <IfIn set={[CUSTOM]} value={workbookRefAdoptionBasis}>
        <Row
          label="Custom Dataset Name"
          varpath="adoption_custom_name"
          target="reference"
          dataType="input" />
      </IfIn>

      <IfIn set={[]} value={workbookRefAdoptionBasis}>
        <Row
          label="Regional Data"
          varpath="adoption_regional_data"
          target="reference"
          dataType="textarea" />
      </IfIn>

    </GridItem>
  );
};

export default AdoptionForm;
