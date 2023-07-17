import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

let ATOM_ENV = process.env.ATOM_ENV ?? null;
let ATOM_BASE_URL = process.env.ATOM_BASE_URL ?? null;
let env: "production" | "next" | "local";

switch (ATOM_ENV) {
  case "production":
    env = "production";
    break;
  case "next":
    env = "next";
    break;
  case "local":
  default:
    env = "local";
}

const baseUrlByEnv = {
  production: "https://atom.horuslugo.com",
  next: "https://next--atom-pt.netlify.app",
  local: "http://localhost:8888",
};

const baseUrl = ATOM_BASE_URL ?? baseUrlByEnv[env];

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: baseUrl,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
      grepInvert: [/@android/i, /@ios/i],
    },
    {
      name: "Desktop Safari",
      use: { ...devices["Desktop Safari"] },
      grepInvert: [/@android/i, /@ios/i],
    },

    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
      grepInvert: [/@ios/i, /@desktop/i],
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
      grepInvert: [/@android/i, /@desktop/i],
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer:
    ATOM_ENV === "local"
      ? {
          command: "pnpm --dir ../../apps/pwa dev",
          url: "http://127.0.0.1:8888",
          reuseExistingServer: !process.env.CI,
        }
      : undefined,
});
