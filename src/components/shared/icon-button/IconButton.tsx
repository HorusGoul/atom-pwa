import * as classNames from "classnames";
import * as React from "react";
import Button from "../button/Button";
import Icon from "../icon/Icon";

import "./IconButton.scss";

interface IIconButtonProps {
  iconName: string;
  text?: string;
  onClick?: () => void;
  className?: string;
}

class IconButton extends React.Component<IIconButtonProps, {}> {
  public render() {
    const { iconName, className, onClick, text } = this.props;

    const buttonClass = classNames("icon-button", className);

    return (
      <Button className={buttonClass} onClick={onClick}>
        <div className="icon-button__icon">
          <Icon name={iconName} />
        </div>

        {text && <div className="icon-button__text">{text}</div>}
      </Button>
    );
  }
}

export default IconButton;
