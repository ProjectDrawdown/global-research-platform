import React from "react"
import { Box, Heading, Center, HStack, Grid, GridItem, Button, Text } from "@chakra-ui/react"
import { Link as DomLink, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { format, parseISO } from 'date-fns'
import { RunButton } from "theme/icons"
import Logo from "components/Logo.js"
import Menu from "components/Menu.js"
import { prettyFormatBigNumber } from "util/number-utils.js"
import {
  useWorkbookIDSelector,
  useWorkbookHasAuthorSelector
} from "redux/selectors.js"

export const StyledRunWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 20px;
  height: 200px;
  width: auto;
  margin-left: auto;
`;

const SmallText = styled.small`
  font-size: 50%;
`

const calculateMmtReduced = (workbookState) => {
  let value = 0
  for (const [_, data] of Object.entries(workbookState.summaryData)) {
    if (data && data.co2_mmt_reduced) {
      value += data.co2_mmt_reduced['World'].reduce((acc, item) => acc + item.value, 0)
    }
  }

  return prettyFormatBigNumber(value, 3, ['Mt', 'Gt']);
};

export default function PortfolioHeader({ technologyId }) {
  const workbookState = useSelector(state => state.workbook);
  const params = useParams();
  // Disable  calculate when in portfolio, since we don't have techID
  // const calculate = () => {
  //   store.dispatch(calculateThunk(workbookState.workbook.id, 0, technologyId));
  // };

  const workbookID = useWorkbookIDSelector();
  const workbookHasAuthor = useWorkbookHasAuthorSelector();
  const showCopyButton = !workbookHasAuthor;

  return (
    <Box
      top={0}
      zIndex={500}
      fontSize="md"
      whiteSpace="nowrap"
    >
      <Grid bg="white" templateColumns="repeat(6, 1fr)" gap={1} w="100%" margin={0} p={2}>
        <GridItem colSpan={1} textAlign="center" mr="2rem" mt="0.25rem">
        <Logo />
        </GridItem>
        <GridItem colSpan={5} textAlign="left" mr="2rem" mt="0.25rem">
          <HStack>
            <Heading
              lineHeight="40px"
              fontSize="1.5rem"
              as={DomLink}
              to={`/workbook/${params.id}`}
            >
              {(workbookState &&
                workbookState.workbook &&
                workbookState.workbook.name) ||
               "\u00A0"}
            </Heading>
            <Menu />
            { showCopyButton &&
              <Button
                as={DomLink}
                to={`/workbook/${workbookID}/clone`}
                colorScheme="brand.blue"
                size="xs"
              >
                Copy &amp; Edit
              </Button>
            }
          </HStack>
        </GridItem>
        {/* TODO: investirage for websocket */}
        {/* {technologyId && ( !workbookState?.workbook?.loading || workbookState?.workbook?.error ) ? ( */}
        { workbookState.summaryData ? (
          <StyledRunWrapper>
            <> 
              <RunButton /> 
            </>
            <Center
              position="absolute" 
              left="0" 
              right="0"
              top="0"
              bottom="0"
              fontSize="1.5rem"
              fontWeight="bold"
              textAlign="center"
            > 
              <Text flex="1 1 160px">{calculateMmtReduced(workbookState)} <br /><SmallText>CO2 Reduced</SmallText></Text>
            </Center>
          </StyledRunWrapper>
        ) : null}
      </Grid>
      <Grid
        templateColumns="repeat(12, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap={2}
        w="100%"
        margin={0}
        px={8}
        my="10px"
        h="128px"
        bg="#00416F"
        alignItems="center"
        boxShadow="2px 4px 4px rgba(0, 0, 0, 0.25)">
        <GridItem h="100%" colSpan="4" rowSpan="3" colEnd="4" pt={8}>
          <Heading
            isTruncated
            lineHeight="90px"
            size="2xl"
            fontFamily="Bebas Neue"
            letterSpacing="0.02em"
            color="white">
            {'WORKBOOK OVERVIEW'}
          </Heading>
        </GridItem>
        {workbookState.workbook?.author && (
          <>
            <GridItem colSpan="1" colStart="4" rowStart="2">
              <Heading
                lineHeight="27px"
                fontSize="18px"
                fontFamily="Bebas Neue"
                letterSpacing="0.02em"
                textAlign="right"
                color="white">
                {'AUTHOR'}
              </Heading>
              {workbookState.workbook?.created_at && (
                <Heading
                  lineHeight="27px"
                  fontSize="18px"
                  fontFamily="Bebas Neue"
                  letterSpacing="0.02em"
                  textAlign="right"
                  color="white">
                  {'CREATED'}
                </Heading>
              )}
            </GridItem>
            <GridItem colSpan="1" colStart="5" rowStart="2">
              <Text
                lineHeight="27px"
                fontSize="16px"
                color="white">
                {workbookState.workbook.author.email}
              </Text>
              {workbookState.workbook?.created_at && (
                <Text
                  lineHeight="27px"
                  fontSize="16px"
                  color="white">
                  {format(parseISO(workbookState.workbook.created_at), 'dd MMMM yyyy')}
                </Text>
              )}
            </GridItem>
          </>
        )}
        {workbookState.workbook?.description && (
          <>
            <GridItem h="100%" colStart="6" rowStart="2">
              <Heading
                lineHeight="27px"
                fontSize="18px"
                fontFamily="Bebas Neue"
                letterSpacing="0.02em"
                textAlign="right"
                color="white">
                {'ABOUT'}
              </Heading>
            </GridItem>
            <GridItem h="100%" colStart="7" colSpan="4" rowStart="2" rowSpan="2">
              <Text
                lineHeight="27px"
                fontSize="16px"
                whiteSpace="normal"
                noOfLines={2}
                color="white">
                {workbookState.workbook.description}
              </Text>
            </GridItem>
          </>
        )}
      </Grid>
    </Box>
  );
}