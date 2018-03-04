import autobind from "autobind-decorator";
import classNames = require("classnames");
import * as React from "react";
import Ink = require("react-ink");
import "./PtElement.scss";
import { IPtElementInfoProps } from "./PtElementInfo";

export interface IPtElementTestProps extends IPtElementInfoProps {
  discovered: boolean;
}

interface IPtElementTestState {
  discovered: boolean;
}

@autobind
class PtElementTest extends React.Component<
  IPtElementTestProps,
  IPtElementTestState
> {
  public state: IPtElementTestState = {
    discovered: this.props.discovered
  };

  public render() {
    const { element } = this.props;
    const { discovered } = this.state;

    return (
      <div
        onClick={this.onClick}
        className={classNames("pt-element", "element", {
          [element.group]: discovered,
          clear: !discovered
        })}
      >
        <div className="pt-element__atomic">{element.atomic}</div>

        <div className="pt-element__symbol">
          {discovered ? element.symbol : "?"}
        </div>
        <div className="pt-element__name">
          {discovered ? element.name : "???"}
        </div>

        <Ink />
      </div>
    );
  }

  public discover() {
    this.setState({
      discovered: true
    });
  }

  private onClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.element);
    }
  }
}

export default PtElementTest;
