import React from "react";
import { HStack, Box } from "@chakra-ui/react";

export default {
  title: "Colors"
};

const Swatch = ({ bg }) => <Box w={32} h={32} bg={bg} />;

const Stack = ({ color }) => (
  <HStack>
    <Swatch bg={`brand.${color}.50`} />
    <Swatch bg={`brand.${color}.100`} />
    <Swatch bg={`brand.${color}.200`} />
    <Swatch bg={`brand.${color}.300`} />
    <Swatch bg={`brand.${color}.400`} />
    <Swatch bg={`brand.${color}.500`} />
    <Swatch bg={`brand.${color}.600`} />
    <Swatch bg={`brand.${color}.700`} />
    <Swatch bg={`brand.${color}.800`} />
    <Swatch bg={`brand.${color}.900`} />
  </HStack>
);

export const Electricity = () => <Stack color="electricity" />;

export const Food = () => <Stack color="food" />;

export const Industry = () => <Stack color="industry" />;

export const Transport = () => <Stack color="transport" />;

export const Buildings = () => <Stack color="buildings" />;

export const Health = () => <Stack color="health" />;

export const Land = () => <Stack color="land" />;

export const Coastal = () => <Stack color="coastal" />;

export const Engineering = () => <Stack color="engineering" />;
