import React from "react";

import { Center, Spinner } from "@chakra-ui/react";


const LoadingSpinner = (props) => (
  <Center w="100vw" h="100vh" top="0" left="0" position="fixed">
    <Spinner thickness="5px" speed="0.5s" emptyColor="gray.200" color="cyan.500" size="xl" />
  </Center>
)

export default LoadingSpinner;

