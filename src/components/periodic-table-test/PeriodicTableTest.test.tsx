import * as React from "react";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "hammerjs";
import { STORAGE_KEY, defaultSettings } from "@/hooks/useSettings";
import { TEST_SELECTION } from "@/routes";
import PeriodicTableTest from "./PeriodicTableTest";
import { render } from "@/test-utils";

// Mocking shuffle so the order of the elements is always the same
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
  render(<PeriodicTableTest />);

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
  const { container } = render(<PeriodicTableTest />);

  await waitForElementToBeRemoved(
    () => screen.queryAllByLabelText(/loading/i),
    { timeout: 4000 }
  );

  // Close the dialog by clicking overlay
  userEvent.click(screen.getByTestId("overlay"));

  // To improve test performance limit selection to the first row of the periodic table
  let firstRow = container.querySelector<HTMLDivElement>(
    ".periodic-table > .periodic-table__row:nth-child(2)"
  );

  if (!firstRow) {
    throw Error("Expected row did not render");
  }

  // Place Hydrogen to correct position
  userEvent.click(
    within(firstRow).getByRole("button", { name: /1 \? \?\?\?/i })
  );

  // Place Helium to correct position
  userEvent.click(
    within(firstRow).getByRole("button", { name: /2 \? \?\?\?/i })
  );

  expect(screen.getByText(/test results/i)).toBeInTheDocument();
  // Test results will have a 2/2 text but it's divided into span-elements and can't be queried with a single query
  expect(screen.getAllByText(/2/i)).toHaveLength(2);

  expect(
    screen.queryByRole("button", { name: /retake incorrect answers/i })
  ).not.toBeInTheDocument();

  // Reseting tests
  userEvent.click(screen.getByRole("button", { name: /retake full test/i }));

  // Wait for periodic table to be displayed again
  await waitFor(() => {
    firstRow = container.querySelector<HTMLDivElement>(
      ".periodic-table > .periodic-table__row:nth-child(2)"
    );

    if (!firstRow) {
      throw Error("Expected row did not render");
    }
  });

  // test that that all the answers are reset
  expect(
    within(firstRow).getByRole("button", { name: /1 \? \?\?\?/i })
  ).toBeInTheDocument();
  expect(
    within(firstRow).getByRole("button", { name: /2 \? \?\?\?/i })
  ).toBeInTheDocument();
});

test("should show correct results with incorrect answers", async () => {
  const { container } = render(<PeriodicTableTest />);

  await waitForElementToBeRemoved(
    () => screen.queryAllByLabelText(/loading/i),
    { timeout: 4000 }
  );

  // Close the dialog by clicking overlay
  userEvent.click(screen.getByTestId("overlay"));

  // To improve test performance limit selection to the first row of the periodic table
  let firstRow = container.querySelector<HTMLDivElement>(
    ".periodic-table > .periodic-table__row:nth-child(2)"
  );

  if (!firstRow) {
    throw Error("Expected row did not render");
  }

  // Place Hydrogen to incorrect position
  userEvent.click(
    within(firstRow).getByRole("button", { name: /2 \? \?\?\?/i })
  );

  // Place Hydrogen to correct position
  userEvent.click(
    within(firstRow).getByRole("button", { name: /1 \? \?\?\?/i })
  );

  // Place Helium to correct position
  userEvent.click(
    within(firstRow).getByRole("button", { name: /2 \? \?\?\?/i })
  );

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

  // Wait for periodic table to be displayed again
  await waitFor(() => {
    firstRow = container.querySelector<HTMLDivElement>(
      ".periodic-table > .periodic-table__row:nth-child(2)"
    );

    if (!firstRow) {
      throw Error("Expected row did not render");
    }
  });

  // test that only wrong answers are reset
  expect(
    within(firstRow).getByRole("button", { name: /1 \? \?\?\?/i })
  ).toBeInTheDocument();
  expect(
    within(firstRow).queryByRole("button", { name: /2 \? \?\?\?/i })
  ).not.toBeInTheDocument();
});

test("should show question modal", async () => {
  const { container } = render(<PeriodicTableTest />);

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
  const { container, route } = render(<PeriodicTableTest />, {
    initialHistoryEntries: ["/tests/periodic-table"],
  });

  const backLink = container.querySelector(
    ".navbar__back-button"
  ) as HTMLElement;

  userEvent.click(backLink);
  expect(route.location.pathname).toBe(TEST_SELECTION);
});
