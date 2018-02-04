/// <reference types="node" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { BrowserRouter, Route } from "react-router-dom";

import "./main.scss";

import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

const render = (component: React.ComponentClass) => {
  ReactDOM.render(
    <BrowserRouter basename="/">
      <Route path="/" component={component} />
    </BrowserRouter>,
    document.getElementById("root")
  );
};

render(App);
registerServiceWorker();

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NewApp = require("./components/App").default;
    render(NewApp);
  });
}
