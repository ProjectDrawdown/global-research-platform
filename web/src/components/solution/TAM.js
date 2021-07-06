import React, { forwardRef } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  GridItem,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { Row } from "./row";
import TAMChart from "components/charts/TAMChart.js";
import IfIn from "components/IfIn.js";
import { BoundSourceSelect } from "components/forms/form-elements.js";

import {
  StyledSpacer,
  ACHeader
} from "./AdvancedControlls";

export const TAMHeader = () => (
  <span>Total Addressible Market (start adoption)</span>
);

const TAMForm = (props) => {
  const params = useParams();
  const activeTechnology = params.technologyId;
  const scenarioBasisVarpath = `technologies.${activeTechnology}.adoption_basis`;

  return (
    <GridItem px={3}>

      <Box w="100%">
        <TAMChart techData={props.techData} />
      </Box>

      <ACHeader />

      <Row
        varType="categories"
        varpath="source_until_start_year"
        label="Source Until Current Year"
        dataType="select"
        color={props.color}
        InputWidget={BoundSourceSelect}
        sourceListObjectpath="workbook.techData.metadata.tam_ref_data_sources"
        additionalOptions={["ALL SOURCES"]} />

      <Row
        varType="categories"
        varpath="tam_source_post_start_year"
        target="reference"
        color={props.color}
        label="Source After Start Year"
        InputWidget={BoundSourceSelect}
        sourceListObjectpath="workbook.techData.metadata.tam_ref_data_sources"
        additionalOptions={["ALL SOURCES"]} />

      <StyledSpacer />

      {/* <Row */}
      {/*   varType="categories" */}
      {/*   varpath="tam_source_post_current_year" */}
      {/*   label="tam_source_post_current_year" /> */}
      {/* <Row */}
      {/*   varType="categories" */}
      {/*   varpath="tam_source_post_current_year" */}
      {/*   label="tam_source_post_current_year" /> */}
      {/* <Row */}
      {/*   varType="categories" */}
      {/*   varpath="tam_source_after_current_year" */}
      {/*   label="tam_source_after_current_year" /> */}
      {/* <Row */}
      {/*   varType="categories" */}
      {/*   varpath="tam_trend" */}
      {/*   label="tam_trend" /> */}
      {/* <Row */}
      {/*   varType="categories" */}
      {/*   varpath="tam_growth" */}
      {/*   label="tam_growth" /> */}
      {/* <Row */}
      {/*   varType="categories" */}
      {/*   varpath="tam_low_sd_mult" */}
      {/*   label="tam_low_sd_mult" /> */}
      {/* <Row */}
      {/*   varType="categories" */}
      {/*   varpath="tam_high_sd_mult" */}
      {/*   label="tam_high_sd_mult" /> */}

    </GridItem>
  );
};

export default TAMForm;
