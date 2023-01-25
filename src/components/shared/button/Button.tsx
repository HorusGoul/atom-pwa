import classNames from "classnames";
import * as React from "react";
import "./Button.scss";

export interface ButtonProps {
  className?: string;
  onClick?: () => void;
  circle?: boolean;
  link?: string;
  id?: string;
  children?: React.ReactNode;
}

function Button({
  className,
  circle,
  link,
  id,
  children,
  onClick,
  ...props
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
      <a
        data-testid={id}
        data-atom-button
        href={link}
        className={buttonClass}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <div
      role="button"
      data-testid={id}
      data-atom-button
      className={buttonClass}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

export default Button;
