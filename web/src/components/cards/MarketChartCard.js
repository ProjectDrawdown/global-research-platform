import { useHistory, useLocation } from "react-router-dom";
import { Card, CardTitle, CardHeader, CardBody } from "../Card";
import { faExpandAlt, faCompressAlt } from "@fortawesome/free-solid-svg-icons";
import { getPathByHash } from "../../util/component-utilities";

const MarketChartCard = (props) => {
  const history = useHistory();
  const location = useLocation();
  const modalPath = getPathByHash("modal", location.hash);
  const { children, size, color, title, path, modal, position, padding } = props;
  return (
    <Card size={size}>
      <CardHeader color={color}>
        <CardTitle
          icon={modalPath === path ? faCompressAlt : faExpandAlt}
          onClick={() =>
            modalPath === path
              ? history.push({ hash: "" })
              : history.push({ hash: "#modal/" + path })
          }
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardBody wrapper={true} position={position} padding={padding}>{children}</CardBody>
    </Card>
  );
};

export default MarketChartCard;
