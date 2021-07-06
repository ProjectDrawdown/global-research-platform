import React from "react";
import { Flex, Container } from "@chakra-ui/react";
import { PageHeader } from "components/PageHeader";
import { PageFooter } from "components/PageFooter";

const PageLayout = ({
  title,
  navMargin = false,
  headerMargin = true,
  maxW = "100%",
  showFooter = true,
  fixedHeight = true,
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
