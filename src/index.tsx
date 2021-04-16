/// <reference types="node" />

import "./NativeBridge";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import "normalize.css";
import "./main.scss";

import "hammerjs";

import { initSentry } from "@/services/sentry";
import { loadFlags } from "@/services/flags";
import App from "./components/App";

loadFlags();
initSentry();

ReactDOM.render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

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
