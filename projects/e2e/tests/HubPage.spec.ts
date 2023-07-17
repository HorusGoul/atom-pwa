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
