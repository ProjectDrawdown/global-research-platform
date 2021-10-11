import styled from "styled-components"
import { useHistory } from "react-router-dom";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Grid, GridItem, Text, Center } from "@chakra-ui/react"
import { 
  Card,
  CardBody,
  CardTitle,
  CardHeader
 } from "components/Card"

const BoldText = styled(Text)`
  font-weight: bold;
`

const ResultHeader = () => {
  return (
    <Grid
      w="100%"
      mt={3}
      mb={3}
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
    <GridItem 
      colSpan={3}>
      <Grid
        templateRows="repeat(2, 1fr)">
          {children}
      </Grid>
    </GridItem>
  )
}

const ResultDataContainer = ({
  color = null,
  text
}) => {
  return(
    <GridItem
      bgColor={color ? color: ""}>
      <Text
        pt={2}
        pb={2}
        pl={1}
      >{text}</Text>
    </GridItem>
  )
}

const ResultContainer = ({ type, color }) => {
  const primaryColor = `brand.${color}.100`
  const secondaryColor = `brand.${color}.600`

  return (
    <Grid
      w="100%"
      mt={3}
      mb={3}
      templateColumns="repeat(12, 1fr)">
      <ResultContainerWrapper>
        <GridItem rowStart={1}>
          <Center>
            <BoldText
              pt={2}
              pb={2}
            >
              {type}
            </BoldText>
          </Center>
        </GridItem>
      </ResultContainerWrapper>
      <ResultContainerWrapper>
        <>
          <ResultDataContainer
            text="SOLUTION"
          />
          <ResultDataContainer
            text="CONVENTIONAL"
          />
        </>
      </ResultContainerWrapper>
      <ResultContainerWrapper>
        <>
          <ResultDataContainer
            color={primaryColor}
            text="-"
          />
          <ResultDataContainer
            color={secondaryColor}
            text="31.34"
          />
        </>
      </ResultContainerWrapper>
      <ResultContainerWrapper>
        <>
          <ResultDataContainer
            color={primaryColor}
            text="-"
          />
          <ResultDataContainer
            color={secondaryColor}
            text="31.34"
          />
        </>
      </ResultContainerWrapper>
    </Grid>
  )
}

const ClusterResult = ({
  color
}) => {
  const history = useHistory();
  
  return (
    <Card size="lg">
      <CardHeader color={color}>
        <CardTitle
          icon={faQuestionCircle}
          onClick={() => history.push({ hash: "#modal/test" })
          }>
            Result
          </CardTitle>
      </CardHeader>
      <CardBody>
        <Grid minW="100%">
          <GridItem>
            <ResultHeader />
            {/* TODO: this will be lopped */}
            <ResultContainer
              type="LLDC"
              color={color}
            />

            <ResultContainer
              type="MDC"
              color={color}
            />

            <ResultContainer
              type="Total"
              color={color}
            />
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  )
}

export default ClusterResult