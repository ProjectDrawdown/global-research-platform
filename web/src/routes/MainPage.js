import React, { useEffect, useContext } from "react";
import PageLayout from "parts/PageLayout";
import { VStack, Heading } from "@chakra-ui/react";
import queryString from "query-string";
import { authenticate } from "api/api";
import { UserContext } from "services/user";
import { useHistory, useParams } from "react-router-dom";

const MainPage = ({ location }) => {
  //const query = queryString.parse(location.search)
  const history = useHistory();
  const params = useParams();
  const { user, setToken, fetchUserFromAPI } = useContext(UserContext);
  useEffect(() => {
    const login = async () => {
      const query = queryString.parse(location.search);
      const data = await authenticate(query.code, params.provider);
      if (data.access_token) setToken(data.access_token);
      fetchUserFromAPI();
      history.push("/workbooks");
    };
    login();
  }, [history, location.search, params.provider]);
  return (
    <PageLayout navMargin={false}>
      <Heading
        as="h3"
        fontSize="2xl"
        fontWeight="regular"
        maxWidth="2xl"
        textAlign="center"
        py={6}
        mx="auto"
      >
        Welcome to the Drawdown Global Solutions Collaborative
      </Heading>
      <VStack
        maxWidth="xl"
        bg="white"
        mx="auto"
        px={4}
        py={6}
        alignContent="center"
        height="100%"
      ></VStack>
    </PageLayout>
  );
};

export default MainPage;
