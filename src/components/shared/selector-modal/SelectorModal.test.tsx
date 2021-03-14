import * as React from "react";
import { render, screen } from "@testing-library/react";
import SelectorModal, { SelectorModalOption } from "./SelectorModal";
import userEvent from "@testing-library/user-event";

const onOptionSelectedMock = jest.fn();

beforeEach(() => jest.clearAllMocks());

const options: SelectorModalOption[] = [
  {
    key: 0,
    text: "Hydrogen",
  },
  {
    key: 1,
    text: "Helium",
  },
];
test("should render Modal", () => {
  render(
    <SelectorModal
      options={options}
      onOptionSelected={onOptionSelectedMock}
      open
    />
  );

  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: /hydrogen/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: /helium/i,
    })
  ).toBeInTheDocument();
});

test("should invoke onOptionSelected", () => {
  render(
    <SelectorModal
      options={options}
      onOptionSelected={onOptionSelectedMock}
      open
    />
  );

  userEvent.click(
    screen.getByRole("button", {
      name: /hydrogen/i,
    })
  );

  expect(onOptionSelectedMock).toHaveBeenCalledTimes(1);
  expect(onOptionSelectedMock).toHaveBeenCalledWith(options[0]);
});

test("should not show dialog when not open", () => {
  render(
    <SelectorModal
      options={options}
      onOptionSelected={onOptionSelectedMock}
      open={false}
    />
  );

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
