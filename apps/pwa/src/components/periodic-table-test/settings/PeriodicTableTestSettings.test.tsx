import * as React from "react";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PeriodicTableTestSettings from "./PeriodicTableTestSettings";
import { render } from "@/test-utils";

window.scrollTo = (vi.fn() as unknown) as typeof window.scrollTo;

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

  await waitForElementToBeRemoved(
    () => screen.queryAllByLabelText(/loading/i),
    { timeout: 4000 }
  );

  expect(
    screen.getByRole("checkbox", { name: "1. Hydrogen" })
  ).toBeInTheDocument();
});

test("selection buttons should work", async () => {
  render(<PeriodicTableTestSettings />);

  await waitForElementToBeRemoved(
    () => screen.queryAllByLabelText(/loading/i),
    { timeout: 4000 }
  );

  const hydrogen = screen.getByRole("checkbox", { name: "1. Hydrogen" });
  const neon = screen.getByRole("checkbox", { name: "10. Neon" });

  expect(hydrogen).toBeChecked();
  expect(neon).toBeChecked();

  userEvent.click(screen.getByRole("button", { name: /deselect all/i }));

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  expect(hydrogen).not.toBeChecked();
  expect(neon).not.toBeChecked();

  userEvent.click(screen.getByRole("button", { name: /^select all/i }));

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  expect(hydrogen).toBeChecked();
  expect(neon).toBeChecked();

  userEvent.click(hydrogen);

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  expect(hydrogen).not.toBeChecked();
  expect(neon).toBeChecked();

  userEvent.click(screen.getByRole("button", { name: /restore defaults/i }));

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  expect(hydrogen).toBeChecked();
  expect(neon).toBeChecked();
});
