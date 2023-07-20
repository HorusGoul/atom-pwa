import * as React from "react";
import { screen } from "@testing-library/react";
import { render } from "@/test-utils";
import userEvent from "@testing-library/user-event";
import TestSelection from "./TestSelection";

test("should display the test entries", () => {
  render(<TestSelection />);

  expect(screen.getByText(/Valences Test/i)).toBeInTheDocument();

  expect(screen.getByText(/ Periodic table/i)).toBeInTheDocument();
});

test.each([
  {
    name: "home page",
    itemIdx: 0,
    expectedPath: "/",
  },
  {
    name: "valences settings",
    itemIdx: 1,
    expectedPath: "/tests/valences/settings",
  },
  {
    name: "valences practice",
    itemIdx: 2,
    expectedPath: "/tests/valences",
  },
  {
    name: "periodic table settings",
    itemIdx: 3,
    expectedPath: "/tests/periodic-table/settings",
  },
  {
    name: "periodic table practice",
    itemIdx: 4,
    expectedPath: "/tests/periodic-table",
  },
])("should navigate to pages", ({ itemIdx, expectedPath }) => {
  const { route } = render(
    <>
      <TestSelection />
    </>,
    {
      initialHistoryEntries: [
        "/tests/valences",
        "/tests/periodic-table",
        "/tests/valences/settings",
        "/tests/periodic-table/settings",
      ],
    }
  );

  userEvent.click(screen.getAllByRole("button")[itemIdx]);

  expect(route.location.pathname).toBe(expectedPath);
});
