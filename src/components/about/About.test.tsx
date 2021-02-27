import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import About from "./About";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("should render component", () => {
  const history = createMemoryHistory({
    initialEntries: ["/about"],
  });
  render(
    <Router history={history}>
      <About />
    </Router>
  );

  expect(screen.getByText(/about/i)).toBeInTheDocument();
  expect(screen.getByText(/app settings/i)).toBeInTheDocument();
  expect(screen.getByText(/change language/i)).toBeInTheDocument();
  expect(screen.getByText(/change theme/i)).toBeInTheDocument();
  expect(screen.getByText(/contact me/i)).toBeInTheDocument();
  expect(screen.getByText(/source code/i)).toBeInTheDocument();
  expect(screen.getByText(/report bug/i)).toBeInTheDocument();
});

test("should validate contact me link", () => {
  const history = createMemoryHistory({
    initialEntries: ["/about"],
  });
  render(
    <Router history={history}>
      <About />
    </Router>
  );

  expect(screen.getByText(/contact me/i).closest("a")).toHaveAttribute(
    "href",
    "https://twitter.com/HorusGoul"
  );
});

test("should validate source code link", () => {
  const history = createMemoryHistory({
    initialEntries: ["/about"],
  });
  render(
    <Router history={history}>
      <About />
    </Router>
  );

  expect(screen.getByText(/source code/i).closest("a")).toHaveAttribute(
    "href",
    "https://github.com/HorusGoul/atom-pwa"
  );
});

test("should validate Report bug link", () => {
  const history = createMemoryHistory({
    initialEntries: ["/about"],
  });
  render(
    <Router history={history}>
      <About />
    </Router>
  );

  expect(screen.getByText(/report bug/i).closest("a")).toHaveAttribute(
    "href",
    "mailto:horusgoul@gmail.com"
  );
});

test("should invoke onNavbarBackButtonClick", () => {
  const history = createMemoryHistory({
    initialEntries: ["/about"],
  });
  history.action = "PUSH";
  const { container } = render(
    <Router history={history}>
      <About />
    </Router>
  );

  const navButton = container.querySelector(
    ".navbar__back-button"
  ) as HTMLAnchorElement;

  userEvent.click(navButton);
  expect(history.location.pathname).toBe("/");
});
