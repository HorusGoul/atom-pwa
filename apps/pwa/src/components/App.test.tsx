import * as React from "react";
import App from "./App";
import { Route, Routes } from "react-router-dom";
import { render } from "@/test-utils";

test("It can render without crashing", () => {
  render(
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>,
    {
      initialHistoryEntries: ["/"],
    }
  );
});
