import autobind from "autobind-decorator";
import classNames from "classnames";
import * as React from "react";
import { getElementLocales } from "../../ElementManager";
import Button from "../shared/button/Button";
import Icon from "../shared/icon/Icon";
import "./PtElement.scss";
import { IPtElementInfoProps } from "./PtElementInfo";

export interface IPtElementTestProps extends IPtElementInfoProps {
  discovered: boolean;
}

interface IPtElementTestState {
  discovered: boolean;
  showError: boolean;
}

@autobind
class PtElementTest extends React.Component<
  IPtElementTestProps,
  IPtElementTestState
> {
  public state: IPtElementTestState = {
    discovered: this.props.discovered,
    showError: false,
  };

  private errorTimeout: number | null = null;

  public render() {
    const { element } = this.props;
    const { discovered, showError } = this.state;
    const elementLocales = getElementLocales(element);

    return (
      <Button
        onClick={this.onClick}
        className={classNames("pt-element", "element", {
          [element.group]: discovered,
          clear: !discovered,
          "pt-element--error": showError,
        })}
      >
        <div className="pt-element__atomic">{element.atomic}</div>

        <div className="pt-element__symbol">
          {discovered ? element.symbol : "?"}
        </div>
        <div className="pt-element__name">
          {discovered ? elementLocales.name : "???"}
        </div>

        <div className="pt-element__error">
          <Icon name="close" />

          <div>Oops!</div>
        </div>
      </Button>
    );
  }

  public discover() {
    this.setState({
      discovered: true,
    });
  }

  public showError() {
    if (this.errorTimeout) {
      return;
    }

    this.setState({
      showError: true,
    });

    this.errorTimeout = window.setTimeout(() => {
      this.setState({ showError: false });
      this.errorTimeout = null;
    }, 1000);
  }

  private onClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.element);
    }
  }
}

export default PtElementTest;
