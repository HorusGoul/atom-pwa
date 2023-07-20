import "./polyfills";
import "./NativeBridge";

import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "normalize.css";
import "./main.scss";

import "hammerjs";

import { initSentry } from "@/services/sentry";
import { loadFlags } from "@/services/flags";
import App from "./components/App";
import invariant from "invariant";

loadFlags();
initSentry();

const rootElement = document.getElementById("root");

invariant(rootElement, "Root element not found");

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter basename="/" future={{ v7_startTransition: true }}>
    <App />
  </BrowserRouter>
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
