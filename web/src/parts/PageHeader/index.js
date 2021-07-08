import React from "react";
import styled from "styled-components";
import { Flex, Text } from "@chakra-ui/react";
import Logo from "../../components/Logo.js";
import Menu from "../../components/Menu.js";

const Item = styled(Text)`
  margin-right: 1.5rem;
`;

export const PageHeader = () => {
  // TODO how to test if we are logged in or not? This is not working.
  return (
    <Flex
      as="nav"
      align="center"
      wrap="wrap"
      pos="sticky"
      width="100%"
      top={0}
      left={0}
      mb={4}
      p={4}
      zIndex={1000}
      bg="white"
      shadow="sm"
    >
      <Item flex="1" as="div">
        <Flex align="bottom" wrap="wrap">
          <Logo />
        </Flex>
      </Item>
      <Menu />
    </Flex>
  );
};
