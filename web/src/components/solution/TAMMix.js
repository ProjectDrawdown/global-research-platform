import { Heading, Text, Grid, GridItem } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { humanize } from "util/component-utilities"
import {
  useObjectPathSelector,
} from "redux/selectors.js"
import { Card, CardBody } from "components/Card"
import {
  SolutionCardsStack,
} from "components/solution"
import { Row } from "components/solution/row"
import {
  BoundBooleanSwitch,
} from "components/forms/form-elements.js"


const StyledHeaderGridItem = styled(GridItem)`
  color: black;
  font-size: 14px;
  line-height: 21px;
`;

const BoldText = styled(Text)`
  font-weight: bold;
`

const TamContainer = styled.div`
  margin-right: 1rem;
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
        <BoldText>In Solution?</BoldText>
      </StyledHeaderGridItem>
      <StyledHeaderGridItem colSpan={3}>
        <BoldText>In Conventional?</BoldText>
      </StyledHeaderGridItem>
    </Grid>
  )
}

const TamMixContent = ({title, data}) => {
  return (
    <Grid
      mt={3}
      mb={3}
      gap={4}
      templateColumns="repeat(12, 1fr)">
      <StyledHeaderGridItem colSpan={3}>
        <BoldText>{humanize(title)}</BoldText>
      </StyledHeaderGridItem>
      <StyledHeaderGridItem colSpan={3}>
        {data['adoption']} %
      </StyledHeaderGridItem>
      {/* TODO: bind data switching here */}
      <StyledHeaderGridItem colSpan={3}>
        <BoundBooleanSwitch />
      </StyledHeaderGridItem>
      <StyledHeaderGridItem colSpan={3}>
        <BoundBooleanSwitch />
      </StyledHeaderGridItem>
    </Grid>
  )
}

const TamMix = () => {
  const params = useParams();
  const activeTechnology = params.technologyId;
  // TODO: change this to grab from scenario object
  const sourceObj = useObjectPathSelector(
    `workbook.techData.technologies.${activeTechnology}.tam_mix`,
    {}
  );

  const mixes = Object.keys(sourceObj)

  return (
    <>
      <Heading size="lg" mb="0.75rem">TAM Mix</Heading>
      <SolutionCardsStack stack="sm" mb="0.75rem">
        <Card size="max" h="100%">
          <CardBody>
            <Grid minW="100%">
              <GridItem px={3}>
                <TamMixHeader />
                {
                  mixes.map((item, index) => 
                    <TamMixContent
                      key={`tam_mix_${index}`} 
                      title={item}
                      data={sourceObj[item]}
                    />)
                }
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      </SolutionCardsStack>
    </>
  )
}

const TamResult = () => {
  const params = useParams();
  const activeTechnology = params.technologyId;
  // TODO: change this to grab from scenario object
  const sourceObj = useObjectPathSelector(
    `workbook.techData.technologies.${activeTechnology}.assumption`,
    {}
  );

  const assumptions = Object.keys(sourceObj)

  return (
    <>
      <Heading size="lg" mb="0.75rem">Assumptions</Heading>
      <SolutionCardsStack stack="sm" mb="0.75rem">
        {/* TODO: TAM MIX */}
        <Card size="max" h="100%">
          <CardBody>
          <Grid minW="100%">
           {
              assumptions.map((item, index) => 
              
                <Row
                   key={`assumptions_${index}`}
                  label={humanize(item)}
                  // todo: fix this mapping
                  varpath="emissions_per_funit.value"
                  dataType="numeric"/>
              )
            }
            </Grid>
          </CardBody>
        </Card>
        <SolutionCardsStack stack="sm" mb="0.75rem">
          <span>{' '}</span>
        </SolutionCardsStack>
      </SolutionCardsStack>
    </>
  )
}

const TamMixSection = () => {
  return (
    <TamContainer>
      <TamMix />
      <TamResult />
    </TamContainer>
  )
}

export default TamMixSection