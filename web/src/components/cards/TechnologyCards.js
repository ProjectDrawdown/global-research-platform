import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme, Box, Heading, Wrap, WrapItem, Stack, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faStarOfLife,
  faSquare,
  faLink
} from "@fortawesome/free-solid-svg-icons";

import ButtonIcon from "components/tools/ButtonIcon";
import { useConfigContext } from "contexts/ConfigContext";
import { usePortfolioSolutions } from "helpers";

import styled from "styled-components";

const StyledFolderIcon = styled(FontAwesomeIcon)`
  position: relative;
  float: right;
  top: 5px;
  right: 5px;
`;

const StyledFeaturedIcon = styled(FontAwesomeIcon)`
  position: absolute;
  float: right;
  top: 13px;
  right: 16px;
  font-size: 10px;
`;

const StyledSquareIcon = styled(FontAwesomeIcon)`
  margin: 6px;
  font-size: 16px;
  margin-top: 10px;
  margin-left: 8px;
  margin-right: 4px;
`;

const StyledIndicatorIcon = styled(FontAwesomeIcon)`
  margin: 4px;
  font-size: 24px;
  color: grey;
`;

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

const StyledSpan = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  float: left;
`;

export const TechnologyCard = ({
  to,
  icon,
  color,
  title,
  onClick,
  featured,
  changed,
  selected,
  cols = 3,
  technologyImage,
  conventional = false
}) => {
  const theme = useTheme();
  const bgImage = technologyImage
    ? "url(" + technologyImage.default + ")"
    : "none";
  // Need to use JS to manage hover since selected is also controlling opacity.
  const [isHovered, setHover] = useState(false);
  const bgColor = theme.colors.brand[color]
    ? theme.colors.brand[color][200]
    : "default";
  const hoverColor = theme.colors.brand[color]
    ? theme.colors.brand[color][900]
    : "default";
  const linkProps = to
    ? {
        as: StyledLink,
        to: to
      }
    : { to: "#" };
  const maxW = `calc(${( 100 / cols )}% - ${theme.space[4]})`;
  return (
    <WrapItem
      {...linkProps}
      h={32}
      maxW={maxW}
      width="100%"
      bgSize="cover"
      boxShadow="md"
      onClick={onClick}
      bgImage={bgImage}
      flexDirection="column"
      // TODO reimplement using hover and groups in Chakra
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      bgColor={bgColor}
      style={{
        cursor: "pointer",
        opacity: conventional || selected || isHovered ? 1.0 : 0.6,
        boxShadow: selected ? theme.shadows["md"] : "none"
      }}
    >
      <Box
        w="100%"
        px="4px"
        fontSize="24px"
        textAlign="left"
        fontWeight="bold"
        position="relative"
        textDecoration="none"
        fontFamily="Bebas Neue"
        textTransform="uppercase"
        color={conventional || isHovered ? "white" : "grey"}
        bg={conventional ? "grey" : isHovered ? hoverColor : "white"}
      >
        <StyledSpan
          style={{
            width: !featured || conventional ? "100%" : "calc(100% - 36px)"
          }}
        >
          {title}
        </StyledSpan>
        {!conventional ? (
          <>
            {selected ? <StyledFolderIcon icon={faFolder} /> : null}
            {selected && changed ? (
              <StyledFeaturedIcon
                icon={faStarOfLife}
                color={isHovered ? hoverColor : "white"}
              />
            ) : null}
          </>
        ) : null}
      </Box>
      {!conventional && (
        <Box w="100%" h="100%">
          <Box
            w="auto"
            h="34px"
            d="inline-block"
            bg="rgba(255, 255, 255, 0.9)"
            borderBottomRightRadius="8px"
          >
            <StyledSquareIcon
              icon={faSquare}
              color={theme.colors.brand[color][900]}
            />
            <StyledIndicatorIcon icon={icon} />
          </Box>
        </Box>
      )}
    </WrapItem>
  );
};

export const TechnologyCardGrid = ({
  cols,
  children,
  mb = "3rem",
  technologyIDs,
  makeOnClickFn,
  isSelectedFn,
  isFeaturedFn,
  isChangedFn,
  keyString,
  onClose,
  sectorName,
  isEditingCards
}) => {
  const theme = useTheme();
  const {
    settings: { technologyMetadata, technologyImages, techMap, iconMap }
  } = useConfigContext();
  const color = theme.colors.brand[techMap[sectorName]]
    ? theme.colors.brand[techMap[sectorName]][900]
    : "default";
  makeOnClickFn =
    makeOnClickFn ||
    (technologyID => {
      return () => null;
    });
  isSelectedFn = isSelectedFn || (technologyID => false);
  isFeaturedFn = isFeaturedFn || (technologyID => false);
  isChangedFn = isChangedFn || (technologyID => false);
  return (
    <>
      <Wrap spacing={4} mx="auto" w="100%" mb={mb}>
        {children}
        {technologyIDs.map(technologyID => {
          const techData = technologyMetadata[technologyID];
          const techImgFilename = technologyImages[technologyID];
          const techSectorID = techMap[techData.sector];
          const techSectorType = techData.type;
          const color = techSectorID || techMap.default;
          const icon = iconMap[technologyID] || iconMap.default;
          const techImg = techImgFilename
            ? require(`images/technology_images/${techImgFilename}`)
            : null;
          return (
            <TechnologyCard
              cols={cols}
              icon={icon}
              key={`${keyString}-${technologyID}`}
              color={color}
              techID={technologyID}
              featured={isFeaturedFn(technologyID)}
              changed={isChangedFn(technologyID)}
              title={techData.name}
              technologyImage={techImg}
              onClick={makeOnClickFn(technologyID)(techSectorType)}
              selected={isSelectedFn(technologyID)}
            />
          );
        })}
      </Wrap>
    </>
  );
};

export const SectorGrid = ({
  isEditingPortfolio,
  technologyMetadata,
  sectorName,
  makeOnClickFn,
  isSelectedFn,
  isFeaturedFn,
  keyString,
  cols
}) => {
  const {
    sectorTechnologyIDsInPortfolio,
    sectorTechnologyIDsNotInPortfolio,
  } = usePortfolioSolutions(technologyMetadata, sectorName);
  
  // add these constants here for ease of making sense of 
  // what to display when
  const hasSolutionsInSector = sectorTechnologyIDsInPortfolio.length > 0 || sectorTechnologyIDsNotInPortfolio.length > 0;
  
  const shouldDisplayHeader = isEditingPortfolio 
    ? hasSolutionsInSector 
    : sectorTechnologyIDsInPortfolio.length > 0
  const shouldDisplaySelected = sectorTechnologyIDsInPortfolio.length > 0;
  const shouldDisplayNotSelected = (isEditingPortfolio && sectorTechnologyIDsNotInPortfolio.length > 0);

  return (
    <React.Fragment>
      {shouldDisplayHeader && (
        <Heading as="h3" textStyle={"portfolioTech"}>
          {sectorName}
        </Heading>
      )}
      {shouldDisplaySelected && ( 
        <TechnologyCardGrid
            {...{
              isEditingCards: isEditingPortfolio,
              technologyIDs: sectorTechnologyIDsInPortfolio,
              makeOnClickFn,
              isSelectedFn,
              isFeaturedFn,
              sectorName,
              keyString,
              cols
            }}
        />
      )}  
      {shouldDisplayNotSelected && (
        <TechnologyCardGrid
          {...{
            isEditingCards: isEditingPortfolio,
            technologyIDs: sectorTechnologyIDsNotInPortfolio,
            makeOnClickFn,
            isSelectedFn,
            isFeaturedFn,
            sectorName,
            keyString,
            cols
          }}
        />
        )
      }
    </React.Fragment>
  );
};

export const SortedTechnologyCardGrid = ({
  isEditingPortfolio,
  technologyIDs,
  makeOnClickFn,
  isSelectedFn,
  isFeaturedFn,
  keyString,
  cols
}) => {
  const {
    settings: { technologyMetadata, techMap }
  } = useConfigContext();
  return Object.keys(techMap).map(sectorName => 
    <SectorGrid  
      key={sectorName}
      isEditingPortfolio={isEditingPortfolio}
      technologyMetadata={technologyMetadata}
      sectorName={sectorName}
      makeOnClickFn={makeOnClickFn}
      isSelectedFn={isSelectedFn}
      isFeaturedFn={isFeaturedFn}
      keyString={keyString}
      cols={cols}
    />
  );
};

export const TechnologyMetadataButtonGrid = ({
  metadataIDs,
  makeOnClickFn
}) => {
  const {
    settings: { technologyStaticMetaData }
  } = useConfigContext();
  makeOnClickFn =
    makeOnClickFn ||
    (technologyID => {
      return () => null;
    });

  return (
    <Stack>
      <Flex>
        {
          metadataIDs.map(sectorName =>
            <ButtonIcon
              IconEl={<FontAwesomeIcon icon={faLink} />}
              text={technologyStaticMetaData[sectorName].name}
              onClick={makeOnClickFn(sectorName)}
            />
          )
        }
      </Flex>
    </Stack>
  )
}
