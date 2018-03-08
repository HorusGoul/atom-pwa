import autobind from "autobind-decorator";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { i18n } from "../../Locale";
import LocaleSelector from "../locale-selector/LocaleSelector";
import Navbar from "../shared/navbar/Navbar";
import "./About.scss";

type Props = RouteComponentProps<any>;

@autobind
class About extends React.Component<Props, {}> {
  public render() {
    return (
      <div className="about">
        <Navbar
          className="about__navbar"
          title={i18n("nav_about")}
          backButton={true}
          onBackButtonClick={this.onNavbarBackButtonClick}
        />

        <LocaleSelector />
      </div>
    );
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.goBack();
  }
}

export default withRouter<Props>(About);
