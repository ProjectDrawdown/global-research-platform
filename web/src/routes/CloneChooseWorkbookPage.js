import React, { useEffect } from "react"
import { useSelector } from "react-redux"
// import { unwrapResult } from '@reduxjs/toolkit'
import store from "redux/store"
import { unsetWorkbookThunk } from "redux/reducers/workbook/workbookSlice"
import { fetchWorkbooksThunk } from "redux/reducers/workbook/workbookListSlice"
import { Heading, VStack, Box } from "@chakra-ui/react"
import PageLayout from "parts/PageLayout"
import { ProgressBar } from "components/ProgressBar"
import { WorkbookCard } from "components/WorkbookCard"
import WorkbookCardGrid from "components/WorkbookCardGrid"
import LoadingSpinner from "components/LoadingSpinner"

export const CloneChooseWorkbookPage = () => {
  const workbooks = useSelector(state => state.workbooks);
  const loadingStatus = useSelector(state => state.workbooks.status);

  useEffect(() => {
    store.dispatch(fetchWorkbooksThunk());
    // Stale active workbook makes tracking state hard later on
    store.dispatch(unsetWorkbookThunk());
  }, []);

  if (loadingStatus === "loading") {
    return <LoadingSpinner />
  }

  return (
    <PageLayout>
      <VStack spacing={8}>
        <Box>
          <Heading as="h2" mb={2}>
            Choose Workbook
          </Heading>
          <ProgressBar progressState={0} />
          <WorkbookCardGrid>
            {workbooks &&
              workbooks.workbooks &&
              typeof workbooks.workbooks.map === "function" &&
              workbooks.workbooks.map(workbook => (
                <WorkbookCard
                  key={workbook.id}
                  workbook={workbook}
                  to={`/workbook/${workbook.id}/clone`}
                />
              ))}
          </WorkbookCardGrid>
        </Box>
        <Box>
          <WorkbookCardGrid>
            {/* { workbooks && workbooks.workbooks && typeof workbooks.workbooks.map === "function" && workbooks.workbooks.map((workbook) => ( */}
            {/*   <WorkbookCard key={workbook.id} workbook={workbook} /> */}
            {/* ))} */}
          </WorkbookCardGrid>
        </Box>
      </VStack>
    </PageLayout>
  );
};

export default CloneChooseWorkbookPage;
