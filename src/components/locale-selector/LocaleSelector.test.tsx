import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocaleSelector from "./LocaleSelector";
import { ISettings } from "@/AppSettings";

test("should render button to change locale", () => {
  render(<LocaleSelector />);
  expect(screen.getByText(/change language/i)).toBeInTheDocument();
});

test("should be able to change locale", () => {
  const STORAGE_KEY = "atom:settings";
  render(<LocaleSelector />);
  userEvent.click(screen.getByRole("button"));

  let storageObject = window.localStorage.getItem(STORAGE_KEY);
  if (storageObject) {
    const appSettings: ISettings = JSON.parse(storageObject);
    expect(appSettings.locale).toEqual("en-US");
  }

  userEvent.click(
    screen.getByRole("button", {
      name: /español/i,
    })
  );

  storageObject = window.localStorage.getItem(STORAGE_KEY);
  if (storageObject) {
    const appSettings: ISettings = JSON.parse(storageObject);
    expect(appSettings.locale).toEqual("es");
  }

  expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
});
