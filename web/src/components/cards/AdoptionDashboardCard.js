import React from "react";
import { useParams } from "react-router-dom";
import { useArrayVarpathSelector } from "redux/selectors.js";
import {
  VStack,
  Flex,
  Box,
  Heading
} from "@chakra-ui/react";
import IfIn from "components/IfIn.js";
import DrawerLinkCard from "components/cards/DrawerLinkCard.js";
import AdoptionChart from "components/charts/AdoptionChart";
import { BoundSelect, BoundSourceSelect } from "components/forms/form-elements.js";
import { UploadResource } from "components/tools/upload"

// FIXME DRY this up beteween Adoption forms. 
export const LINEAR = "Linear";
export const EXISTING = "Existing Adoption Prognostications";
export const CUSTOMIZED = "Fully Customized PDS";
export const BASS = "Bass Diffusion S-Curve";
export const LOGISTIC = "Logistic S-Curve";
export const CUSTOM_SCURVE = "Customized S-Curve Adoption";
export const NONE = "None";
export const DEFAULT = "Default";
export const CUSTOM = "Custom";

/**
 * Render the Adoption chart and quick form for the Technology Dashboard pane.
 */
function AdoptionDashboardCard({ drawer, color, techData }) {
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
    <DrawerLinkCard
      size="md"
      path="adoption"
      drawer={drawer}
      title="Adoption (global)"
      color={color}
    >
      <VStack>
        <AdoptionChart techData={techData} />
        <Flex>
          <IfIn set={[EXISTING]} value={workbookPDSAdoptionBasis}>
            <Box p="4" flex="1">
              <Heading as="h5" pb="1" size="xs">
                Scenario Growth
              </Heading>
              <BoundSelect
                varpath="adoption_prognostication_growth"
                options={{
                  Low: "Low",
                  Medium: "Medium",
                  High: "High"
                }}
                size="sm"
              />
            </Box>
          </IfIn>
          {/* Growth can be a percent when linear is chosen as well */}
          <IfIn set={[LINEAR]} value={workbookPDSAdoptionBasis}>
            <Box p="4" flex="1">
              <Heading as="h5" pb="1" size="xs">
                Scenario Growth
              </Heading>
              <BoundSourceSelect
                varpath="adoption_prognostication_growth"
                dataType="percent"
                size="sm"
              />
            </Box>
          </IfIn>
          <IfIn set={[EXISTING]} value={workbookPDSAdoptionBasis}>
            <Box p="4" flex="1">
              <Heading as="h5" pb="1" size="xs">
                Scenario Trend
              </Heading>
              <BoundSelect
                varpath="adoption_prognostication_trend"
                dataType="select"
                options={{
                  Linear: "Linear",
                  "2nd Poly": "2nd Poly",
                  "3rd Poly": "3rd Poly",
                  Exp: "Exp"
                }}
                size="sm"
              />
            </Box>
            <Box p="4" flex="1">
              <Heading as="h5" pb="1" size="xs">
                Scenario Source
              </Heading>
              <BoundSourceSelect
                varpath="adoption_prognostication_source"
                InputWidget={BoundSourceSelect}
                sourceListObjectpath="workbook.adoption_data"
                additionalOptions={[]}
                size="sm"
              />
            </Box>
          </IfIn>
          <IfIn set={[CUSTOMIZED]} value={workbookPDSAdoptionBasis}>
            <Box p="4" flex="1">
              <Heading as="h5" pb="1" size="xs">
                Scenario Custom Dataset
              </Heading>
              <BoundSourceSelect
                varpath="adoption_custom_name"
                dataType="input"
                disabled={true}
              />
            </Box>
          </IfIn>
          <Box p="2" pt="8">
            <UploadResource
              name="adoption_data"
            />
          </Box>
        </Flex>
      </VStack>
    </DrawerLinkCard>
  );
}

export default AdoptionDashboardCard;
