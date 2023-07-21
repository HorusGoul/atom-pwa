import classNames from "classnames";
import * as React from "react";
import Button, { ButtonProps } from "@/components/shared/button/Button";
import Icon from "@/components/shared/icon/Icon";
import "./IconButton.scss";

interface IconButtonProps extends Omit<ButtonProps, "children"> {
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
