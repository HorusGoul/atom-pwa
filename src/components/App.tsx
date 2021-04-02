import * as React from "react";
import { Helmet } from "react-helmet";
import { Route, Switch } from "react-router-dom";
import { SpycatSetup } from "@/services/spycat";
import {
  ABOUT,
  HUB,
  MASS_CALCULATOR,
  PERIODIC_TABLE,
  TEST_PERIODIC_TABLE,
  TEST_PERIODIC_TABLE_SETTINGS,
  TEST_SELECTION,
  TEST_VALENCES,
  TEST_VALENCES_SETTINGS,
} from "../routes";
import { useLocale } from "@/hooks/useLocale";
import { useTheme } from "@/hooks/useTheme";
import About from "./about/About";
import "./App.scss";
import MassCalculator from "./mass-calculator/MassCalculator";
import NotFound from "./not-found/NotFound";
import PeriodicTablePage from "./periodic-table-page/PeriodicTablePage";
import PeriodicTableTest from "./periodic-table-test/PeriodicTableTest";
import PeriodicTableTestSettings from "./periodic-table-test/settings/PeriodicTableTestSettings";
import TestSelection from "./test-selection/TestSelection";
import ValencesTestSettings from "./valences-test/settings/ValencesTestSettings";
import ValencesTest from "./valences-test/ValencesTest";
import Hub from "./hub/Hub";
import SearchView from "./search-view";
import { ElementProvider } from "@/contexts/ElementContext";

function App() {
  const { lang, i18n } = useLocale();
  const { theme, primaryColor } = useTheme();

  React.useLayoutEffect(() => {
    document.body.className = "theme-" + theme;
  }, [theme]);

  return (
    <ElementProvider>
      <div className="app">
        <Helmet>
          <html lang={lang} />

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

          <title>{i18n("app_full_title")}</title>
        </Helmet>

        <div className="app__content">
          <Route path="/" component={SpycatSetup} />

          <Switch>
            <Route exact={true} path={HUB}>
              <SearchView />
              <Hub />
            </Route>
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
            <Route path={PERIODIC_TABLE} component={PeriodicTablePage} />
            <Route exact={true} path={ABOUT} component={About} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </ElementProvider>
  );
}

export default App;
