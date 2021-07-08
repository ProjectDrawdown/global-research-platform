import React from "react"
import { Box, Heading, Spacer, HStack, Grid, GridItem, Button, Text } from "@chakra-ui/react"
import { Link as DomLink, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { RunButton } from "../../theme/icons"
import store from "../../redux/store"
import { calculateThunk } from "../../redux/reducers/workbook/workbookSlice"
import Logo from "../../components/Logo.js"
import Menu from "../../components/Menu.js"
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
  cursor: pointer;
  margin-left: auto;
`;


export default function PortfolioHeader({ technologyId }) {
  const workbookState = useSelector(state => state.workbook);
  const params = useParams();
  const calculate = () => {
    store.dispatch(calculateThunk(workbookState.workbook.id, 0, technologyId));
  };

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
        {technologyId && ( !workbookState?.workbook?.loading || workbookState?.workbook?.error ) ? (
          <StyledRunWrapper onClick={calculate}>
            <RunButton />
          </StyledRunWrapper>
        ) : null}
      </Grid>
      <Grid
        templateColumns="repeat(12, 1fr)"
        gap={2}
        w="100%"
        margin={0}
        px={8}
        pt={8}
        my="10px"
        h="128px"
        bg="#00416F"
        alignItems="center"
        boxShadow="2px 4px 4px rgba(0, 0, 0, 0.25)">
        <GridItem h="100%" colSpan="4">
          <Heading
            lineHeight="90px"
            fontSize="64px"
            fontFamily="Bebas Neue"
            letterSpacing="0.02em"
            color="white">
            {'WORKBOOK OVERVIEW'}
          </Heading>
        </GridItem>
        <Spacer />
        {workbookState.workbook?.author && (
          <>
            <GridItem h="100%" pt="18px" colSpan="1">
              <Heading
                lineHeight="27px"
                fontSize="18px"
                fontFamily="Bebas Neue"
                letterSpacing="0.02em"
                textAlign="right"
                color="white">
                {'AUTHOR'}
              </Heading>
              {workbookState.workbook?.created && (
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
            <GridItem h="100%" pt="18px" colSpan="1">
              <Text
                lineHeight="27px"
                fontSize="16px"
                color="white">
                {workbookState.workbook.author.email}
              </Text>
              {workbookState.workbook?.created && (
                <Text
                  lineHeight="27px"
                  fontSize="16px"
                  color="white">
                  {workbookState.workbook.created}
                </Text>
              )}
            </GridItem>
          </>
        )}
        {workbookState.workbook?.description && (
          <>
            <GridItem h="100%" pt="18px" colSpan="1">
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
            <GridItem h="100%" pt="18px" colSpan="3">
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
