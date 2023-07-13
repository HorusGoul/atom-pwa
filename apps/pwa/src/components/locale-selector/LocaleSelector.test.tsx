import * as React from "react";
import { screen } from "@testing-library/react";
import { render, waitMs } from "@/test-utils";
import userEvent from "@testing-library/user-event";
import LocaleSelector from "./LocaleSelector";

beforeEach(() => {
  window.localStorage.clear();
});

test("should be able to change locale", async () => {
  const STORAGE_KEY = "atom:settings";
  render(<LocaleSelector />);

  expect(screen.getByText(/change language/i)).toBeInTheDocument();

  userEvent.click(screen.getByRole("button"));

  userEvent.click(
    screen.getByRole("button", {
      name: /español/i,
    })
  );

  await waitMs(1);

  const settings = JSON.parse(
    window.localStorage.getItem(STORAGE_KEY) as string
  );

  expect(settings.locale).toBe("es");

  expect(screen.getByText(/cambiar idioma/i)).toBeInTheDocument();
  expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
});
