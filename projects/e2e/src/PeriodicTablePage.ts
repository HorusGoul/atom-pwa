import type { Page } from "@playwright/test";
import { expect } from "playwright-test-coverage";

export class PeriodicTablePage {
  get title() {
    return this.page.getByText("Periodic Table");
  }

  getElementByAtomicNumber(atomicNumber: number) {
    const regex = new RegExp(`^${atomicNumber} .*`, "i");

    return this.page.getByRole("button", { name: regex });
  }

  get overlay() {
    return this.page.getByTestId("overlay");
  }

  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto("/periodic-table");
  }

  async titleIsVisible() {
    await expect(this.title).toBeVisible();
  }

  async openElementDetails(atomicNumber: number) {
    const element = this.getElementByAtomicNumber(atomicNumber);

    await element.click();

    const url = new URL(this.page.url());
    expect(url.pathname).toBe(`/periodic-table/${atomicNumber}`);
  }

  async closeElementDetails() {
    // TODO: change to close button
    await this.overlay.click({
      position: { x: 10, y: 10 },
    });

    const url = new URL(this.page.url());
    expect(url.pathname).toBe(`/periodic-table`);

    await expect(this.overlay).toBeHidden();
  }
}
