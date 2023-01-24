import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import RateApp, { RateAppConfig } from "./RateApp";
import NativeBridge from "@/NativeBridge";
import userEvent from "@testing-library/user-event";
import "hammerjs";
import { clear, mockUserAgent } from "jest-useragent-mock";

const RATE_APP_STORAGE_KEY = "atom:rate_app";
const config: RateAppConfig = {
  timesLaunched: 4,
  rated: false,
};

beforeEach(() => {
  clear();
  window.localStorage.clear();
  window.localStorage.setItem(RATE_APP_STORAGE_KEY, JSON.stringify(config));
});

test("should render rate app button", () => {
  vi.spyOn(NativeBridge, "isHybrid").mockReturnValue(true);
  render(<RateApp />);

  expect(screen.getByText(/do you like this app\?/i)).toBeInTheDocument();
});

test("should open modal to provide rating", async () => {
  mockUserAgent("android");
  // Jest throwing error as it couldn't recognize window.open()
  global.open = vi.fn();
  vi.spyOn(NativeBridge, "isHybrid").mockReturnValue(true);
  render(<RateApp />);

  userEvent.click(screen.getByRole("button"));

  expect(screen.getByTestId("overlay")).toBeInTheDocument();

  expect(
    screen.getByText(
      /if you think this app is useful, please rate it at the store so others will find it and learn too\./i
    )
  ).toBeInTheDocument();

  userEvent.click(screen.getByText(/OK/i));

  expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  const storageObject = window.localStorage.getItem(RATE_APP_STORAGE_KEY);

  if (storageObject) {
    const configObject: RateAppConfig = JSON.parse(storageObject);
    console.log(configObject);
    expect(configObject.rated).toBeTruthy();
  }
  expect(global.open).toHaveBeenCalledTimes(1);
});

test("should close modal", () => {
  vi.spyOn(NativeBridge, "isHybrid").mockReturnValue(true);
  render(<RateApp />);

  userEvent.click(screen.getByRole("button"));

  expect(screen.getByTestId("overlay")).toBeInTheDocument();

  userEvent.click(screen.getAllByRole("button")[2]);

  expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
});

test("should close modal", () => {
  mockUserAgent("mock");
  vi.spyOn(NativeBridge, "isHybrid").mockReturnValue(true);
  render(<RateApp />);

  userEvent.click(screen.getByRole("button"));

  expect(screen.getByTestId("overlay")).toBeInTheDocument();

  userEvent.click(screen.getAllByRole("button")[3]);

  expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
  const storageObject = window.localStorage.getItem(RATE_APP_STORAGE_KEY);
  if (storageObject) {
    const configObject: RateAppConfig = JSON.parse(storageObject);
    expect(configObject.rated).toBeFalsy();
  }
});
