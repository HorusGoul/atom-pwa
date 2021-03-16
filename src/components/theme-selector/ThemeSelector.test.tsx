import * as React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeSelector from "./ThemeSelector";

import AppSettings from "@/AppSettings";
import Theme from "@/Theme";

jest.mock("../../AppSettings", () => ({
  settings: {
    theme: "dark",
  },
  save: jest.fn(),
}));

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

  Theme.setTheme = jest.fn();
  userEvent.click(screen.getByRole("button", { name: /light/i }));

  expect(AppSettings.settings.theme).toEqual("light");
  expect(AppSettings.save).toHaveBeenCalled();

  expect(Theme.setTheme).toHaveBeenCalled();
});
