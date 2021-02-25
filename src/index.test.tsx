import * as React from "react";
import { render } from "@testing-library/react";
import App from "./components/App";
import { BrowserRouter, Route } from "react-router-dom";

test("It can render without crashing", () => {
  render(
    <BrowserRouter basename="/">
      <Route path="/" component={App} />
    </BrowserRouter>
  );
});
