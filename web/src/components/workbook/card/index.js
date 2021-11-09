import React from "react"
import { Grid, GridItem, Box, Heading, Flex, Text, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { getLastUpdated } from 'util/date-utilities'
import thumb from "thumbnail.svg"

/**
 * Flex Wrapper for the Workbook Card component
 * 
 * @param {*} props 
 * @returns Component
 */
const WorkbookCardWrapper = props => (
  <Flex
    w="28vw"
    h="2xs"
    p="3"
    boxShadow="base"
    display="flex"
    direction="column"
    boxSizing="border-box"
    borderColor="white"
    borderWidth="3px"
    borderStyle="solid"
    _hover={{
      borderColor: "brand.aqua"
    }}
    {...props}
  />
);

/**
 * Display the created workbook as a card that shows the date of creation, notes, author.
 * 
 * @param {*} params0
 * @returns 
 */
const WorkbookCard = ({ workbook, to }) => {
  return (
    <WorkbookCardWrapper bg="white" rounded="sm" role="group" as={Link} to={to}>
      <Box w="100%" d="flex">
        <Heading as="h3" size="md" mb="0" fontSize="24px" lineHeight="36px" isTruncated>
          {workbook.name}
        </Heading>
        <Box align="right" flex="1" alignSelf="flex-end" fontSize="xs">
          <Text fontSize="12px" lineHeight="28px" isTruncated>
            Last updated: { getLastUpdated(workbook.updated_at) }
          </Text>
        </Box>
      </Box>
      <Box w="100%" d="flex" flex="1" mt="4">
        {/* <Box w="200px"> */}
        {/*<HalfPiesChart showMultiple={false} data={workbook.data} sourceSectors={ConfigContext.settings.sourceSectors} sinkSectors={ConfigContext.settings.sinkSectors} width={150} height={150} margins={{top: 0, right: 0, left: 0, bottom: 0}}/>*/}
        {/* </Box> */}
        <Box>
          <Grid templateColumns="2fr 1fr 2fr" fontSize="xs" gap={1}>
            <GridItem rowSpan={4} colSpan={1} marginRight="10px">
              <Image
                src={thumb}
              />
            </GridItem>
            <Box fontSize="sm" textStyle="caps">
              Author: {" "}
            </Box>
            <Box>{(workbook.author && workbook.author.email) || "Project Drawdown"}</Box>
            <Box fontSize="sm" textStyle="caps">
              Notes:{" "}
            </Box>
            <Box>{workbook.description}</Box>
            <Box fontSize="sm" textStyle="caps">
              Start Year:{" "}
            </Box>
            <Box>{workbook.start_year}</Box>
            {workbook.baseScenarioName && (
              <>
                <Box fontSize="sm" textStyle="caps">
                  Forked:{" "}
                </Box>
                <Box>{workbook.baseScenarioName}</Box>
              </>
            )}
            {workbook.referenceName && (
              <>
                <Box fontSize="sm" textStyle="caps">
                  Reference:{" "}
                </Box>
                <Box>{workbook.referenceName}</Box>
              </>
            )}
          </Grid>
        </Box>
      </Box>
      {/* <Box display="flex" justifyContent="flex-end" > */}
      {/*   <Link to={`/workbook/${workbook.id}/clone`}><FontAwesomeIcon icon={faCodeBranch} /></Link> */}
      {/* </Box> */}
    </WorkbookCardWrapper>
  );
};

WorkbookCardWrapper.propTypes = {
  /**
   * Pass thorugh all props downstreams
   */
  props: PropTypes.shape()
}

WorkbookCardWrapper.propTypes = {
  /**
   * Workbook object
   */
  workbook: PropTypes.shape(),

  /**
   * URL string for link
   */
  to: PropTypes.string
}

export {
  WorkbookCardWrapper,
  WorkbookCard
}