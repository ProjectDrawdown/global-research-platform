import React from "react";
import { Flex, Container } from "@chakra-ui/react";
import { PageFooter } from "parts/PageFooter";
import PortfolioHeader from "parts/PortfolioHeader";

const PortfolioLayout = ({
  navMargin = true,
  maxW = "100%",
  showFooter = true,
  children
}) => {
  return (
    <Flex minH="100vh" direction="column" justifyContent="space-between">
      <Container
        top="0"
        pt="1rem"
        flex="1"
        maxW="none"
        position="fixed"
        mb="6rem"
        h={showFooter ? `calc(${maxW} - 50px)` : maxW}
      >
        <PortfolioHeader />
        {children}
      </Container>
      {showFooter && <PageFooter px={8} py={4} />}
    </Flex>
  );
};

export default PortfolioLayout;
