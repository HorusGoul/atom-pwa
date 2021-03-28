import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Overlay from "./Overlay";

test("should fire a custom clickHandler", () => {
  const handleClick = jest.fn();

  render(<Overlay onClick={handleClick} />);

  userEvent.click(screen.getByTestId("overlay"));

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("should render with a custom opacity", () => {
  const { container } = render(<Overlay opacity={0.75} />);

  expect(container.querySelector(".overlay")).toHaveStyle({ opacity: 0.75 });
});
