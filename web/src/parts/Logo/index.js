import React from "react";
import { Box } from "@chakra-ui/react";
import { Link as DomLink } from "react-router-dom";

/**
 * A Logo component for DGRP. It can take props, but this isn't currently done. It is used only as-is in WorkbookHeader, PortfolioHeader, and PageHeader
 */
const Logo = (props) => (
  <Box
    fontSize="2xl"
    pl={2}
    pr={2}
    pt={2}
    pb={1}
    textTransform="uppercase"
    textStyle="caps"
    color="white"
    bg="brand.blue.200"
    rounded="sm"
    as={DomLink}
    to="/"
    {...props}
  >
    Drawdown Global Research Platform
  </Box>
)

export default Logo;
