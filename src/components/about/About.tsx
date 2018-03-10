import autobind from "autobind-decorator";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { i18n } from "../../Locale";
import { MAIN_MENU } from "../../routes";
import LocaleSelector from "../locale-selector/LocaleSelector";
import Card from "../shared/card/Card";
import IconButton from "../shared/icon-button/IconButton";
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

        <Card className="about__about">
          <div className="about__about__buttons">
            <IconButton
              link={i18n("contact_me_url")}
              iconName="at"
              text={i18n("contact_me")}
            />

            <IconButton
              link="https://github.com/HorusGoul/atom-pwa"
              iconName="source_branch"
              text={i18n("source_code")}
            />

            <IconButton
              link={`mailto:${i18n("author_email")}`}
              iconName="bug_report"
              text={i18n("bug_report")}
            />
          </div>
        </Card>
      </div>
    );
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.push(MAIN_MENU);
  }
}

export default withRouter<Props>(About);
