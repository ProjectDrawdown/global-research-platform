import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchWorkbookThunk } from "redux/reducers/workbook/workbookSlice"
import { useConfigContext } from "contexts/ConfigContext"
import { Stack, Box } from "@chakra-ui/react"
import PageLayout from "parts/PageLayout"
import { Navigation } from "components/Navigation"
import { ProgressBar } from "components/ProgressBar"
import {
  EditPortfolioPane
} from "components/TechnologyCardPanes"

const PostClonePage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWorkbookThunk(params.id));
  }, [params.id]);
  const configState = useConfigContext();
  return (
    <PageLayout navMargin={true} showFooter={false}>
      <ProgressBar progressState={2} />
      <Stack direction="row" h="100%" mx="auto">
        <EditPortfolioPane
          onClose={() => null}
          viewLocation={`/workbook/${params.id}`}
          cols={Math.round(window.innerWidth / 250)}
          mx="auto"
          w="100%"
        />
      </Stack>
      <Box mr="3" flex="1" bg="white">
        <Navigation />
      </Box>
    </PageLayout>
  );
};

export default PostClonePage;
