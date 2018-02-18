import * as React from "react";
import { Route, Switch } from "react-router-dom";

import MainMenu from "./main-menu/MainMenu";
import TestSelection from "./test-selection/TestSelection";
import ValencesTest from "./valences-test/ValencesTest";

import "./App.scss";
import MassCalculator from "./mass-calculator/MassCalculator";
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
              path="/mass-calculator"
              component={MassCalculator}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
