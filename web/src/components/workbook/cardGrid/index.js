import React from "react"
import PropTypes from "prop-types"
import { Grid } from "@chakra-ui/react"

/**
 * Creates 3 card Grid
 * 
 * @param {*} children child component to be rendered 
 * @returns Component
 */
const WorkbookCardGrid = ({ children }) => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={3}>
      {children}
    </Grid>
  );
};

WorkbookCardGrid.propTypes = {
  /**
   * Child component to be rendered
   */
  children: PropTypes.elementType
}

export default WorkbookCardGrid;
