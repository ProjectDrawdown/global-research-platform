import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

import {
  faCircle as farCircle,
} from "@fortawesome/free-regular-svg-icons";

const StyledProgressBar = styled("div")`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Container = styled("div")`
  display: flex;
  align-content: space-around;
`;

const CircleContainer = styled(Container)`
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 0.5vw;
`;

const Child = styled("div")`
  margin-left: 1vw;
  margin-right: 1vw;
  text-align: center;
  flex-grow: 1;
`;

const Line = styled("div")`
  position: relative;
  flex-grow: 99;
  border: 1px solid lightgrey;
  height: 0.01vw;
  top: 0.7vw;
`;

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

