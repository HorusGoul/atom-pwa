import autobind from "autobind-decorator";
import classNames = require("classnames");
import * as React from "react";
import Ink = require("react-ink");
import { IElement } from "../../Element";
import "./PtElement.scss";

export interface IPtElementInfoProps {
  element: IElement;
  onClick?: (element: IElement) => void;
}

@autobind
class PtElementInfo extends React.Component<IPtElementInfoProps> {
  public render() {
    const { element } = this.props;

    // TODO: LOCALIZE ELEMENT NAME
    return (
      <div
        onClick={this.onClick}
        className={classNames("pt-element", "element", element.group)}
      >
        <div className="pt-element__atomic">{element.atomic}</div>

        <div className="pt-element__symbol">{element.symbol}</div>

        <div className="pt-element__name">{element.name}</div>

        <Ink />
      </div>
    );
  }

  private onClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.element);
    }
  }
}

export default PtElementInfo;
