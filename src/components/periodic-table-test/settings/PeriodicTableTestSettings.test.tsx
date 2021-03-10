import * as React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import PeriodicTableTestSettings from "./PeriodicTableTestSettings";

test("should render the periodic table test settings", async () => {
  const history = createMemoryHistory({
    initialEntries: ["/tests/periodic-table/settings"],
  });

  render(
    <Router history={history}>
      <PeriodicTableTestSettings />
    </Router>
  );

  expect(screen.getByText(/settings/i)).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /^select all/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /deselect all/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /restore defaults/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /H 1. Hydrogen Hydrogen/i })
  ).toBeInTheDocument();
});

test("selection buttons should work", async () => {
  const history = createMemoryHistory({
    initialEntries: ["/tests/periodic-table/settings"],
  });

  render(
    <Router history={history}>
      <PeriodicTableTestSettings />
    </Router>
  );

  const hydrogen = screen.getByRole("button", {
    name: /H 1. Hydrogen Hydrogen/i,
  });
  const neon = screen.getByRole("button", { name: /Ne 10. Neon Noble gases/i });

  expect(within(hydrogen).getByRole("checkbox")).toBeChecked();
  expect(within(neon).getByRole("checkbox")).toBeChecked();

  userEvent.click(screen.getByRole("button", { name: /deselect all/i }));

  expect(within(hydrogen).getByRole("checkbox")).not.toBeChecked();
  expect(within(neon).getByRole("checkbox")).not.toBeChecked();

  userEvent.click(screen.getByRole("button", { name: /^select all/i }));

  expect(within(hydrogen).getByRole("checkbox")).toBeChecked();
  expect(within(neon).getByRole("checkbox")).toBeChecked();

  userEvent.click(hydrogen);

  expect(within(hydrogen).getByRole("checkbox")).not.toBeChecked();
  expect(within(neon).getByRole("checkbox")).toBeChecked();

  userEvent.click(screen.getByRole("button", { name: /restore defaults/i }));

  expect(within(hydrogen).getByRole("checkbox")).toBeChecked();
  expect(within(neon).getByRole("checkbox")).toBeChecked();
});
