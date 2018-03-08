import * as React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.scss";
import MainMenu from "./main-menu/MainMenu";
import TestSelection from "./test-selection/TestSelection";
import ValencesTest from "./valences-test/ValencesTest";

import About from "./about/About";
import MassCalculator from "./mass-calculator/MassCalculator";
import PeriodicTablePage from "./periodic-table-page/PeriodicTablePage";
import PeriodicTableTest from "./periodic-table-test/PeriodicTableTest";
import PeriodicTableTestSettings from "./periodic-table-test/settings/PeriodicTableTestSettings";
import ValencesTestSettings from "./valences-test/settings/ValencesTestSettings";

class App extends React.Component<{}, {}> {
  public componentWillMount() {
    document.body.className = "theme-light";
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
}

export default App;
