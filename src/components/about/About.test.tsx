import * as React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import About from "./About";
import { Location } from "history";
import cases from "jest-in-case";
import { render } from "@/test-utils";
import { Route } from "react-router-dom";

cases(
  "should verify links",
  ({ linkItem }) => {
    render(<About />, {
      initialHistoryEntries: ["/about"],
    });

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
  render(<About />, {
    initialHistoryEntries: ["/about"],
  });

  expect(screen.getByText(/contact me/i).closest("a")).toHaveAttribute(
    "href",
    "https://twitter.com/HorusGoul"
  );
});

test("should validate source code link", () => {
  render(<About />, {
    initialHistoryEntries: ["/about"],
  });

  expect(screen.getByText(/source code/i).closest("a")).toHaveAttribute(
    "href",
    "https://github.com/HorusGoul/atom-pwa"
  );
});

test("should validate Report bug link", () => {
  render(<About />, {
    initialHistoryEntries: ["/about"],
  });

  expect(screen.getByText(/report bug/i).closest("a")).toHaveAttribute(
    "href",
    "mailto:horusgoul@gmail.com"
  );
});

test("should invoke onNavbarBackButtonClick", () => {
  let testLocation: Location;

  const { container } = render(
    <>
      <About />

      <Route
        path="/"
        render={({ location }) => {
          testLocation = location;
          return null;
        }}
      />
    </>,
    {
      initialHistoryEntries: ["/about"],
    }
  );

  const navButton = container.querySelector(
    ".navbar__back-button"
  ) as HTMLAnchorElement;

  userEvent.click(navButton);
  expect(testLocation!.pathname).toBe("/");
});
