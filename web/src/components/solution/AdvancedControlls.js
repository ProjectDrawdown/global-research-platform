import { Grid, GridItem } from "@chakra-ui/react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { 
  QuestionBox,
  StyledParagraph
} from "components/tools/QuestionBox"

const StyledHeaderGridItem = styled(GridItem)`
  border-bottom: 1px solid black;
  color: black;
  font-size: 14px;
  line-height: 21px
`;

/**
 * Styled div with a bottom border
 */
const StyledSpacer = styled.div`
  border-bottom: 1px solid #E2E8F0;
  margin-bottom: 1rem;
  margin-top: 1rem;
  width: 100%;
`;

const StyledFloatbox = styled.div`
  float: right;
`

const ComparisonTooltip = () => (
  <>
    <StyledParagraph><strong>Quick guide: Variable Input Forms</strong></StyledParagraph>
    {/* TODO: Create complex component (add ticket) */}
  </>
)

/**
 * Simple Header for Advance Controls toolbar
 */
const ACHeader = ({
  comparisonColumn = false
}) => (
  <Grid
    mt={6}
    mb={3}
    gap={4}
    templateColumns="repeat(12, 1fr)">
    <StyledHeaderGridItem colSpan={6} textAlign="right" fontWeight="700">
      Variable
    </StyledHeaderGridItem>
    <StyledHeaderGridItem colSpan={3}>
      This solution
    </StyledHeaderGridItem>
    {
      comparisonColumn &&
      <StyledHeaderGridItem colSpan={3}>
        <span>Comparison</span>
        <StyledFloatbox>
          <QuestionBox
            TooltipWidget={ComparisonTooltip}
            width="lg"
            border={false}
          />
        </StyledFloatbox>
      </StyledHeaderGridItem>
    }
  </Grid>
)

ACHeader.propTypes = {
  /**
   * Show comparison column label, default: false
   */
  comparisonColumn: PropTypes.bool
}

export {
  ACHeader,
  StyledSpacer
}