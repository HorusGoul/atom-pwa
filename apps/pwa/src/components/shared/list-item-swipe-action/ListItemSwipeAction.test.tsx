import * as React from "react";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import "hammerjs";

import ListItemSwipeAction from "./ListItemSwipeAction";

test("Should call onAction when swipe", async () => {
  const onAction = vi.fn();
  const touchstart = {
    bubbles: true,
    clientX: 0,
    clientY: 0,
  };
  const touchSwipe = {
    bubbles: true,
    clientX: 400,
    clientY: 0,
  };

  render(
    <ListItemSwipeAction
      frontContent={<button>front content</button>}
      onAction={onAction}
    />
  );

  const frontContent = screen.getByRole("button");
  expect(frontContent).toBeInTheDocument();

  fireEvent.mouseDown(frontContent, touchstart);
  fireEvent.mouseMove(frontContent, touchSwipe);
  fireEvent.mouseUp(frontContent, touchSwipe);

  await waitFor(() => expect(onAction).toHaveBeenCalledTimes(1));
});
