import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react"
import PropTypes from "prop-types"
import { QuestionIcon } from "@chakra-ui/icons"
import styled from "styled-components"

const QuestionBoxWrapper = styled(Box)`
  cursor: pointer;
`

/**
 * Styled Paragraph to be used with tooltip
 */
const StyledParagraph = styled.p`
  padding-bottom: 8px;
`

/**
 * A Question box that will pop open a tooltip based the `TooltipWidget` component
 */
const QuestionBox = ({
  TooltipWidget,
  placement = "bottom-start",
  trigger = "hover",
  width,
  border = true
}) => {
  return (<QuestionBoxWrapper
    py={border ? 1 : 0}
    px={border ? 2 : 0}
    mr={border ? 2 : 0}
    d="inline-block"
    borderWidth="1px"
    borderStyle={border ? "dashed" : "none"}
    borderColor="gray.300"
    borderRadius="md">
    <Popover
      placement={placement}
      isLazy={true}
      trigger={trigger}
      width={width}
    >
      <PopoverTrigger>
        <QuestionIcon
          w="18px"
          h="18px"
          color="gray.300" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <TooltipWidget />
        </PopoverBody>
      </PopoverContent>
    </Popover>
    
  </QuestionBoxWrapper>)
}

QuestionBox.propTypes = {
  /** The component that will be the content of your tooltip */
  TooltipWidget: PropTypes.elementType.isRequired,

  /** 
   * Where the tooltip should open from the button, default: bottom-start.
   * possible value:  "bottom" | "left" | "right" | "top" | "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end"
   * */
  placement: PropTypes.oneOf(["bottom", "left", "right", "top", "auto", "auto-start",
                              "auto-end", "top-start", "top-end", "bottom-start", "bottom-end",
                              "right-start", "right-end", "left-start", "left-end"]),

  /**
   * How tooltip will show on interaction, default: hover.
   * possible value: "click" | "hover"
   */
  trigger: PropTypes.oneOf(['click', 'hover']),

  /**
   * The width of the tooltip, default: "md".
   * possible value: "sm" | "md" | "lg" | "xl"
   */
  width: PropTypes.string,

  /**
   * Enable border to question box, default: true
   */
  border: PropTypes.bool
}

export {
  QuestionBox,
  StyledParagraph
}