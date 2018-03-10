import autobind from "autobind-decorator";
import classNames = require("classnames");
import * as React from "react";
import Ink = require("react-ink");
import { IElement } from "../../Element";
import { getElementLocales } from "../../ElementManager";
import Button from "../shared/button/Button";
import "./PtElement.scss";

export interface IPtElementInfoProps {
  element: IElement;
  onClick?: (element: IElement) => void;
}

@autobind
class PtElementInfo extends React.Component<IPtElementInfoProps> {
  public render() {
    const { element } = this.props;
    const elementLocales = getElementLocales(element);

    return (
      <Button
        onClick={this.onClick}
        className={classNames("pt-element", "element", element.group)}
      >
        <div className="pt-element__atomic">{element.atomic}</div>

        <div className="pt-element__symbol">{element.symbol}</div>

        <div className="pt-element__name">{elementLocales.name}</div>
      </Button>
    );
  }

  private onClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.element);
    }
  }
}

export default PtElementInfo;
