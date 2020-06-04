/// <reference types="node" />

import "./polyfills";

import "./NativeBridge";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { BrowserRouter, Route } from "react-router-dom";

import "./main.scss";

import AppSettings from "./AppSettings";
AppSettings.loadSettings();

import Locale from "./Locale";
Locale.setLocale(AppSettings.settings.locale);

import Theme from "./Theme";
Theme.setTheme(AppSettings.settings.theme);

import ElementManager from "./ElementManager";
ElementManager.loadElements();

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

let preview = false;

window.postMessage("running", "*");

window.addEventListener("message", event => {
  const data = event.data;

  if (data === "enable-preview") {
    preview = true;
  }
});

window.addEventListener("click", () => {
  if (preview) {
    window.postMessage("click", "*");
  }
});
