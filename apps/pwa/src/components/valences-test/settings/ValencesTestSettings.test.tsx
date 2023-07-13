import * as React from "react";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ValencesTestSettings from "./ValencesTestSettings";
import { render } from "@/test-utils";

window.scrollTo = (vi.fn() as unknown) as typeof window.scrollTo;

test("should render the valences test settings", async () => {
  render(<ValencesTestSettings />);

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
    screen.getByRole("checkbox", { name: /1\. Hydrogen/i })
  ).toBeInTheDocument();
});

test("selection buttons should work", async () => {
  render(<ValencesTestSettings />);

  await waitForElementToBeRemoved(
    () => screen.queryAllByLabelText(/loading/i),
    { timeout: 4000 }
  );

  const hydrogen = screen.getByRole("checkbox", {
    name: "1. Hydrogen",
  });
  const sodium = screen.getByRole("checkbox", {
    name: "11. Sodium",
  });

  userEvent.click(screen.getByRole("button", { name: /deselect all/i }));

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  expect(hydrogen).not.toBeChecked();
  expect(sodium).not.toBeChecked();

  userEvent.click(screen.getByRole("button", { name: /^select all/i }));

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  expect(hydrogen).toBeChecked();
  expect(sodium).toBeChecked();

  userEvent.click(hydrogen);

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  expect(hydrogen).not.toBeChecked();
  expect(sodium).toBeChecked();

  userEvent.click(screen.getByRole("button", { name: /restore defaults/i }));

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  expect(hydrogen).toBeChecked();
  expect(sodium).toBeChecked();
});
