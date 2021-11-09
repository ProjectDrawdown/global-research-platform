import React from "react";
import { VStack, Box, Heading, Text } from "@chakra-ui/react";
import PageLayout from "parts/PageLayout";

const NotFoundPage = () => {
  return (
    <PageLayout>
      <Heading
        as="h1"
        textStyle="caps"
        fontSize="4xl"
        maxWidth="2xl"
        textAlign="center"
        py={6}
        mx="auto"
      >
        Page Not Found
      </Heading>
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
          <Text>
            Sorry, there's no page at this location. Please check the link that
            brought you here and contact us if you continue to have any problems
            using the app.
          </Text>
        </Box>
      </VStack>
    </PageLayout>
  );
};

export default NotFoundPage;
