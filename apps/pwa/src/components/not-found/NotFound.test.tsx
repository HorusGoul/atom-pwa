import * as React from "react";
import { screen } from "@testing-library/react";
import NotFound from "./NotFound";
import userEvent from "@testing-library/user-event";
import { LocationGetter, render } from "@/test-utils";
import { Location } from "react-router-dom";

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
      <LocationGetter onLocation={(location) => (testLocation = location)} />
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
