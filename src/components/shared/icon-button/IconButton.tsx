import classNames from "classnames";
import * as React from "react";
import Button, { IButtonProps } from "../button/Button";
import Icon from "../icon/Icon";
import "./IconButton.scss";

interface IconButtonProps extends IButtonProps {
  iconName: string;
  text?: string;
  id?: string;
}

function IconButton({ text, className, iconName, ...props }: IconButtonProps) {
  return (
    <Button className={classNames("icon-button", className)} {...props}>
      <div className="icon-button__icon">
        <Icon name={iconName} />
      </div>

      {text && <div className="icon-button__text">{text}</div>}
    </Button>
  );
}

export default IconButton;
