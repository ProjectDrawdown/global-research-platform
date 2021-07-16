import React from "react";
import {
  Box,
  Accordion as UIAccordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from "@chakra-ui/react";

/**
 * An accordion layout utility. It doesn't appear to be used anywhere.
 */
export const Item = ({ title, children, color }) => {
  return (
    <AccordionItem>
      <AccordionButton
        _expanded={{
          borderTopWidth: "1px",
          borderBottomWidth: "1px",
          borderColor: `brand.${color}.200`,
          bg: `brand.${color}.900`
        }}
        color={"white"}
      >
        <AccordionIcon mr={2} />
        <Box flex="1" textAlign="left">
          {title}
        </Box>
      </AccordionButton>
      <AccordionPanel py={4}>{children}</AccordionPanel>
    </AccordionItem>
  );
};

export const Accordion = ({ children, ...props }) => (
  <UIAccordion {...props}>{children}</UIAccordion>
);
