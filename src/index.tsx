/// <reference types="node" />

import "./NativeBridge";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { BrowserRouter, Route } from "react-router-dom";

import "normalize.css";
import "./main.scss";

import "hammerjs";

import AppSettings from "./AppSettings";
AppSettings.loadSettings();

import Theme from "./Theme";
Theme.setTheme(AppSettings.settings.theme);

import { initSentry } from "@/services/sentry";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

initSentry();

ReactDOM.render(
  <BrowserRouter basename="/">
    <Route path="/" component={App} />
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();

let preview = false;

window.addEventListener("message", (event) => {
  const data = event.data;

  if (data === "enable-preview") {
    preview = true;
  }
});

window.addEventListener("click", () => {
  if (preview) {
    window.parent.postMessage("click", "*");
  }
});
