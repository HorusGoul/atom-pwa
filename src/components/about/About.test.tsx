import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import About from "./About";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("should render component", () => {
  const history = createMemoryHistory({
    initialEntries: ["/about"],
  });
  const { container } = render(
    <Router history={history}>
      <About />
    </Router>
  );

  const iconButtons = container.querySelectorAll(".icon-button__text");

  expect(container.querySelector(".navbar__title")?.textContent).toEqual(
    "About"
  );
  expect(container.querySelector(".about__subtitle")?.textContent).toEqual(
    "App Settings"
  );
  expect(iconButtons[0]?.textContent).toEqual("Change language");
  expect(iconButtons[1]?.textContent).toEqual("Change Theme");
  expect(iconButtons[2]?.textContent).toEqual("Contact me");
  expect(iconButtons[3]?.textContent).toEqual("Source code");
  expect(iconButtons[4]?.textContent).toEqual("Report bug");
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

  expect(screen.getByText("Contact me").closest("a")).toHaveAttribute(
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

  expect(screen.getByText("Source code").closest("a")).toHaveAttribute(
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

  expect(screen.getByText("Report bug").closest("a")).toHaveAttribute(
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

  fireEvent.click(navButton);
  expect(history.location.pathname).toBe("/");
});
