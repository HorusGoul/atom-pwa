import * as React from "react";
import { screen } from "@testing-library/react";
import { render } from "@/test-utils";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import MainMenu from "./MainMenu";

test("should display title", () => {
  render(<MainMenu />);

  expect(screen.getByText(/atom/i)).toBeVisible();
});

test("should display logo", () => {
  const { container } = render(<MainMenu />);

  expect(container.querySelector("svg")).toBeInTheDocument();
});

test.each([
  {
    name: "tests",
    menuItem: /tests/i,
    expectedPath: "/tests",
  },
  {
    name: "periodic table",
    menuItem: /periodic table/i,
    expectedPath: "/periodic-table",
  },
  {
    name: "mass calculator",
    menuItem: /mass calculator/i,
    expectedPath: "/mass-calculator",
  },
  {
    name: "about",
    menuItem: /about/i,
    expectedPath: "/about",
  },
])("should navigate to pages", ({ menuItem, expectedPath }) => {
  const history = createMemoryHistory({
    initialEntries: ["/"],
  });

  render(
    <Router history={history}>
      <MainMenu />
    </Router>
  );

  userEvent.click(screen.getByText(menuItem));

  expect(history.location.pathname).toBe(expectedPath);
});
