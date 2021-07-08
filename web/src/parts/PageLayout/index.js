import React from "react";
import { Flex, Container } from "@chakra-ui/react";
import { PageHeader } from "parts/PageHeader";
import { PageFooter } from "parts/PageFooter";

const PageLayout = ({
  navMargin = false,
  maxW = "100%",
  showFooter = true,
  children
}) => {
  return (
    <Flex minH="100vh" direction="column" justifyContent="space-between">
      <PageHeader />
      <Container
        flex="1"
        maxW="none"
        mb="6rem"
        ml={navMargin ? "3rem" : 0}
        w={`calc(${maxW} - ${navMargin ? "3" : "0"}rem)`}
    >
        {children}
      </Container>
      {showFooter && <PageFooter />}
    </Flex>
  );
};

export default PageLayout;
