import { video } from "@/video";

video("promo", async ({ page }) => {
  await page.goto("/");

  await page.waitForTimeout(2000);

  const periodicTableButton = page.locator(
    '[style*="/media/periodic-table.jpg"]'
  );

  await periodicTableButton.click();

  await page.waitForTimeout(2000);
});
