import * as React from "react";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ValencesTestSettings from "./ValencesTestSettings";

window.scrollTo = jest.fn();

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

  userEvent.click(screen.getByRole("button", { name: /deselect all/i }));

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  const hydrogenCheckbox = within(hydrogen).getByRole(
    "checkbox"
  ) as HTMLInputElement;
  const sodiumCheckbox = within(hydrogen).getByRole(
    "checkbox"
  ) as HTMLInputElement;

  expect(hydrogenCheckbox.checked).toBe(false);
  expect(sodiumCheckbox.checked).toBe(false);

  userEvent.click(screen.getByRole("button", { name: /^select all/i }));

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  expect(within(hydrogen).getByRole("checkbox")).toBeChecked();
  expect(within(sodium).getByRole("checkbox")).toBeChecked();

  userEvent.click(hydrogen);

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  expect(within(hydrogen).getByRole("checkbox")).not.toBeChecked();
  expect(within(sodium).getByRole("checkbox")).toBeChecked();

  userEvent.click(screen.getByRole("button", { name: /restore defaults/i }));

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  expect(within(hydrogen).getByRole("checkbox")).toBeChecked();
  expect(within(sodium).getByRole("checkbox")).toBeChecked();
});
