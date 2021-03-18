import * as React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeSelector from "./ThemeSelector";

beforeEach(() => {
  jest.spyOn(window.localStorage.__proto__, "setItem").mockImplementation();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("should display a button for opening modal", () => {
  render(<ThemeSelector />);

  expect(
    screen.getByRole("button", { name: /change theme/i })
  ).toBeInTheDocument();
});

test("should open selector modal", () => {
  render(<ThemeSelector />);

  userEvent.click(screen.getByRole("button", { name: /change theme/i }));
  expect(
    screen.getByRole("dialog", { name: /change theme/i })
  ).toBeInTheDocument();
});

test("should display themes in modal", () => {
  render(<ThemeSelector />);

  userEvent.click(screen.getByRole("button", { name: /change theme/i }));

  expect(screen.getByRole("button", { name: /dark/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /light/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /black/i })).toBeInTheDocument();
});

test("should change theme", () => {
  render(<ThemeSelector />);

  userEvent.click(screen.getByRole("button", { name: /change theme/i }));
  userEvent.click(screen.getByRole("button", { name: /light/i }));

  expect(window.localStorage.setItem).toBeCalledWith(
    "atom:settings",
    expect.stringContaining('"theme":"light"')
  );
});
