import React, { useState } from "react";
import { GridItem } from "@chakra-ui/react";
import styled from "styled-components";

const Overlay = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.9;
`

const Container = styled.div`
  width: 11vw;
  background-color: #ffffff;
  border-radius: 5px;
  text-align: center;
  margin-left: 1.9vw;
`

const OverlayLayout = ({ children }) => {
  const [visible, setVisible] = useState(true);

  const onMouseEnter = () => {
    setVisible(false);
  }

  const onMouseLeave = () => {
    setVisible(true);
  }

  return (
    <Overlay
      onMouseOver={onMouseEnter}  
      onMouseLeave={onMouseLeave}
    >
    {visible ? 
      <GridItem 
        w="100%"
      >
        <Container>
          {children}
        </Container>
      </GridItem>
    : ''}
    </Overlay>
  );
}

export default OverlayLayout;
