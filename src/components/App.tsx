import autobind from "autobind-decorator";
import * as React from "react";
import { Helmet } from "react-helmet";
import { Route, Switch } from "react-router-dom";
import { Analytics } from "../Analytics";
import Locale, { i18n } from "../Locale";
import {
  ABOUT,
  MAIN_MENU,
  MASS_CALCULATOR,
  PERIODIC_TABLE,
  TEST_PERIODIC_TABLE,
  TEST_PERIODIC_TABLE_SETTINGS,
  TEST_SELECTION,
  TEST_VALENCES,
  TEST_VALENCES_SETTINGS
} from "../routes";
import Theme from "../Theme";
import About from "./about/About";
import "./App.scss";
import MainMenu from "./main-menu/MainMenu";
import MassCalculator from "./mass-calculator/MassCalculator";
import PeriodicTablePage from "./periodic-table-page/PeriodicTablePage";
import PeriodicTableTest from "./periodic-table-test/PeriodicTableTest";
import PeriodicTableTestSettings from "./periodic-table-test/settings/PeriodicTableTestSettings";
import TestSelection from "./test-selection/TestSelection";
import ValencesTestSettings from "./valences-test/settings/ValencesTestSettings";
import ValencesTest from "./valences-test/ValencesTest";

@autobind
class App extends React.Component<{}, {}> {
  public componentDidMount() {
    Locale.addLocaleChangeListener(this.reRenderApp);
    Theme.addThemeChangeListener(this.setThemeClass);
  }

  public componentWillUnmount() {
    Locale.removeLocaleChangeListener(this.reRenderApp);
    Theme.removeThemeChangeListener(this.setThemeClass);
  }

  public componentWillMount() {
    this.setThemeClass(Theme.getCurrentTheme());
  }

  public render() {
    const primaryColor = Theme.getPrimaryColor();

    return (
      <div className="app">
        <Helmet>
          <html lang={Locale.getCurrentLang()} />

          <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color={primaryColor}
          />
          <meta name="msapplication-TileColor" content={primaryColor} />
          <meta name="theme-color" content={primaryColor} />

          <meta name="description" content={i18n("app_description")} />

          <meta name="og:title" content={i18n("app_full_title")} />
          <meta name="og:description" content={i18n("app_description")} />
          <meta name="twitter:site" content={i18n("twitter_account")} />
        </Helmet>

        <div className="app__content">
          <Route path="/" component={Analytics} />

          <Switch>
            <Route exact={true} path={MAIN_MENU} component={MainMenu} />
            <Route
              exact={true}
              path={TEST_SELECTION}
              component={TestSelection}
            />
            <Route exact={true} path={TEST_VALENCES} component={ValencesTest} />
            <Route
              exact={true}
              path={TEST_VALENCES_SETTINGS}
              component={ValencesTestSettings}
            />
            <Route
              exact={true}
              path={TEST_PERIODIC_TABLE}
              component={PeriodicTableTest}
            />
            <Route
              exact={true}
              path={TEST_PERIODIC_TABLE_SETTINGS}
              component={PeriodicTableTestSettings}
            />
            <Route
              exact={true}
              path={MASS_CALCULATOR}
              component={MassCalculator}
            />
            <Route
              exact={true}
              path={PERIODIC_TABLE}
              component={PeriodicTablePage}
            />
            <Route exact={true} path={ABOUT} component={About} />
          </Switch>
        </div>
      </div>
    );
  }

  private setThemeClass(theme: string) {
    document.body.className = "theme-" + theme;
    this.reRenderApp();
  }

  private reRenderApp() {
    this.forceUpdate();
  }
}

export default App;
