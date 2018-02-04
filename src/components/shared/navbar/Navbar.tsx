import autobind from "autobind-decorator";
import * as React from "react";

import IconButton from "../icon-button/IconButton";

import "./Navbar.scss";

interface INavbarProps {
  backButton?: boolean;
  title?: string;
  onBackButtonClick?: () => void;
}

@autobind
class Navbar extends React.Component<INavbarProps, {}> {
  public render() {
    const { backButton, title } = this.props;

    return (
      <div className="navbar">
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
