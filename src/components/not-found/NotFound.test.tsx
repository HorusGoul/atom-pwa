import * as React from "react";
import { screen } from "@testing-library/react";
import NotFound from "./NotFound";
import userEvent from "@testing-library/user-event";
import { render } from "@/test-utils";
import { Location } from "history";
import { Route } from "react-router-dom";

test("should render NotFound page", () => {
  render(<NotFound />, {
    initialHistoryEntries: ["/not-found"],
  });

  expect(screen.getByText(/404/i)).toBeInTheDocument();

  expect(
    screen.getByRole("heading", {
      name: /The page you were looking for doesn't exist/i,
    })
  ).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();
});

test("should be able to navigate back to home", () => {
  let testLocation: Location;

  render(
    <>
      <NotFound />
      <Route
        path="/"
        render={({ location }) => {
          testLocation = location;
          return null;
        }}
      />
    </>,
    {
      initialHistoryEntries: ["/not-found"],
    }
  );

  userEvent.click(
    screen.getByRole("button", {
      name: /home/i,
    })
  );
  expect(testLocation!.pathname).toBe("/");
});
