import React, { useState } from "react";
import { GridItem } from "@chakra-ui/react";
import styled from "styled-components";

/**
 * The styled Overlay div, to overlay the entire screen
 */
const Overlay = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.9;
`

/**
 * The styled Container div
 */
const Container = styled.div`
  width: 11vw;
  background-color: #ffffff;
  border-radius: 5px;
  text-align: center;
  margin-left: 1.9vw;
`

/**
 * The Overlay Layout component. Accepts children content. Currently this component seems to only be used in src/components/technologies/EnergyTechnology.js (as simply "Overlay") and the only children given appear to be Text components. This is used to show an overview number for a chart, but when moused-over, the overlay (and thus number) is hidden to provide clearer viewing of the chart.
 */
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
