import * as React from "react";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PeriodicTablePage from "./PeriodicTablePage";
import "hammerjs";
import { render } from "@/test-utils";

test("should render periodic table and able to see details of element", async () => {
  render(<PeriodicTablePage />, {
    initialHistoryEntries: ["/periodic-table"],
  });

  await waitForElementToBeRemoved(
    () => screen.queryAllByLabelText(/loading/i),
    { timeout: 4000 }
  );

  userEvent.click(screen.getByRole("button", { name: "1 H Hydrogen" }));

  // Verifiying Atomic radius of Hydrogen
  expect(screen.getByText(/atomic radius/i)).toBeInTheDocument();
  expect(screen.getByText(/53 pm/i)).toBeInTheDocument();

  // Closing element details
  userEvent.click(screen.getByTestId("overlay"));
  expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
});

test("should be able to navigate back to main menu", () => {
  const { route } = render(<PeriodicTablePage />, {
    initialHistoryEntries: ["/periodic-table"],
  });

  userEvent.click(screen.getByTestId("navbar-back-button"));
  expect(route.location.pathname).toBe("/");
});
