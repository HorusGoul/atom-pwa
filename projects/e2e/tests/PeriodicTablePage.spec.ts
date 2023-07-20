import { expect, test } from "playwright-test-coverage";
import { PeriodicTablePage } from "@/PeriodicTablePage";

test("should have a title", async ({ page }) => {
  const periodicTablePage = new PeriodicTablePage(page);

  await periodicTablePage.goto();
  await periodicTablePage.titleIsVisible();
});

test("should open the details of an element when clicking it", async ({
  page,
}) => {
  const periodicTablePage = new PeriodicTablePage(page);

  await periodicTablePage.goto();
  await periodicTablePage.openElementDetails(1);

  // Check that the atomic radius is visible for Hydrogen
  await expect(page.getByText("53 pm")).toBeVisible();

  await periodicTablePage.closeElementDetails();
});
