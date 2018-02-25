import autobind from "autobind-decorator";
import classNames = require("classnames");
import * as React from "react";

import IconButton from "../icon-button/IconButton";

import "./Navbar.scss";

interface INavbarProps {
  backButton?: boolean;
  title?: string;
  onBackButtonClick?: () => void;
  className?: string;
}

@autobind
class Navbar extends React.Component<INavbarProps, {}> {
  public render() {
    const { backButton, title, className } = this.props;

    return (
      <div className={classNames("navbar", className)}>
        {backButton && (
          <IconButton
            className="navbar__back-button"
            iconName="arrow_back"
            onClick={this.onBackButtonClick}
          />
        )}
        {title && <div className="navbar__title">{title}</div>}
      </div>
    );
  }

  private onBackButtonClick() {
    if (this.props.onBackButtonClick) {
      this.props.onBackButtonClick();
    }
  }
}

export default Navbar;
