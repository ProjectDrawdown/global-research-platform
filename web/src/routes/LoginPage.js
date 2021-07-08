import React, { useContext } from "react";
import PageLayout from "parts/PageLayout";
import { VStack, Box, Heading, Button } from "@chakra-ui/react";
import { LogoGoogle } from "react-ionicons";
import { UserContext } from "services/user";

const LoginPage = () => {
  const { loginU } = useContext(UserContext);
  const loginUser = provider => {
    loginU(provider);
  };
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
        Welcome to the Drawdown Global Research Platform
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
          <Button
            leftIcon={<LogoGoogle color="white" />}
            onClick={() => loginUser("google")}
            variant="solid"
            colorScheme="brand.blue"
          >
            Login with Google
          </Button>
        </Box>
        {/* <Box>
          <Button
            leftIcon={<LogoGithub color="white"/>}
            onClick={loginUser}
            variant="solid"
            colorScheme="brand.blue"
          >
            Login with Github
          </Button>
        </Box> */}
      </VStack>
    </PageLayout>
  );
};

export default LoginPage;
