import * as React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./Button";
import userEvent from "@testing-library/user-event";

const onClickMock = jest.fn();

beforeEach(() => jest.clearAllMocks());
test("should render button component with circle", () => {
  render(<Button circle>Text</Button>);

  expect(
    screen.getByRole("button").classList.contains("button--circle")
  ).toBeTruthy();
});

test("should render button component with link", () => {
  render(
    <Button link="https://twitter.com/HorusGoul">
      <div>mock text</div>
    </Button>
  );
  expect(screen.getByText(/mock text/i)).toBeInTheDocument();
  expect(screen.getByText(/mock text/i).closest("a")).toHaveAttribute(
    "href",
    "https://twitter.com/HorusGoul"
  );
});

test("should invoke onClick", () => {
  render(
    <Button link="https://twitter.com/HorusGoul" onClick={onClickMock}>
      <div>mock text</div>
    </Button>
  );

  const linkButton = screen
    .getByText(/mock text/i)
    .closest("a") as HTMLAnchorElement;

  userEvent.click(linkButton);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});

test("should invoke onClick", () => {
  render(
    <Button link="https://twitter.com/HorusGoul">
      <div>mock text</div>
    </Button>
  );

  const linkButton = screen
    .getByText(/mock text/i)
    .closest("a") as HTMLAnchorElement;

  userEvent.click(linkButton);

  expect(onClickMock).toHaveBeenCalledTimes(0);
});
