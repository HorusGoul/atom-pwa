import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ValencesTestSettings from "./ValencesTestSettings";

test("should render the valences test settings", async () => {
  const history = createMemoryHistory({
    initialEntries: ["/tests/periodic-table/settings"],
  });

  render(
    <Router history={history}>
      <ValencesTestSettings />
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
      <ValencesTestSettings />
    </Router>
  );

  const hydrogen = screen.getByRole("button", {
    name: /H 1. Hydrogen Hydrogen/i,
  });
  const sodium = screen.getByRole("button", {
    name: /Na 11. Sodium Alkali metals/i,
  });

  expect(within(hydrogen).getByRole("checkbox")).toBeChecked();
  expect(within(sodium).getByRole("checkbox")).toBeChecked();

  userEvent.click(screen.getByRole("button", { name: /deselect all/i }));

  expect(within(hydrogen).getByRole("checkbox")).not.toBeChecked();
  expect(within(sodium).getByRole("checkbox")).not.toBeChecked();

  userEvent.click(screen.getByRole("button", { name: /^select all/i }));

  expect(within(hydrogen).getByRole("checkbox")).toBeChecked();
  expect(within(sodium).getByRole("checkbox")).toBeChecked();

  userEvent.click(hydrogen);

  expect(within(hydrogen).getByRole("checkbox")).not.toBeChecked();
  expect(within(sodium).getByRole("checkbox")).toBeChecked();

  userEvent.click(screen.getByRole("button", { name: /restore defaults/i }));

  expect(within(hydrogen).getByRole("checkbox")).toBeChecked();
  expect(within(sodium).getByRole("checkbox")).toBeChecked();
});
