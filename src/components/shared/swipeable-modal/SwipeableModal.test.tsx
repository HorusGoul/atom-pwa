import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "hammerjs";

import SwipeableModal from "./SwipeableModal";

test("Should render depends on open prop ", async () => {
  const { rerender } = render(
    <SwipeableModal open={true}>Some content</SwipeableModal>
  );
  expect(screen.getByRole("dialog")).toBeInTheDocument();

  rerender(<SwipeableModal open={false}>some content</SwipeableModal>);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("Should call onClose when swipe modal", async () => {
  const touchstart = {
    bubbles: true,
    clientX: 0,
    clientY: 0,
  };
  const touchSwipe = {
    bubbles: true,
    clientX: 600,
    clientY: 0,
  };
  const onClose = jest.fn();

  render(
    <SwipeableModal open={true} onClose={onClose}>
      <button>Some content</button>
    </SwipeableModal>
  );
  const modal = screen.getByRole("dialog");
  expect(screen.getByRole("button")).toBeInTheDocument();

  fireEvent.mouseDown(modal, touchstart);
  fireEvent.mouseMove(modal, touchSwipe);
  fireEvent.mouseUp(modal, touchSwipe);

  await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
});
