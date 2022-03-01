import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { 
  Card,
  CardBody,
  CardTitle,
  CardHeader
} from "components/Card"

const CardBodyWrapped = styled.div`
  transition: height 1s ease-out;
  width: 100%;

  &.card__body {
    &--hidden {
      height: 0;
      overflow: hidden;
    }

    &--expanded {
      height: auto;
    }
  }
`;

 const BaseCard = ({
   size,
   color,
   icon,
   path,
   pathType = "modal",
   title,
   children,
   isTogglable = false
 }) => {
  const [expanded, setExpanded] = useState(!isTogglable ? true : false)
  const history = useHistory();

  const onClick = isTogglable ?
    () => setExpanded(!expanded)
    :
    () => history.push({ hash: `#${pathType}/${path}` })

  let inlineIcon = icon;

  if (isTogglable) {
    if (expanded) {
      inlineIcon = faChevronUp
    } else {
      inlineIcon = faChevronDown
    }
  }

  return (
    <Card size={size}>
      {
        title ?
        <CardHeader color={color}>
          {
            inlineIcon ?
              <CardTitle
                icon={inlineIcon}
                onClick={onClick}
              >
                  {title}
              </CardTitle>
            :
              <CardTitle>{title}</CardTitle>
          }
        </CardHeader>
        :
        <></>
      }
      <CardBody wrapper={!expanded} isTogglable={isTogglable && !expanded}>
        <CardBodyWrapped className={`card__body--${expanded ? "expanded" : "hidden"}`}>
          {children}
        </CardBodyWrapped>
      </CardBody>
    </Card>
  )
 }

export default BaseCard