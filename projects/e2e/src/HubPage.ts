import { expect, type Locator, type Page } from '@playwright/test';


export class HubPage {
  get title() {
    return this.page.getByLabel('Atom');
  }

  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async titleIsVisible() {
    await expect(this.title).toBeVisible();
  }
}