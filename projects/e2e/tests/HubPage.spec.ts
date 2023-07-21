import { test } from "playwright-test-coverage";
import { HubPage } from "@/HubPage";

test("HubPage should have a title", async ({ page }) => {
  const hubPage = new HubPage(page);

  await hubPage.goto();
  await hubPage.titleIsVisible();
});

test("HubPage's theme toggle button works", async ({ page }) => {
  const hubPage = new HubPage(page);

  await hubPage.goto();
  await hubPage.switchToLightMode();
  await hubPage.switchToDarkMode();
});

test("HubPage's open settings button works", async ({ page }) => {
  const hubPage = new HubPage(page);

  await hubPage.goto();
  await hubPage.openSettings();
});

test("HubPage's open search button works", async ({ page }) => {
  const hubPage = new HubPage(page);

  await hubPage.goto();
  await hubPage.openSearch();
});

test("HubPage's open periodic table button works", async ({ page }) => {
  const hubPage = new HubPage(page);

  await hubPage.goto();
  await hubPage.openPeriodicTable();
});

test("HubPage's open mass calculator button works", async ({ page }) => {
  const hubPage = new HubPage(page);

  await hubPage.goto();
  await hubPage.openMassCalculator();
});

test("HubPage's open unit converter button works", async ({ page }) => {
  const hubPage = new HubPage(page);

  await hubPage.goto();
  await hubPage.openUnitConverter();
});

test("HubPage's open quizzes button works", async ({ page }) => {
  const hubPage = new HubPage(page);

  await hubPage.goto();
  await hubPage.openQuizzes();
});

test("HubPage's open resources button works", async ({ page }) => {
  const hubPage = new HubPage(page);

  await hubPage.goto();
  await hubPage.openResources();
});

test.describe("@android", () => {
  test("HubPage's Rate App button works when cancelling", async ({ page }) => {
    const hubPage = new HubPage(page);

    await page.addInitScript(() => {
      // Mock the AtomNative bridge
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore -- TODO: Extract AtomNative interface to a common package
      window.AtomNative = {
        getDebugMode: () => true,
        isHybrid: () => true,
        getSystemLanguage: () => "en",
        rateApp: () => null,
      };
    });

    await hubPage.goto();
    await hubPage.rateAppCancel();
  });

  test("HubPage's Rate App button works when clicking ok", async ({ page }) => {
    const hubPage = new HubPage(page);

    await page.addInitScript(() => {
      // Mock the AtomNative bridge
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore -- TODO: Extract AtomNative interface to a common package
      window.AtomNative = {
        getDebugMode: () => true,
        isHybrid: () => true,
        getSystemLanguage: () => "en",
        rateApp: () => null,
      };
    });

    await hubPage.goto();
    await hubPage.rateAppOk();
  });

  test("HubPage's Download app button works", async ({ page }) => {
    const hubPage = new HubPage(page);

    await page.route("/api/flags", (route) =>
      route.fulfill({
        json: {
          showDownloadAppAndroid: true,
        },
      })
    );

    await hubPage.goto();
    await hubPage.downloadApp();
  });
});
