import * as React from "react";
import { screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PeriodicTableTestSettings from "./PeriodicTableTestSettings";
import { render } from "@/test-utils";

window.scrollTo = jest.fn();

test("should render the periodic table test settings", async () => {
  render(<PeriodicTableTestSettings />);

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
  render(<PeriodicTableTestSettings />);

  const hydrogen = screen.getByRole("button", {
    name: /H 1. Hydrogen Hydrogen/i,
  });
  const neon = screen.getByRole("button", { name: /Ne 10. Neon Noble gases/i });

  expect(within(hydrogen).getByRole("checkbox")).toBeChecked();
  expect(within(neon).getByRole("checkbox")).toBeChecked();

  userEvent.click(screen.getByRole("button", { name: /deselect all/i }));

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  expect(within(hydrogen).getByRole("checkbox")).not.toBeChecked();
  expect(within(neon).getByRole("checkbox")).not.toBeChecked();

  userEvent.click(screen.getByRole("button", { name: /^select all/i }));

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  expect(within(hydrogen).getByRole("checkbox")).toBeChecked();
  expect(within(neon).getByRole("checkbox")).toBeChecked();

  userEvent.click(hydrogen);

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  expect(within(hydrogen).getByRole("checkbox")).not.toBeChecked();
  expect(within(neon).getByRole("checkbox")).toBeChecked();

  userEvent.click(screen.getByRole("button", { name: /restore defaults/i }));

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  expect(within(hydrogen).getByRole("checkbox")).toBeChecked();
  expect(within(neon).getByRole("checkbox")).toBeChecked();
});
