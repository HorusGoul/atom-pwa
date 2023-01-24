import * as React from "react";
import { screen } from "@testing-library/react";
import { render } from "@/test-utils";
import userEvent from "@testing-library/user-event";
import Overlay from "./Overlay";

test("should fire a custom clickHandler", () => {
  const handleClick = vi.fn();

  render(<Overlay onClick={handleClick} />);

  userEvent.click(screen.getByTestId("overlay"));

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("should render with a custom opacity", () => {
  const { container } = render(<Overlay opacity={0.75} />);

  expect(container.querySelector(".overlay")).toHaveStyle({ opacity: 0.75 });
});
