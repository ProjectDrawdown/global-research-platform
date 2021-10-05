import {
  Button
} from "@chakra-ui/react";
import PropTypes from "prop-types"

const ButtonIcon = ({
  text,
  IconEl = null,
  onClick
}) => {
  return (<Button 
    leftIcon={IconEl}
    color={`brand.electricity.900`}
    variant="outline"
    mr="2"
    onClick={onClick}>
    {text}
  </Button>
  )
}

ButtonIcon.propTypes = {
  /* Text for button */
  text: PropTypes.string,
  /* OnClick function for button */
  onClick: PropTypes.func,
  /* Icon to be used for button, FontAwesome recommended */
  IconEl: PropTypes.elementType
}

export default ButtonIcon