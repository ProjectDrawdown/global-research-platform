import React, { useEffect, useState } from "react";
import { Box, Heading, HStack, Grid, GridItem, Center, Button, Text } from "@chakra-ui/react";
import { Link as DomLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RunButton, PlayButton, LoadButton } from "theme/icons";
import styled, { css, keyframes } from "styled-components";
import store from "redux/store";
import { calculateThunk } from "redux/reducers/workbook/workbookSlice";
import {
  useWorkbookIDSelector,
  useWorkbookHasAuthorSelector
} from "redux/selectors.js";
import { prettyFormatBigNumber } from "util/number-utils.js";
import Logo from "components/Logo.js";
import { errorAdded } from "redux/reducers/util/errorSlice";
import {InputWithAddons} from "../../Input";


/**
 * keyframe DOM
 */
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

/**
 * Wrapper DOM
 */
const StyledRunWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 0;
  height: 164px;
  width: auto;
  cursor: pointer;
`;

/**
 * Button with Loading animation
 */
const StyledButton = styled.div`
  animation: ${props => (props.loading ? css`${rotate} 2s linear infinite` : 'none')};
`

/**
 * Renders the Header of an opened workbook.
 * Additional Header feature:
 * * A floating button to use for Workbook recalculation.
 * * A Toast for when a feature notebook is opened
 * 
 * @param {*} param0 
 * @returns components
 */
export default function WorkbookHeader({ logoWidth = 105, technologyId }) {
  const workbookState = useSelector(state => state.workbook);
  const params = useParams();
  const [calculated, setCalculated] = useState(true);
  
  const calculate = () => {
    store.dispatch(calculateThunk(workbookState.workbook.id, 0, technologyId));
  };

  const calculateMmtReduced = () => {
    const value = workbookState.techData.data.co2_mmt_reduced['World'].reduce((acc, item) => acc + item.value, 0);
    return prettyFormatBigNumber(value, 3, ['Mt', 'Gt']);
  };

  const workbookID = useWorkbookIDSelector();
  const workbookHasAuthor = useWorkbookHasAuthorSelector();
  const showCopyButton = !workbookHasAuthor;

  useEffect(() => {
    !workbookHasAuthor && store.dispatch(errorAdded({
      title: "Information",
      message: "This is a featured workbook. If you'd like to change things you need to copy it.",
      type: "info"
   }));
  }, [workbookHasAuthor])

  return (
    <Box
      bg="white"
      top={0}
      mb="0.75rem"
      zIndex={500}
      shadow="sm"
      fontSize="md"
      boxShadow="base"
      whiteSpace="nowrap"
    >
      <InputWithAddons setCalculated={setCalculated} test = "testing prop"/>
      <Grid templateColumns="repeat(6, 1fr)" gap={1} w="100%" margin={0} p={2}>
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
          <StyledRunWrapper onClick={calculate} >
            <StyledButton loading={workbookState?.calculationLoading}> 
              <RunButton /> 
              
            </StyledButton>
            { workbookState?.techData ? 
              <Center
                position="absolute" 
                left="0" 
                right="0"
                top="0"
                bottom="0"
                fontSize="1.5rem"
                marginTop="19%"
                fontWeight="bold"
                textAlign="center"
              > 
              
              { calculated? 
                <Text flex="1 1 160px"> {calculateMmtReduced()} </Text>:
                <LoadButton />
              }
                
              </Center> : 
              <PlayButton position="absolute" top="0" /> 
            }
          </StyledRunWrapper>
        ) : null}
      </Grid>
    </Box>
  );
}
