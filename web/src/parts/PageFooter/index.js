import React from "react";
import { Box } from "@chakra-ui/react";

export const PageFooter = props => (
  <Box
    bg="brand.blue.700"
    color="white"
    minHeight="12"
    fontSize="sm"
    display="flex"
    alignItems="flex-end"
    p={4}
    {...props}
  >
    <Box>TODO: Privacy Policy and Contact links</Box>
    <Box textAlign="right" flex="1">
      &copy; 2021 Drawdown Global Research Collaborative
    </Box>
  </Box>
);
