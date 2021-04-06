import * as React from "react";
import App from "./App";
import { Route } from "react-router-dom";
import { render } from "@/test-utils";

test("It can render without crashing", () => {
  render(<Route path="/" component={App} />, {
    initialHistoryEntries: ["/"],
  });
});
