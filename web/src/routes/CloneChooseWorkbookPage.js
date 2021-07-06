import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { unwrapResult } from '@reduxjs/toolkit'
import store from "redux/store";
import { unsetWorkbookThunk } from "redux/reducers/workbook/workbookSlice";
import { fetchWorkbooksThunk } from "redux/reducers/workbook/workbookListSlice";
import { Link } from "react-router-dom";
import { Text, Heading, VStack, Box, Icon } from "@chakra-ui/react";
import PageLayout from "components/PageLayout";
import { ProgressBar } from "components/ProgressBar";
import { WorkbookCard, WorkbookCardWrapper } from "components/WorkbookCard";
import WorkbookCardGrid from "components/WorkbookCardGrid";
import { IoIosAddCircleOutline as PlusIcon } from "react-icons/io";
import LoadingSpinner from "components/LoadingSpinner";

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
