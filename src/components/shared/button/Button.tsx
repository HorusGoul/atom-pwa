import classNames from "classnames";
import * as React from "react";
import "./Button.scss";
import ButtonBase from "@material-ui/core/ButtonBase";

export interface ButtonProps {
  className?: string;
  onClick?: () => void;
  circle?: boolean;
  link?: string;
  id?: string;
  children: React.ReactNode;
}

function Button({
  className,
  circle,
  link,
  id,
  children,
  onClick,
}: ButtonProps) {
  const buttonClass = classNames(
    "button",
    {
      "button--circle": circle,
    },
    className
  );

  if (link) {
    return (
      <ButtonBase
        data-testid={id}
        data-atom-button
        component="a"
        href={link}
        className={buttonClass}
        onClick={onClick}
      >
        {children}
      </ButtonBase>
    );
  }

  return (
    <ButtonBase
      data-testid={id}
      data-atom-button
      component="a"
      role="button"
      className={buttonClass}
      onClick={onClick}
    >
      {children}
    </ButtonBase>
  );
}

export default Button;
