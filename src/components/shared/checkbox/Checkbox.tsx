import autobind from "autobind-decorator";
import classNames from "classnames";
import * as React from "react";

import "./Checkbox.scss";

interface ICheckboxProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  readOnly?: boolean;
  className?: string;
}

interface ICheckboxState {
  value: boolean;
}

/**
 * Checkbox component that follows Kiddle's
 * design.
 *
 * @class Checkbox
 * @extends {React.Component<ICheckboxProps, CheckboxState>}
 */
@autobind
class Checkbox extends React.Component<ICheckboxProps, ICheckboxState> {
  public static defaultProps: ICheckboxProps = {
    readOnly: false,
    value: false
  };

  public state: ICheckboxState = {
    value: this.props.value
  };

  private htmlCheckbox: HTMLInputElement;

  /**
   * Returns the value of the checkbox.
   *
   * @returns {boolean}
   * @memberof Checkbox
   */
  public getValue(): boolean {
    return this.state.value;
  }

  public componentWillReceiveProps(nextProps: ICheckboxProps) {
    this.setState({
      value: nextProps.value
    });
  }

  /**
   * Toggles the value of the checkbox.
   *
   * @memberof Checkbox
   */
  public toggleCheck() {
    if (this.props.readOnly) {
      return;
    }

    const value = this.htmlCheckbox.checked;

    this.setState({
      value
    });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  public onClick(event: React.MouseEvent<HTMLInputElement>) {
    event.stopPropagation();
  }

  public render() {
    return (
      <div className={classNames("checkbox", this.props.className)}>
        <label>
          <input
            className="checkbox__input"
            type="checkbox"
            checked={this.state.value}
            onChange={this.toggleCheck}
            onClick={this.onClick}
            ref={htmlCheckbox => (this.htmlCheckbox = htmlCheckbox)}
          />

          <div className="checkbox__content">
            <svg xmlns="http://www.w3.org/2000/svg" width="8px" height="6px">
              <path
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                d="M0.35,2.48 2.47,4.59 6.71,0.35"
              />
            </svg>
          </div>

          {this.props.children && (
            <div className="checkbox__label">{this.props.children}</div>
          )}
        </label>
      </div>
    );
  }
}

export default Checkbox;
