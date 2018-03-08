import autobind from "autobind-decorator";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Locale from "../Locale";
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
    return (
      <div className="app">
        <div className="app__content">
          <Switch>
            <Route exact={true} path="/" component={MainMenu} />
            <Route exact={true} path="/tests" component={TestSelection} />
            <Route
              exact={true}
              path="/tests/valences"
              component={ValencesTest}
            />
            <Route
              exact={true}
              path="/tests/valences/settings"
              component={ValencesTestSettings}
            />
            <Route
              exact={true}
              path="/tests/periodic-table"
              component={PeriodicTableTest}
            />
            <Route
              exact={true}
              path="/tests/periodic-table/settings"
              component={PeriodicTableTestSettings}
            />
            <Route
              exact={true}
              path="/mass-calculator"
              component={MassCalculator}
            />
            <Route
              exact={true}
              path="/periodic-table"
              component={PeriodicTablePage}
            />
            <Route exact={true} path="/about" component={About} />
          </Switch>
        </div>
      </div>
    );
  }

  private setThemeClass(theme: string) {
    document.body.className = "theme-" + theme;
  }

  private reRenderApp() {
    this.forceUpdate();
  }
}

export default App;
