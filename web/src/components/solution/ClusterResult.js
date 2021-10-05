import styled from "styled-components"
import { Heading, Grid, GridItem, Text, Center } from "@chakra-ui/react"
import { Card, CardBody } from "components/Card"
import {
  SolutionCardsStack,
} from "components/solution"

const BoldText = styled(Text)`
  font-weight: bold;
`

const ResultHeader = () => {
  return (
    <Grid
      w="100%"
      mt={3}
      mb={3}
      gap={4}
      templateColumns="repeat(12, 1fr)">
        <GridItem colSpan={3}>
          {' '}
        </GridItem>
        <GridItem colSpan={3}>
          {' '}
        </GridItem>
        <GridItem colSpan={3}>
          <GridItem borderBottom="1px" borderColor="gray.200">
            <Text>2020-2050</Text>
          </GridItem>
        </GridItem>
        <GridItem colSpan={3}>
          <GridItem borderBottom="1px" borderColor="gray.200">
            <Text>2015-2060</Text>
          </GridItem>
        </GridItem>
    </Grid>
  )
}

const ResultContainerWrapper = ({ children }) => {
  return (
    <GridItem colSpan={3}>
      <Grid
        gap={2}
        templateRows="repeat(2, 1fr)">
          {children}
      </Grid>
    </GridItem>
  )
}

const ResultContainer = ({ type }) => {
  return (
    <Grid
      w="100%"
      mt={3}
      mb={3}
      gap={4}
      templateColumns="repeat(12, 1fr)"
      templateRows="repeat(2, 1fr)">
      <ResultContainerWrapper>
        <GridItem rowStart={1}>
          <Center>
            <BoldText>{type}</BoldText>
          </Center>
        </GridItem>
      </ResultContainerWrapper>
      <ResultContainerWrapper>
        <>
          <GridItem>
            <Text>SOLUTION</Text>
          </GridItem>
          <GridItem>
            <Text>CONVENTIONAL</Text>
          </GridItem>
        </>
      </ResultContainerWrapper>
      <ResultContainerWrapper>
        <>
          <GridItem>
            <Text>-</Text>
          </GridItem>
          <GridItem>
            <Text>31.34</Text>
          </GridItem>
        </>
      </ResultContainerWrapper>
      <ResultContainerWrapper>
        <>
          <GridItem>
            <Text>-</Text>
          </GridItem>
          <GridItem>
            <Text>31.34</Text>
          </GridItem>
        </>
      </ResultContainerWrapper>
    </Grid>
  )
}

const ClusterResult = () => {
  return (
    <>
      <Heading size="lg">Result</Heading>
      <SolutionCardsStack stack="sm" mb="0.75rem">
        <Card size="max">
          <CardBody>
            <Grid minW="100%">
              <GridItem>
                <ResultHeader />
                {/* TODO: this will be lopped */}
                <ResultContainer
                  type="LLDC"
                />

                <ResultContainer
                  type="MDC"
                />

                <ResultContainer
                  type="Total"
                />
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      </SolutionCardsStack>
    </>
  )
}

export default ClusterResult