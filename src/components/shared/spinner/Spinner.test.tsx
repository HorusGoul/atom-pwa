import * as React from "react";
import { screen } from "@testing-library/react";
import { render } from "@/test-utils";
import { Spinner } from "./Spinner";

test("It can render without className", () => {
  render(<Spinner />);
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toHaveAttribute("class", "spinner");
});
test("It can render with className", () => {
  render(<Spinner className={"MOCKCLASS"} />);
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toHaveAttribute(
    "class",
    "spinner MOCKCLASS"
  );
});
