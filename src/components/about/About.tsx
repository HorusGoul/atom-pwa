import autobind from "autobind-decorator";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { i18n } from "../../Locale";
import LocaleSelector from "../locale-selector/LocaleSelector";
import Card from "../shared/card/Card";
import Navbar from "../shared/navbar/Navbar";
import ThemeSelector from "../theme-selector/ThemeSelector";
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

        <Card className="about__app-preferences">
          <div className="about__subtitle">{i18n("app_settings")}</div>

          <div className="about__app-preferences__buttons">
            <LocaleSelector />
            <ThemeSelector />
          </div>
        </Card>
      </div>
    );
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.goBack();
  }
}

export default withRouter<Props>(About);
