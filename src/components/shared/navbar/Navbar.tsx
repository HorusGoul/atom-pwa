import classNames from "classnames";
import * as React from "react";
import IconButton from "../icon-button/IconButton";
import "./Navbar.scss";

interface NavbarProps {
  backButton?: boolean;
  title?: string;
  onBackButtonClick?: () => void;
  className?: string;
}

function Navbar({
  backButton,
  title,
  className,
  onBackButtonClick,
}: NavbarProps) {
  return (
    <div className={classNames("navbar", className)}>
      {backButton && (
        <IconButton
          className="navbar__back-button"
          iconName="arrow_back"
          id="navbar-back-button"
          onClick={onBackButtonClick}
        />
      )}
      {title && <div className="navbar__title">{title}</div>}
    </div>
  );
}

export default Navbar;
