import React, { useContext } from "react";
import { Flex, Link,  Text } from "@chakra-ui/react";
import { Link as DomLink, useParams } from "react-router-dom";
import styled from "styled-components"
import { UserContext } from "services/user"

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



export const Menu = () => {
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
    <Flex>
    {menuItems.map(({ title, to }, index) => (
      <MenuItem fontSize="md" key={index} to={to}>
        {title}
      </MenuItem>
    ))}
    </Flex>
  );
}

export default Menu;
