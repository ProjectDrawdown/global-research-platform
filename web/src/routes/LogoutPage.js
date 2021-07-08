import React, { useEffect, useContext } from "react";
import PageLayout from "parts/PageLayout";
import { VStack, Box } from "@chakra-ui/react";
import { UserContext } from "services/user";

const LogoutPage = () => {
  const { logoutU } = useContext(UserContext);

  useEffect(() => {
    logoutU()
  });

  return (
    <PageLayout navMargin={false}>
      <VStack
        maxWidth="xl"
        bg="white"
        mx="auto"
        px={4}
        py={6}
        alignContent="center"
        height="100%"
      >
        <Box>
          Logging out
        </Box>
      </VStack>
    </PageLayout>
  );
};

export default LogoutPage;
