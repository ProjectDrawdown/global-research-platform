import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

import {
  faCircle as farCircle,
} from "@fortawesome/free-regular-svg-icons";

/**
 * The Styled Progress Bar to be used in the main ProgressBar below
 */
const StyledProgressBar = styled("div")`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

/**
 * The Styled Container to be used in the main ProgressBar below
 */
const Container = styled("div")`
  display: flex;
  align-content: space-around;
`;

/**
 * The Styled CircleContainer to be used in the main ProgressBar below
 */
const CircleContainer = styled(Container)`
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 0.5vw;
`;

/**
 * The Styled Child (text) to be used in the main ProgressBar below
 */
const Child = styled("div")`
  margin-left: 1vw;
  margin-right: 1vw;
  text-align: center;
  flex-grow: 1;
`;

/**
 * The Styled decorative Line to be used in the main ProgressBar below
 */
const Line = styled("div")`
  position: relative;
  flex-grow: 99;
  border: 1px solid lightgrey;
  height: 0.01vw;
  top: 0.7vw;
`;

/**
 * A Progress Bar component, which displays the progress of the process of creating a new Workbook. On each page in the process, the progress bar is given a `progressState` property to display the correct state.
 */
export const ProgressBar = ({ progressState }) => {
  const solid = ( <><FontAwesomeIcon icon={faCircle} /></>)
  const regular = ( <><FontAwesomeIcon icon={farCircle} /></>)
  return (
    <StyledProgressBar>
      <CircleContainer>
        {progressState === 0 ? solid : regular}
        <Line />
        {progressState === 1 ? solid : regular}
        <Line />
        {progressState === 2 ? solid : regular}
      </CircleContainer>
      <Container>
        <Child>Select Base Solution Set</Child>
        <Child>Enter solution set details</Child>
        <Child>Select technologies to focus on</Child>
      </Container>
    </StyledProgressBar>
  )
};

