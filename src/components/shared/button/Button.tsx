import autobind from "autobind-decorator";
import * as classNames from "classnames";
import * as React from "react";
import Ink = require("react-ink");
import "./Button.scss";

export interface IButtonProps extends React.Props<{}> {
  className?: string;
  onClick?: () => void;
  circle?: boolean;
}

@autobind
class Button extends React.Component<IButtonProps, {}> {
  public render() {
    const { className, circle } = this.props;
    const buttonClass = classNames(
      "button",
      {
        "button--circle": circle
      },
      className
    );

    return (
      <button className={buttonClass} onClick={this.onClick}>
        {this.props.children}

        <Ink />
      </button>
    );
  }

  private onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
}

export default Button;
