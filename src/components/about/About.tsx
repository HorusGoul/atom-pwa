import * as React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@/Locale";
import { MAIN_MENU } from "@/routes";
import LocaleSelector from "@/components/locale-selector/LocaleSelector";
import Card from "@/components/shared/card/Card";
import IconButton from "@/components/shared/icon-button/IconButton";
import Navbar from "@/components/shared/navbar/Navbar";
import ThemeSelector from "@/components/theme-selector/ThemeSelector";
import "./About.scss";

function About() {
  const history = useHistory();

  const onNavbarBackButtonClick = React.useCallback(
    () => history.push(MAIN_MENU),
    [history]
  );
  return (
    <div className="about">
      <Navbar
        className="about__navbar"
        title={i18n("nav_about")}
        onBackButtonClick={onNavbarBackButtonClick}
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

export default About;
