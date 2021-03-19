import * as React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "hammerjs";

import PeriodicTableTest from "./PeriodicTableTest";
import { STORAGE_KEY, defaultSettings } from "@/hooks/useSettings";
import { TEST_SELECTION } from "@/routes";

jest.setTimeout(20000);
// Mocking shuffle so the order of the elements is always the same
jest.mock("../../utils/shuffle", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shuffle: (a: any) => a,
}));
jest.mock("../../utils/shuffle", () => ({
  shuffle: (a: unknown) => a,
}));

beforeEach(() => {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...defaultSettings,
      tests: {
        periodicTable: {
          elements: [
            {
              atomic: 1,
              enabled: true,
              stats: {
                times: 0,
                right: 0,
                wrong: 0,
              },
            },
            {
              atomic: 2,
              enabled: true,
              stats: {
                times: 0,
                right: 0,
                wrong: 0,
              },
            },
          ],
        },
      },
    })
  );
});

afterEach(() => {
  window.localStorage.clear();
});

test("should render the periodic table test", async () => {
  const history = createMemoryHistory({
    initialEntries: ["/tests/periodic-table"],
  });

  render(
    <Router history={history}>
      <PeriodicTableTest />
    </Router>
  );

  await waitForElementToBeRemoved(
    () => screen.queryAllByLabelText(/loading/i),
    { timeout: 4000 }
  );

  // Expect to display the first element as dialog
  const modal = screen.getByRole("dialog", { name: /complete the table/i });
  expect(modal).toBeInTheDocument();

  expect(within(modal).getByText(/H$/i)).toBeInTheDocument();
});

test("should show results correct answers", async () => {
  const history = createMemoryHistory({
    initialEntries: ["/tests/periodic-table"],
  });

  render(
    <Router history={history}>
      <PeriodicTableTest />
    </Router>
  );

  await waitForElementToBeRemoved(
    () => screen.queryAllByLabelText(/loading/i),
    { timeout: 4000 }
  );

  // Close the dialog by clicking overlay
  userEvent.click(screen.getByTestId("overlay"));

  // Place Hydrogen to correct position
  userEvent.click(screen.getByRole("button", { name: /1 \? \?\?\?/i }));

  // Place Helium to correct position
  userEvent.click(screen.getByRole("button", { name: /2 \? \?\?\?/i }));

  expect(screen.getByText(/test results/i)).toBeInTheDocument();
  // Test results will have a 2/2 text but it's divided into span-elements and can't be queried with a single query
  expect(screen.getAllByText(/2/i)).toHaveLength(2);

  expect(
    screen.queryByRole("button", { name: /retake incorrect answers/i })
  ).not.toBeInTheDocument();

  // Reseting tests
  userEvent.click(screen.getByRole("button", { name: /retake full test/i }));

  // test that that all the answers are reset
  expect(
    await screen.findByRole("button", { name: /1 \? \?\?\?/i })
  ).toBeInTheDocument();
  expect(
    await screen.findByRole("button", { name: /2 \? \?\?\?/i })
  ).toBeInTheDocument();
});

test("should show correct results with incorrect answers", async () => {
  const history = createMemoryHistory({
    initialEntries: ["/tests/periodic-table"],
  });

  render(
    <Router history={history}>
      <PeriodicTableTest />
    </Router>
  );

  await waitForElementToBeRemoved(
    () => screen.queryAllByLabelText(/loading/i),
    { timeout: 4000 }
  );

  // Close the dialog by clicking overlay
  userEvent.click(screen.getByTestId("overlay"));

  // Place Hydrogen to incorrect position
  userEvent.click(screen.getByRole("button", { name: /2 \? \?\?\?/i }));

  // Place Hydrogen to correct position
  userEvent.click(screen.getByRole("button", { name: /1 \? \?\?\?/i }));

  // Place Helium to correct position
  userEvent.click(screen.getByRole("button", { name: /2 \? \?\?\?/i }));

  expect(screen.getByText(/test results/i)).toBeInTheDocument();
  // Test results will have a 1/2 text but it's divided into span-elements and can't be queried with a single query
  expect(screen.getAllByText(/1/i)).toHaveLength(1);
  expect(screen.getAllByText(/2/i)).toHaveLength(1);

  expect(
    screen.getByRole("button", { name: /retake full test/i })
  ).toBeInTheDocument();

  // Reseting wrong tests
  userEvent.click(
    screen.getByRole("button", { name: /retake incorrect answers/i })
  );

  // test that only wrong answers are reset
  expect(
    await screen.findByRole("button", { name: /1 \? \?\?\?/i })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /2 \? \?\?\?/i })
  ).not.toBeInTheDocument();
});

test("should show question modal", async () => {
  const history = createMemoryHistory({
    initialEntries: ["/tests/periodic-table"],
  });

  const { container } = render(
    <Router history={history}>
      <PeriodicTableTest />
    </Router>
  );

  await waitForElementToBeRemoved(
    () => screen.queryAllByLabelText(/loading/i),
    { timeout: 4000 }
  );

  // Close the dialog by clicking overlay
  userEvent.click(screen.getByTestId("overlay"));

  // Open dialog by clicking on the question button
  userEvent.click(
    container.querySelector(
      ".periodic-table-test__current-question__button"
    ) as HTMLElement
  );
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

test("should go back to tests", () => {
  const history = createMemoryHistory({
    initialEntries: ["/tests/periodic-table"],
  });
  const { container } = render(
    <Router history={history}>
      <PeriodicTableTest />
    </Router>
  );

  const backLink = container.querySelector(
    ".navbar__back-button"
  ) as HTMLElement;

  userEvent.click(backLink);
  expect(history.location.pathname).toBe(TEST_SELECTION);
});
