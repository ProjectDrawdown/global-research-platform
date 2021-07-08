import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchWorkbookThunk } from "redux/reducers/workbook/workbookSlice"
import { useConfigContext } from "contexts/ConfigContext"
import { Stack, Box } from "@chakra-ui/react"
import PortfolioLayout from "parts/PortfolioLayout"
import { Navigation } from "components/Navigation"
import {
  EditPortfolioPane
} from "components/TechnologyCardPanes"

const EditPortfolioPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const configState = useConfigContext();
  const [ width, setWidth ] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(fetchWorkbookThunk(params.id));
  }, [params.id]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  });
  
  return (
    <PortfolioLayout showFooter={false}>
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
    </PortfolioLayout>
  );
};

export default EditPortfolioPage;
