import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStyleConfig, Box, Heading } from "@chakra-ui/react";
import {
  ChildByContainer,
  hasChildOfContainer
} from "util/component-utilities";

/**
 * Styled Icon to be used in the CardTitle
 */
export const StyledIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: -3px;
  height: 26px;
  width: auto;
  font-size: 30px;
`;

/**
 * Styled Heading to be used in the CardTitle
 */
export const StyledHeading = styled(Heading)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 36px);
  float: left;
  font-size: 14px;
  font-weight: 700;
`;

/**
 * Card Title is typically the content for a CardHeader(see below) that expects to be given children (just a string ... the card's title), an icon (see src/theme/icons.js or the module: @fortawesome/free-solid-svg-icons), an onClick handler, and whether the icon should float left or right.
 */
export const CardTitle = ({ children, icon, onClick, iconLeft = false }) => (
  <>
    {icon && (
      <StyledIcon
        style={{
          float: iconLeft ? "left" : "right",
          marginRight: iconLeft ? "6px" : undefined
        }}
        icon={icon}
        onClick={onClick}
      />
    )}
    <StyledHeading as="h6" mb="0" size="sm" float="left">
      {children}
    </StyledHeading>
  </>
);

/**
 * The Card Header container that typically contains a CardTitle (see above) to be given as its "children", a background color parameter, and an invert boolean as seen in src/components/solution/index.js.
 */
export const CardHeader = ({ children, color, invert = false }) => (
  <Box
    px="3"
    py="2"
    flex="1"
    minWidth="0"
    alignSelf="flex-end"
    textTransform="uppercase"
    color={invert ? "white" : `brand.${color}.900`}
    bgColor={`brand.${color}.${invert ? 900 : 100}`}
  >
    {children}
  </Box>
);

/**
 * This is the main Card Body, right now used in the MarketChartCard, the DrawerLinkCard, and in src/components/solution/index.js when creating the cards for TAM, Adoption, Emissions, Finances, and RawData
 *
 * This component expects children (MarketChart, EmissionInputs, etc), and styling options
 */
export const CardBody = ({ children, wrapper = false, position, ...otherProps }) => (
  <Box
    p="3"
    w="100%"
    d="flex"
    mt={wrapper ? 0 : 4}
    overflowY={wrapper ? "auto" : undefined}
    h={wrapper ? "calc(100% - 37px)" : undefined}
    position={position}
    {...otherProps}
  >
    {children}
  </Box>
);

/**
 * A Footer component for a Card, expecting children.
 */
export const CardFooter = props => (
  <Box pos="relative" bottom="20px" right="0px" align="right" mt="2" mr="2">
    {props.children}
  </Box>
);

/**
 * The main Card export, except that most places also import the CardHeader and CardTitle as well. The Footer doesn't appear to be used.
 *
 * TODO: explain "ChildByContainer"
 */
export const Card = ({ children, size, variant, color }) => {
  const styles = useStyleConfig("Card", { size, variant });
  return (
    <Box sx={styles} p="0" boxShadow="base" bg="white">
      {(hasChildOfContainer(children, CardTitle) ||
        hasChildOfContainer(children, CardHeader)) && (
        <Box w="100%" d="flex">
          <ChildByContainer
            children={children}
            container={CardTitle}
            color={color}
          />
          <ChildByContainer children={children} container={CardHeader} />
        </Box>
      )}
      <ChildByContainer children={children} container={CardBody} />
      <ChildByContainer children={children} container={CardFooter} />
    </Box>
  );
};
