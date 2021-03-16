import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocaleSelector from "./LocaleSelector";
import { Settings } from "@/AppSettings";

test("should be able to change locale", () => {
  const STORAGE_KEY = "atom:settings";
  render(<LocaleSelector />);

  expect(screen.getByText(/change language/i)).toBeInTheDocument();

  userEvent.click(screen.getByRole("button"));

  let storageObject = window.localStorage.getItem(STORAGE_KEY) as string;

  let appSettings: Settings = JSON.parse(storageObject);

  expect(appSettings.locale).toEqual("en-US");

  userEvent.click(
    screen.getByRole("button", {
      name: /español/i,
    })
  );

  storageObject = window.localStorage.getItem(STORAGE_KEY) as string;

  appSettings = JSON.parse(storageObject);

  expect(appSettings.locale).toEqual("es");

  expect(screen.getByText(/cambiar idioma/i)).toBeInTheDocument();
  expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
});
