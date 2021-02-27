import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";

test("should render NotFound page", () => {
  render(<NotFound />, { wrapper: Router });

  expect(screen.getByText(/404/i)).toBeInTheDocument();

  expect(
    screen.getByRole("heading", {
      name: /The page you were looking for doesn't exist/i,
    })
  ).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();
});
