import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import About from "./About";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import cases from "jest-in-case";

cases(
  "should verify links",
  ({ linkItem }) => {
    const history = createMemoryHistory({
      initialEntries: ["/about"],
    });

    render(
      <Router history={history}>
        <About />
      </Router>
    );

    expect(screen.getByText(linkItem)).toBeInTheDocument();
  },
  [
    {
      name: "about",
      linkItem: /about/i,
    },
    {
      name: "app settings",
      linkItem: /app settings/i,
    },
    {
      name: "change language",
      linkItem: /change language/i,
    },
    {
      name: "change theme",
      linkItem: /change theme/i,
    },
    {
      name: "contact me",
      linkItem: /contact me/i,
    },
    {
      name: "source code",
      linkItem: /source code/i,
    },
    {
      name: "report bug",
      linkItem: /report bug/i,
    },
  ]
);

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
