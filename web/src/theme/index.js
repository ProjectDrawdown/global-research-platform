import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import colors from "./colors";

export const breakpoints = createBreakpoints({
  xs: "320px",
  sm: "768px",
  md: "960px",
  lg: "1200px",
  xl: "1440px",
  xxl: "1920px"
});

const RowStyles = {
  baseStyle: {},
  sizes: {
    xs: {},
    sm: {},
    md: {
      width: {
        base: "100%",
        md: "100%"
      }
    },
    lg: {},
    xl: {}
  },
  defaultProps: {
    size: "md"
  }
};

const ColStyles = {
  baseStyle: {},
  sizes: {
    xs: {},
    sm: {
      width: {
        base: "100%",
        md: "33.33333%"
      }
    },
    md: {
      width: {
        base: "100%",
        md: "50%"
      }
    },
    lg: {
      width: {
        base: "100%",
        md: "66.66666%"
      }
    },
    xl: {}
  },
  defaultProps: {
    size: "md"
  }
};

const CardStyles = {
  // The styles all button have in common
  baseStyle: {},
  sizes: {
    xs: {
      width: {
        base: "100%",
        md: "25%"
      }
    },
    sm: {
      width: {
        base: "100%",
        md: "33.33333%"
      }
    },
    md: {
      width: {
        base: "100%",
        sm: "50%",
        md: "50%"
      }
    },
    lg: {
      width: {
        base: "100%",
        md: "66.66666%"
      }
    },
    xl: {
      width: "100%"
    },
    max: {
      width: "100%",
      height: "100%"
    },
    variable: {
      flexGrow: "1"
    }
  },
  // variants: {
  // },
  defaultProps: {
    size: "md"
    // variant: "outline",
  }
};

const TooltipStyles = {
  parts: ['content', 'arrow'],
  baseStyle: props => ({
    popper: {
      zIndex: 10,
      maxW: props.width ? props.width : 'md',
      w: '100%',
    },
    content: {
      bg: "gray.800",
      color: "white",
      textAlign: "left",
      whiteSpace: "pre-line",
      fontSize: "14px",
    },
    arrow: {
      bg: "gray.800"
    },
  }),
};

const theme = extendTheme({
  colors,
  breakpoints,
  fonts: {
    body:
      "Montserrat, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    heading:
      "Montserrat, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
  },
  fontSizes: {
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px",
    "2xl": "22px",
    "3xl": "26px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px"
  },
  textStyles: {
    caps: {
      fontFamily: "Bebas Neue"
    },
    portfolio: {
      fontFamily: "Bebas Neue",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "36px",
      lineHeight: "50.4px"
    },
    portfolioTech: {
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "24px"
    },
    portfolioMarket: {
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "12px",
      lineHeight: "18px"
    },
    normal: {
      font: "body",
      fontSize: "md"
    }
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "gray.50",
        color: "gray.600"
      },
      // styles for the `a`
      a: {
        color: "drawdownAqua",
        _hover: {
          textDecoration: "none"
        }
      },
      button: {
        _focus: {
          boxShadow: "0 0 0 0px rgba(66, 153, 225, 0.6)"
        }
      }
    }
  },
  components: {
    Popover: TooltipStyles,
    Row: RowStyles,
    Col: ColStyles,
    Card: CardStyles
  }
});

export default theme;
