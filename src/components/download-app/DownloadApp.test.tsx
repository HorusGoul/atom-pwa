import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import DownloadApp, { DownloadAppConfig } from "./DownloadApp";
import { flags } from "@/services/flags";
import userEvent from "@testing-library/user-event";
import "hammerjs";
import { clear, mockUserAgent } from "jest-useragent-mock";

const DOWNLOAD_APP_STORAGE_KEY = "atom:download_app";
const config: DownloadAppConfig = {
  timesLaunched: 4,
  downloaded: false,
};

beforeEach(() => {
  clear();
  window.localStorage.clear();
  window.localStorage.setItem(DOWNLOAD_APP_STORAGE_KEY, JSON.stringify(config));
});

test("should render download app button", () => {
  flags.showDownloadAppAndroid = true;

  render(<DownloadApp />);

  expect(screen.getByText(/download the official app\!/i)).toBeInTheDocument();
});

test("should open modal to download app", async () => {
  mockUserAgent("android");
  // Jest throwing error as it couldn't recognize window.open()
  global.open = jest.fn();
  flags.showDownloadAppAndroid = true;
  render(<DownloadApp />);

  userEvent.click(screen.getByRole("button"));

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1)));

  expect(global.open).toHaveBeenCalledTimes(1);
});
