import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store from "redux/store";
import { fetchWorkbooksThunk } from "redux/reducers/workbook/workbookListSlice";
import { unsetWorkbookThunk } from "redux/reducers/workbook/workbookSlice";
import { Link } from "react-router-dom";
import PageLayout from "parts/PageLayout";
import { WorkbookCard, WorkbookCardWrapper } from "components/workbook/card";
import WorkbookCardGrid from "components/workbook/cardGrid";
import { Icon, Input, InputGroup, InputRightAddon, Text, Heading, VStack, Box } from "@chakra-ui/react";
import { IoIosAddCircleOutline as PlusIcon } from "react-icons/io";
import { SearchIcon } from "@chakra-ui/icons";
// import { FaPlusCircle as PlusIcon } from "react-icons/fa"
import { updateFilter } from "redux/reducers/filterQuery/filterQuerySlice";
import LoadingSpinner from "components/LoadingSpinner";

const CreateWorkbookCard = () => {
  return (
    <WorkbookCardWrapper
      bg="brand.blue.900"
      color="white"
      rounded="lg"
      role="group"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      as={Link}
      to={`/workbook/clone`}
      _hover={{
        bg: "brand.aqua",
        borderColor: "brand.aqua"
      }}
    >
      <Icon as={PlusIcon} color="white" w={20} h={20} p={2} />
      <Text textStyle="caps" fontSize="4xl" fontWeight="bold">
        Create New
      </Text>
    </WorkbookCardWrapper>
  );
};

const FilterInput = () => {
  const handleKeyUp = (e) => {
    store.dispatch(updateFilter(e.target.value.toLowerCase()));
  }

  return(
    <InputGroup>
    <Input maxWidth={"300px"} isFullWidth={false} onKeyUp={handleKeyUp} type="text" placeholder="Search by author, title, or attribute..." />
    <InputRightAddon children={<SearchIcon />} />
    </InputGroup>
  );
};

export const WorkbookPage = () => {
  const workbooks = useSelector(state => state.workbooks);
  const loadingStatus = useSelector(state => state.workbooks.status);
  const filterQuery = useSelector(state => state.filterQuery);

  useEffect(() => {
    // TODO refactor so we update the list on change and don't need to reload
    // here if it's up to date
    store.dispatch(fetchWorkbooksThunk());
    // Stale active workbook makes tracking state hard later on
    store.dispatch(unsetWorkbookThunk());
  }, []);

  if (loadingStatus === "loading") {
    return (
      <PageLayout>
        <LoadingSpinner />
      </PageLayout>
    );
  }

  const filterFunc = (workbook) => {
    if (filterQuery !== "") {
      return workbook.author !== null && (
        workbook.author.email.toLowerCase().indexOf(filterQuery) !== -1 ||
        workbook.name.toLowerCase().indexOf(filterQuery) !== -1 ||
        workbook.description.toLowerCase().indexOf(filterQuery) !== -1
      )
    } else {
      return workbook.author !== null
    }
  }

  return (
    <PageLayout>
      <VStack spacing={8}>
        <Box>
          <Heading as="h2" mb={2}>
            My Workbooks
          </Heading>

          <WorkbookCardGrid>
            {workbooks &&
              workbooks.workbooks &&
              typeof workbooks.workbooks.map === "function" &&
              workbooks.workbooks
                .filter(workbook => workbook.author === null)
                .map(workbook => (
                  <WorkbookCard
                    key={workbook.id}
                    workbook={workbook}
                    to={`/workbook/${workbook.id}`}
                  />
                ))}
          </WorkbookCardGrid>
        </Box>
        <Box>
          <Heading as="h2" mb={2}>
            Browse <FilterInput />
          </Heading>
          <WorkbookCardGrid>
            <CreateWorkbookCard />
            {workbooks &&
              workbooks.workbooks &&
              typeof workbooks.workbooks.map === "function" &&
              workbooks.workbooks
                .filter(filterFunc)
                .map(workbook => (
                  <WorkbookCard
                    key={workbook.id}
                    workbook={workbook}
                    to={`/workbook/${workbook.id}`}
                  />
                ))}
          </WorkbookCardGrid>
        </Box>
      </VStack>
    </PageLayout>
  );
};

export default WorkbookPage;
