import type { Page } from "@playwright/test";

export class Document {
  constructor(public readonly page: Page) {}

  get currentThemeClass() {
    return this.page.getAttribute("body", "class").then((classes) => {
      return classes?.split(" ").find((c) => c.startsWith("theme-"));
    });
  }
}
