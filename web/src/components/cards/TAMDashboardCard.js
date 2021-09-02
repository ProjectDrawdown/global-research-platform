import React from "react"
import {
  VStack,
  Flex,
  Box,
  Heading
} from "@chakra-ui/react"
import DrawerLinkCard from "components/cards/DrawerLinkCard.js"
import TAMChart from "components/charts/TAMChart"
import { BoundSourceSelect } from "components/forms/form-elements.js"
import { UploadResource } from "components/tools/upload"

/**
 * Render the TAM chart and quick form for the Technology Dashboard pane.
 */
function TAMDashboardCard({ drawer, color, techData }) {
  return (
    <DrawerLinkCard
      size="md"
      path="tam"
      drawer={drawer}
      title="Total Addressable Market (global)"
      color={color}
    >
      <VStack>
        <TAMChart techData={techData} />
        <Flex>
          <Box p="4">
            <Heading as="h5" pb="1" size="xs">
              Scenario Source
            </Heading>
            <BoundSourceSelect
              varType="categories"
              varpath="source_until_start_year"
              varpathSecondary="pds_tam_custom_source"
              sourceListObjectpath="workbook.techData.metadata.tam_ref_data_sources"
              secondarySourceListObjectpath="workbook.tam_scenarios"
              additionalOptions={["ALL SOURCES"]}
              size="sm"
            />
          </Box>
          <Box p="4">
            <Heading as="h5" pb="1" size="xs">
              Reference Source
            </Heading>
            <BoundSourceSelect
              varType="categories"
              varpath="tam_source_post_start_year"
              varpathSecondary="ref_tam_custom_source"
              target="reference"
              sourceListObjectpath="workbook.techData.metadata.tam_ref_data_sources"
              secondarySourceListObjectpath="workbook.tam_scenarios"
              additionalOptions={["ALL SOURCES"]}
              size="sm"
            />
          </Box>
          <Box p="2" pt="4">
            <UploadResource
              entity="tam_pds"
              name="custom Total Addressable Market (TAM) data"
            />
          </Box>
        </Flex>
      </VStack>
    </DrawerLinkCard>
  );
}

export default TAMDashboardCard;
