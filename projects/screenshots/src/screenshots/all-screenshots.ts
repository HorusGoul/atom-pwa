import { PeriodicTableQuizPage } from "@/pages/PeriodicTableQuizPage";
import { screenshot } from "@/screenshot";

screenshot("periodic-table", async ({ page, takeScreenshot }) => {
  await page.goto("/periodic-table");

  await page.getByRole("button", { name: "1 H " }).waitFor({
    state: "visible",
  });

  await takeScreenshot();
});

screenshot("periodic-table-details", async ({ page, takeScreenshot }) => {
  await page.goto("/periodic-table/6");

  await page.getByRole("button", { name: "1 H " }).waitFor({
    state: "visible",
  });

  await page.getByTestId("overlay").waitFor({ state: "visible" });

  await takeScreenshot();
});

screenshot("mass-calculator", async ({ page, takeScreenshot }) => {
  await page.goto("/mass-calculator");

  await page.getByText("Ho", { exact: true }).waitFor({ state: "visible" });
  await page.waitForTimeout(1000);

  await takeScreenshot();
});

screenshot("search", async ({ page, takeScreenshot }) => {
  await page.goto("/?search=23");

  await page.getByText("V", { exact: true }).waitFor({
    state: "visible",
  });

  await page.waitForTimeout(1000);

  await takeScreenshot();
});

screenshot("periodic-table-quiz", async ({ page, takeScreenshot }) => {
  await page.addInitScript(() => {
    Math.random = () => 0.5;
  });

  await page.goto("/tests/periodic-table");

  await page.getByTestId("overlay").click({
    position: {
      x: 10,
      y: 10,
    },
  });

  const quiz = new PeriodicTableQuizPage(page);
  await quiz.partiallyCompleteTheTable();
  await quiz.getElementButtonByAtomicNumber(1).scrollIntoViewIfNeeded();

  await takeScreenshot();
});

screenshot("hub", async ({ page, takeScreenshot }) => {
  await page.goto("/");

  await page.getByLabel("Atom").waitFor({
    state: "visible",
  });

  await page.waitForTimeout(3000);

  await takeScreenshot();
});

screenshot("quiz-settings", async ({ page, takeScreenshot }) => {
  await page.goto("/tests/valences/settings");

  await page.getByLabel("loading").waitFor({
    state: "hidden",
  });

  await takeScreenshot();
});

screenshot("periodic-table-light", async ({ page, takeScreenshot }) => {
  await page.goto("/");

  await page.getByLabel("Atom").waitFor({
    state: "visible",
  });

  await page.locator("[role=button]").nth(0).click();

  await page.goto("/periodic-table");

  await page.getByRole("button", { name: "1 H " }).waitFor({
    state: "visible",
  });

  await takeScreenshot();
});
