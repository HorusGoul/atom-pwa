import * as React from "react";
import cases from "jest-in-case";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import TestSelection from "./TestSelection";

test("should display the test entries", () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <TestSelection />
    </Router>
  );

  expect(screen.getByText(/Valences Test/i)).toBeInTheDocument();

  expect(screen.getByText(/ Periodic table/i)).toBeInTheDocument();
});

cases(
  "should navigate to pages",
  ({ itemIdx, expectedPath }) => {
    const history = createMemoryHistory({
      initialEntries: [
        "/tests/valences",
        "/tests/periodic-table",
        "/tests/valences/settings",
        "/tests/periodic-table/settings",
      ],
    });

    render(
      <Router history={history}>
        <TestSelection />
      </Router>
    );

    userEvent.click(screen.getAllByRole("button")[itemIdx]);

    expect(history.location.pathname).toBe(expectedPath);
  },
  [
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
  ]
);
