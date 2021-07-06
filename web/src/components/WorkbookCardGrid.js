import React from "react";
import { Grid } from "@chakra-ui/react";

const WorkbookCardGrid = ({ children }) => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={3}>
      {children}
    </Grid>
  );
};

export default WorkbookCardGrid;
