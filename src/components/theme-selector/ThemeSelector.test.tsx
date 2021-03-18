import * as React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { STORAGE_KEY } from "@/hooks/useAppSettings";
import ThemeSelector from "./ThemeSelector";

afterEach(() => {
  window.localStorage.clear();
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

  const settings = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");

  expect(settings).toEqual(expect.objectContaining({ theme: "light" }));
});
