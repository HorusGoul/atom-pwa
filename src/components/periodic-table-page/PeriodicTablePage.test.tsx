import * as React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PeriodicTablePage from "./PeriodicTablePage";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "hammerjs";

test("should render periodic table and able to see details of element", async () => {
  const history = createMemoryHistory({
    initialEntries: ["/periodic-table"],
  });
  render(
    <Router history={history}>
      <PeriodicTablePage />
    </Router>
  );

  await waitForElementToBeRemoved(
    () => screen.queryAllByLabelText(/loading/i),
    { timeout: 4000 }
  );

  userEvent.click(screen.getAllByRole("button")[1]);

  // Verifiying Atomic radius of Hydrogen
  expect(screen.getByText(/atomic radius/i)).toBeInTheDocument();
  expect(screen.getByText(/53 pm/i)).toBeInTheDocument();

  // Closing element details
  userEvent.click(screen.getByTestId("overlay"));
  expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
});

test("should be able to navigate back to main menu", () => {
  const history = createMemoryHistory({
    initialEntries: ["/periodic-table"],
  });
  render(
    <Router history={history}>
      <PeriodicTablePage />
    </Router>
  );

  userEvent.click(screen.getByRole("button"));
  expect(history.location.pathname).toBe("/");
});
