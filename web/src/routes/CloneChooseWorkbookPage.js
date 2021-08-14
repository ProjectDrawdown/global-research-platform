import React, { useEffect, useContext, useState } from "react"
import { useSelector } from "react-redux"
// import { unwrapResult } from '@reduxjs/toolkit'
import store from "redux/store"
import { unsetWorkbookThunk } from "redux/reducers/workbook/workbookSlice"
import { fetchWorkbooksThunk } from "redux/reducers/workbook/workbookListSlice"
import { Heading, VStack, Box } from "@chakra-ui/react"
import PageLayout from "parts/PageLayout"
import { ProgressBar } from "components/ProgressBar"
import { WorkbookCard } from "components/workbook/card"
import WorkbookCardGrid from "components/workbook/cardGrid"
import LoadingSpinner from "components/LoadingSpinner"

import { UserContext } from "services/user";
import steps from "../redux/reducers/tour/TourstepsChooseWorkbookClone";
import TooltipHelp from "../HelpMode/TooltipHelp";
import Tourtooltip from "../components/Tourtooltip"
import Tour from 'reactour'

export const CloneChooseWorkbookPage = () => {
  const workbooks = useSelector(state => state.workbooks);
  const loadingStatus = useSelector(state => state.workbooks.status);
  const { user } = useContext(UserContext);
  const [showTour, setshowTour] = useState(true);

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
          <div className="first-workbook-step">
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
          </div>
        </Box>
        <Box>
          <WorkbookCardGrid>
            {/* { workbooks && workbooks.workbooks && typeof workbooks.workbooks.map === "function" && workbooks.workbooks.map((workbook) => ( */}
            {/*   <WorkbookCard key={workbook.id} workbook={workbook} /> */}
            {/* ))} */}
          </WorkbookCardGrid>
        </Box>
      </VStack>
      <Tour
      steps={steps}
      isOpen={user.meta.hasOnboarded?!user.meta.hasOnboarded:showTour}
      closeWithMask={false}
      onRequestClose={() => setshowTour(false)}
        CustomHelper={ Tourtooltip } />
      <div className="start-tour" style={{ position: "absolute", top: "0" }}></div>
    </PageLayout>
  );
};

export default CloneChooseWorkbookPage;
