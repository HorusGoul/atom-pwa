import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

test("should not render a title by default", () => {
  const { container } = render(<Navbar />);

  expect(container.querySelector(".navbar__title")).not.toBeInTheDocument();
});

test("should render a title", () => {
  render(<Navbar title="Custom title" />);

  expect(screen.queryByText(/Custom title/i)).toBeInTheDocument();
});

test("should not render a back button by default", () => {
  render(<Navbar />);

  expect(screen.queryByRole("button")).toBeNull();
});

test("should handle clicking the back button", () => {
  const onBackButtonClickMock = jest.fn();

  render(<Navbar onBackButtonClick={onBackButtonClickMock} />);

  userEvent.click(screen.getByRole("button"));

  expect(onBackButtonClickMock).toHaveBeenCalledTimes(1);
});

test("should apply custom classnames to the Navbar", () => {
  const { container } = render(<Navbar className="customClass" />);

  expect(container.querySelector(".customClass")).toBeInTheDocument();
});
