import React, { useEffect, useContext, useState  } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchWorkbookThunk } from "redux/reducers/workbook/workbookSlice"
import { useConfigContext } from "contexts/ConfigContext"
import { Stack, Box } from "@chakra-ui/react"
import PageLayout from "parts/PageLayout"
import { Navigation } from "components/Navigation"
import { ProgressBar } from "components/ProgressBar"
import Tour from 'reactour'
import steps from "../redux/reducers/tour/TourstepsPostClone";
import { UserContext } from "services/user"
import Tourtooltip from "components/Tourtooltip"
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
  const { user } = useContext(UserContext);
  const [showTour, setshowTour] = useState(true);
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
      <Tour
      steps={steps}
      isOpen={user.meta.hasOnboarded?!user.meta.hasOnboarded:showTour}
      closeWithMask={false}
      onRequestClose={() => setshowTour(false)}
        CustomHelper={ Tourtooltip } />
    </PageLayout>
  );
};

export default PostClonePage;
