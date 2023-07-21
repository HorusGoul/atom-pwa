import { useLocale } from "@/hooks/useLocale";
import classNames from "classnames";
import * as React from "react";
import IconButton from "@/components/shared/icon-button/IconButton";
import "./Navbar.scss";

interface NavbarProps {
  title?: string;
  onBackButtonClick?: () => void;
  className?: string;
  rightButton?: {
    label: string;
    iconName: string;
    onClick: () => void;
  };
}

function Navbar({
  title,
  className,
  onBackButtonClick,
  rightButton,
}: NavbarProps) {
  const { i18n } = useLocale();

  return (
    <nav className={classNames("navbar", className)}>
      {onBackButtonClick && (
        <IconButton
          className="navbar__back-button"
          iconName="arrow_back"
          id="navbar-back-button"
          onClick={onBackButtonClick}
          aria-label={i18n("Go back")}
        />
      )}
      {title && <div className="navbar__title">{title}</div>}

      {rightButton && (
        <IconButton
          className="navbar__right-button"
          iconName={rightButton.iconName}
          aria-label={rightButton.label}
          onClick={rightButton.onClick}
        />
      )}
    </nav>
  );
}

export default Navbar;
