import classNames from "classnames";
import * as React from "react";
import Button, { IButtonProps } from "../button/Button";
import Icon from "../icon/Icon";

import "./IconButton.scss";

interface IIconButtonProps extends IButtonProps {
  iconName: string;
  text?: string;
  id?: string;
}

class IconButton extends React.Component<IIconButtonProps> {
  public render() {
    const { iconName, className, onClick, text, id } = this.props;

    const buttonClass = classNames("icon-button", className);

    return (
      <Button {...this.props} className={buttonClass}>
        <div className="icon-button__icon">
          <Icon name={iconName} />
        </div>

        {text && <div className="icon-button__text">{text}</div>}
      </Button>
    );
  }
}

export default IconButton;
