import { useHistory, useLocation } from "react-router-dom";
import { Card, CardTitle, CardHeader, CardBody } from "../Card";
import { faRightPanelOpen, faRightPanelClose } from "../../theme/icons";
import { getPathByHash } from "../../util/component-utilities";

const DrawerLinkCard = ({ children, size, color, title, path, drawer }) => {
  const history = useHistory();
  const location = useLocation();
  const drawerPath = getPathByHash("drawer", location.hash);
  return (
    <Card size={size}>
      <CardHeader color={color}>
        <CardTitle
          icon={drawerPath === path ? faRightPanelOpen : faRightPanelClose}
          onClick={() =>
            drawerPath === path
              ? history.push({ hash: "" })
              : history.push({ hash: "#drawer/" + path })
          }
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardBody wrapper={true}>{children}</CardBody>
    </Card>
  );
};

export default DrawerLinkCard;
