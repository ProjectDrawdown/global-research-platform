import { useHistory } from "react-router-dom"
import { 
  Card,
  CardBody,
  CardTitle,
  CardHeader
 } from "components/Card"

 const BaseCard = ({
   size,
   color,
   icon,
   path,
   pathType = "modal",
   title,
   children
 }) => {
  const history = useHistory();

  return (
    <Card size={size}>
      {
        title ?
        <CardHeader color={color}>
          {
            icon ?
              <CardTitle
                icon={icon}
                  onClick={() => history.push({ hash: `#${pathType}/${path}` })
                }>
                  {title}
              </CardTitle>
            :
              <CardTitle>{title}</CardTitle>
          }
        </CardHeader>
        :
        <></>
      }
      <CardBody>
        {children}
      </CardBody>
    </Card>
  )
 }

export default BaseCard