import React from "react";
import {
  useDisclosure,
  Text,
  Button,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody
} from "@chakra-ui/react";
import Cookie from "js-cookie";

function ChakraGDPRPopup({ disableInteraction = true }) {
  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: !Cookie.get("gdpr_accepted")
  });
  const disableInteractionProps = disableInteraction
    ? { closeOnEsc: false, closeOnOverlayClick: false }
    : {};
  const handleCloseClick = () => {
    Cookie.set("gdpr_accepted", true);
    onClose();
  };
  return (
    <Drawer
      placement="bottom"
      onClose={onClose}
      isOpen={isOpen}
      {...disableInteractionProps}
    >
      <DrawerOverlay>
        <DrawerContent>
          {/* <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader> */}
          <DrawerBody p={6}>
            <Flex
              maxWidth="4xl"
              direction="column"
              alignItems="center"
              margin="auto"
            >
              <Text fontSize="md">
                This site uses cookies to gather analytics about how the use of
                this tool and learn ways to better help users understand the
                impacts of climate solutions. By clicking 'I Understand' you
                alow this site to use cookies, pixels, and other analytics tools
                to gather data about its usage and use that data to improve the
                platform.
              </Text>
              <Button
                variant="solid"
                colorScheme="brand.blue"
                onClick={handleCloseClick}
                mt={4}
                mx="auto"
              >
                I Understand
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default ChakraGDPRPopup;
