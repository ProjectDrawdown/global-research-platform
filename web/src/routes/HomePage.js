import React from "react";
import { Link } from "react-router-dom";
import { Stack, Box, Heading, Text, Button, Image } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import PageLayout from "components/PageLayout";
import imgHomepageAppScreenshot from "images/screenshots/homepage_app_screenshot.jpg";
import imgVisualizationsScreenshot from "images/screenshots/visualizations_screenshot.jpg";
import imgPortfolioCardsScreenshot from "images/screenshots/portfolio_cards_screenshot.jpg";

const HomePageSection = props => (
  <Box as="section" textAlign="center" py={8} px={4} {...props} />
);

const HomePageBanner = props => (
  <Box
    textAlign="center"
    display="flex"
    justifyContent="center"
    alignItems="center"
    mb={4}
    {...props}
  />
);

const HomePageBannerCTAText = ({ children }) => (
  <Box w="sm" textAlign="center" mr={4}>
    <Text fontSize="lg">{children}</Text>
  </Box>
);

const HomePageBannerCTAButton = ({ children }) => (
  <Button
    variant="outline"
    color="brand.blue.700"
    borderWidth={2}
    borderColor="brand.blue.700"
    rightIcon={<ArrowForwardIcon />}
    as={Link}
    to="/login"
  >
    {children}
  </Button>
);

const HomepageBannerImageBox = props => (
  <Box pt={2} display="flex" justifyContent="center">
    <Image {...props} />
  </Box>
);

const HomePage = () => {
  return (
    <PageLayout navMargin={false} maxW="100%">
      <Stack spacing={9} mt={6}>
        <HomePageSection>
          <Heading as="h2" textStyle="caps">
            Drawdown Global Research Platform
          </Heading>
          <Text fontSize="1.2rem" marginTop="2rem" marginLeft="10%" marginRight="10%">
            The Drawdown Global Research Platform is an ecosystem of researchers and contributors working together 1) to conduct rigorous research and analysis to identify the solutions to global warming and 2) to create a solutions-oriented knowledge commons and accompanying decision-support tools under the Drawdown Framework.
          </Text>
          {/* <Text fontSize="xl">Research Platform</Text> */}
        </HomePageSection>
        <HomePageSection bg="white">
          <HomePageBanner>
            <HomePageBannerCTAText>
              Build and edit projections based on peer-reviewed meta-analyses -
              or customize using your own data
            </HomePageBannerCTAText>
            <HomePageBannerCTAButton>Get Started</HomePageBannerCTAButton>
          </HomePageBanner>
          <HomepageBannerImageBox src={imgHomepageAppScreenshot} />
        </HomePageSection>
        <HomePageSection bg="white">
          <HomePageBanner>
            <HomePageBannerCTAText>
              Communicate impact with intuitive visualizations of cost,
              emissions, and timeline
            </HomePageBannerCTAText>
            <HomePageBannerCTAButton>Get Started</HomePageBannerCTAButton>
          </HomePageBanner>
          <HomepageBannerImageBox src={imgVisualizationsScreenshot} />
        </HomePageSection>
        <HomePageSection bg="white">
          <HomePageBanner>
            <HomePageBannerCTAText>
              Browse solutions models from researchers worldwide
            </HomePageBannerCTAText>
            <HomePageBannerCTAButton>Get Started</HomePageBannerCTAButton>
          </HomePageBanner>
          <HomepageBannerImageBox src={imgPortfolioCardsScreenshot} />
        </HomePageSection>
        <HomePageSection bg="white">
          <HomePageBanner>
            <HomePageBannerCTAText>
              Sign up and join an international community of climate researchers
              working to reach Drawdown.
            </HomePageBannerCTAText>
            <HomePageBannerCTAButton>Get Started</HomePageBannerCTAButton>
          </HomePageBanner>
        </HomePageSection>
      </Stack>
    </PageLayout>
  );
};

export default HomePage;
