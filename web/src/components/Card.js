import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStyleConfig, Box, Heading } from "@chakra-ui/react";
import {
  ChildByContainer,
  hasChildOfContainer
} from "util/component-utilities";

export const StyledIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: -3px;
  height: 26px;
  width: auto;
  font-size: 30px;
`;

export const StyledHeading = styled(Heading)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 36px);
  float: left;
  font-size: 14px;
  font-weight: 700;
`;

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

export const CardFooter = props => (
  <Box pos="relative" bottom="20px" right="0px" align="right" mt="2" mr="2">
    {props.children}
  </Box>
);

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
