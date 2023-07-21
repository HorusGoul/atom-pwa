import * as React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
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
} from "@/routes";
import { useLocale } from "@/hooks/useLocale";
import { useTheme } from "@/hooks/useTheme";
import About from "./about/About";
import "./App.scss";
import MassCalculator from "./mass-calculator/MassCalculator";
import NotFound from "./not-found/NotFound";
import PeriodicTablePage, {
  ElementInfoView,
} from "./periodic-table-page/PeriodicTablePage";
import PeriodicTableTest from "./periodic-table-test/PeriodicTableTest";
import PeriodicTableTestSettings from "./periodic-table-test/settings/PeriodicTableTestSettings";
import TestSelection from "./test-selection/TestSelection";
import ValencesTestSettings from "./valences-test/settings/ValencesTestSettings";
import ValencesTest from "./valences-test/ValencesTest";
import Hub from "./hub/Hub";
import SearchView from "./search-view";
import { ElementProvider } from "@/contexts/ElementContext";
import { createPack } from "react-component-pack";
import ConfirmProvider from "./shared/confirm";
import { ServiceWorkerProvider } from "@/contexts/ServiceWorkerContext";

const ProviderPack = createPack(
  (HelmetProvider as unknown) as React.FunctionComponent<{
    children: React.ReactNode;
  }>,
  ServiceWorkerProvider,
  ElementProvider,
  ConfirmProvider
);

function App() {
  const { lang, i18n } = useLocale();
  const { theme, primaryColor } = useTheme();

  React.useLayoutEffect(() => {
    document.body.className = "theme-" + theme;
  }, [theme]);

  return (
    <ProviderPack>
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
          <Routes>
            <Route
              path={HUB}
              element={
                <>
                  <SearchView />
                  <Hub />
                </>
              }
            />
            <Route path={TEST_SELECTION} element={<TestSelection />} />
            <Route path={TEST_VALENCES} element={<ValencesTest />} />
            <Route
              path={TEST_VALENCES_SETTINGS}
              element={<ValencesTestSettings />}
            />
            <Route path={TEST_PERIODIC_TABLE} element={<PeriodicTableTest />} />
            <Route
              path={TEST_PERIODIC_TABLE_SETTINGS}
              element={<PeriodicTableTestSettings />}
            />
            <Route path={MASS_CALCULATOR} element={<MassCalculator />} />
            <Route
              path={`${PERIODIC_TABLE}/*`}
              element={
                <>
                  <SearchView />
                  <PeriodicTablePage />
                </>
              }
            >
              <Route path={`:atomic`} element={<ElementInfoView />} />
            </Route>
            <Route path={ABOUT} element={<About />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </ProviderPack>
  );
}

export default App;
