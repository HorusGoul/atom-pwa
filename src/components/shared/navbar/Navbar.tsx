import classNames from "classnames";
import * as React from "react";
import IconButton from "../icon-button/IconButton";
import "./Navbar.scss";

interface NavbarProps {
  title?: string;
  onBackButtonClick?: () => void;
  className?: string;
}

function Navbar({ title, className, onBackButtonClick }: NavbarProps) {
  return (
    <nav className={classNames("navbar", className)}>
      {onBackButtonClick && (
        <IconButton
          className="navbar__back-button"
          iconName="arrow_back"
          id="navbar-back-button"
          onClick={onBackButtonClick}
        />
      )}
      {title && <div className="navbar__title">{title}</div>}
    </nav>
  );
}

export default Navbar;
