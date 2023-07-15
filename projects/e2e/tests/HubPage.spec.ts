import { test, expect } from "@playwright/test";
import { HubPage } from "@/HubPage";

test("HubPage should have a title", async ({ page }) => {
  const hubPage = new HubPage(page);

  await hubPage.goto();
  await hubPage.titleIsVisible();
});
