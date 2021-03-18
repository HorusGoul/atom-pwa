import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocaleSelector from "./LocaleSelector";
import { Settings } from "@/AppSettings";

beforeEach(() => {
  window.localStorage.clear();
});

test("should be able to change locale", () => {
  const STORAGE_KEY = "atom:settings";
  render(<LocaleSelector />);

  expect(screen.getByText(/change language/i)).toBeInTheDocument();

  userEvent.click(screen.getByRole("button"));

  userEvent.click(
    screen.getByRole("button", {
      name: /español/i,
    })
  );

  const settings = JSON.parse(
    window.localStorage.getItem(STORAGE_KEY) as string
  );

  expect(settings.locale).toBe("es");

  expect(screen.getByText(/cambiar idioma/i)).toBeInTheDocument();
  expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
});
