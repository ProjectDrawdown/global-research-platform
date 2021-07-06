import React, { useContext } from "react";
import styled from "styled-components";
import logo from "../projectdrawdown_logo.png";
import { Box, Flex, Text, Link, Image } from "@chakra-ui/react";
import { UserContext } from "services/user";
import { Link as DomLink } from "react-router-dom";
import Logo from "./Logo.js";

const Item = styled(Text)`
  margin-right: 1.5rem;
`;

const MenuItem = ({ children, isLast, to }) => {
  return (
    <Item
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      as="div"
      display="block"
    >
      <Link as={DomLink} bm={2} to={to}>
        <Text as="span" fontSize="sm">
          {children}
        </Text>
      </Link>
    </Item>
  );
};

export const PageHeader = ({ logoWidth = 150 }) => {
  // TODO how to test if we are logged in or not? This is not working.
  const { user } = useContext(UserContext);
  const loggedIn = user && typeof user === "object" && user.id;
  const menuItems =
    loggedIn
      ? [
          { title: "Workbooks", to: "/workbooks" },
          { title: "Logout", to: "/logout" }
        ]
      : [{ title: "Log In", to: "/login" }];

  const logoLink = loggedIn ? "/workbooks" : "/";

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
      {menuItems.map(({ title, to }, index) => (
        <MenuItem fontSize="md" key={index} to={to}>
          {title}
        </MenuItem>
      ))}
    </Flex>
  );
};
