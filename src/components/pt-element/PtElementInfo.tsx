import classNames = require("classnames");
import * as React from "react";
import { IElement } from "../../Element";
import "./PtElement.scss";

interface IPtElementInfoProps {
  element: IElement;
}

const PtElementInfo: React.StatelessComponent<IPtElementInfoProps> = ({
  element
}) => (
  <div className={classNames("pt-element", "element", element.group)}>
    <div className="pt-element__atomic">{element.atomic}</div>

    <div className="pt-element__symbol">{element.symbol}</div>

    <div className="pt-element__name">{element.name}</div>
  </div>
);

export default PtElementInfo;
