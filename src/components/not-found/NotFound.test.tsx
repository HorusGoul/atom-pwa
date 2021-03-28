import * as React from "react";
import { Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";

const history = createMemoryHistory({
  initialEntries: ["/not-found"],
});

test("should render NotFound page", () => {
  render(
    <Router history={history}>
      <NotFound />
    </Router>
  );

  expect(screen.getByText(/404/i)).toBeInTheDocument();

  expect(
    screen.getByRole("heading", {
      name: /The page you were looking for doesn't exist/i,
    })
  ).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();
});

test("should be able to navigate back to home", () => {
  const history = createMemoryHistory({
    initialEntries: ["/about"],
  });
  render(
    <Router history={history}>
      <NotFound />
    </Router>
  );

  userEvent.click(
    screen.getByRole("button", {
      name: /home/i,
    })
  );
  expect(history.location.pathname).toBe("/");
});
