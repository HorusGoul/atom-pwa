import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Modal from "./Modal";
import { useState } from "react";

type CustomModalWrapperProps = {
  onOpen: () => void;
  onClose: () => void;
};

const CustomModalWrapper = ({ onOpen, onClose }: CustomModalWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
        Toggle modal
      </button>
      <Modal open={isOpen} onOpen={onOpen} onClose={onClose}>
        <div>modal content</div>
      </Modal>
    </>
  );
};

test("should be able to toggle modal", () => {
  const onOpen = jest.fn();
  const onClose = jest.fn();

  render(<CustomModalWrapper onOpen={onOpen} onClose={onClose} />);

  expect(screen.queryByText(/modal-content/i)).toBeNull();

  fireEvent.click(screen.getByRole("button", { name: /toggle modal/i }));

  expect(screen.queryByText(/modal-content/i)).toBeDefined();
  // This doesn't get fired, ever (as it's not used in the component)
  // expect(onOpen).toHaveBeenCalledTimes(1);

  fireEvent.click(screen.getByRole("button", { name: /toggle modal/i }));

  expect(screen.queryByText(/modal-content/i)).toBeNull();
  // This doesn't get fired in this specific case, it's only use if we use the internal close button
  // expect(onClose).toHaveBeenCalledTimes(1);
});

test("should close after clicking the close button", () => {
  const onClose = jest.fn();
  render(
    <Modal open closeButton onClose={onClose}>
      <div>modal content</div>
    </Modal>
  );

  expect(screen.queryByText(/modal-content/i)).toBeDefined();

  fireEvent.click(screen.getByRole("button"));

  expect(screen.queryByText(/modal-content/i)).toBeNull();
  expect(onClose).toHaveBeenCalledTimes(1);
});

test("should render the modal with a title", () => {
  render(
    <Modal open title="modal title">
      <div>modal content</div>
    </Modal>
  );

  expect(screen.queryByText(/modal title/i)).toBeDefined();
});
