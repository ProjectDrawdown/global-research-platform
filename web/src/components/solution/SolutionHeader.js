import React from "react";
import { Heading, Flex, useTheme } from "@chakra-ui/react";
import { useConfigContext } from "../../contexts/ConfigContext";
import { hex2rgb } from "util/color-utilities";

const SolutionHeader = ({ color, title, technologyId }) => {
  const themeData = useTheme();
  const ConfigContext = useConfigContext();
  const techImgFilename = ConfigContext.settings.technologyImages[technologyId];
  const technologyImage = techImgFilename
    ? require(`../../images/technology_images/${techImgFilename}`)
    : null;
  const bgImage = technologyImage
    ? "url(" + technologyImage.default + ")"
    : "none";
  const bgColorHex = themeData.colors.brand[color]
    ? themeData.colors.brand[color][900]
    : themeData.colors.brand.grey[900];
  const bgColorRGBAStart = `rgba(${hex2rgb(bgColorHex).join(",")},0.9)`;
  const bgColorRGBAEnd = `rgba(${hex2rgb(bgColorHex).join(",")},0.3)`;

  return (
    <Flex
      w="100%"
      bgImage={`linear-gradient(30deg, ${bgColorRGBAStart}, ${bgColorRGBAEnd}), ${bgImage}`}
      boxShadow="base"
      bgPos="center"
      bgSize="cover"
      color="white"
      p={4}
      alignItems="flex-end"
    >
      <Heading
        as="h2"
        mt="1.5rem"
        fontSize="2.5rem"
        lineHeight="100%"
        letterSpacing="0.02em"
        textTransform="uppercase"
        fontFamily="Bebas Neue"
      >
        {title}
      </Heading>
    </Flex>
  );
};

export default SolutionHeader;
