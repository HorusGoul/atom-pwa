import * as React from "react";
import { Route, Switch } from "react-router-dom";
import MainMenu from "./main-menu/MainMenu";

import "./App.scss";

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="app theme-light">
        <div className="app__content">
          <Switch>
            <Route exact={true} path="/" component={MainMenu} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
