import * as React from "react";
import { render } from "@testing-library/react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import App from "./App";

test("It can render without crashing", () => {
  const history = createMemoryHistory({
    initialEntries: ["/"],
  });
  render(
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  );
});
