import type { Page } from "@playwright/test";
import { expect } from "playwright-test-coverage";
import { Document } from "./Document";

export class HubPage {
  private document = new Document(this.page);

  get title() {
    return this.page.getByLabel("Atom");
  }

  get switchToDarkModeButton() {
    return this.page.getByLabel("Switch to dark mode");
  }

  get switchToLightModeButton() {
    return this.page.getByLabel("Switch to light mode");
  }

  get openSettingsButton() {
    return this.page.getByLabel("Settings");
  }

  get openSearchButton() {
    return this.page.getByRole("button", { name: "Search..." });
  }

  get openPeriodicTableButton() {
    return this.page.getByRole("button", { name: "Periodic Table" });
  }

  get openMassCalculatorButton() {
    return this.page.getByRole("button", { name: "Mass calculator" });
  }

  get openUnitConverterButton() {
    return this.page.getByRole("button", { name: "Unit Converter" });
  }

  get openQuizzesButton() {
    return this.page.getByRole("button", { name: "Quizzes" });
  }

  get openResourcesButton() {
    return this.page.getByRole("button", { name: "Resources" });
  }

  get rateAppButton() {
    return this.page.getByRole("button", { name: "Do you like this app?" });
  }

  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto("/");
  }

  async titleIsVisible() {
    await expect(this.title).toBeVisible();
  }

  async switchToDarkMode() {
    await this.switchToDarkModeButton.click();
    await expect(this.document.currentThemeClass).resolves.toEqual(
      "theme-dark"
    );
  }

  async switchToLightMode() {
    await this.switchToLightModeButton.click();
    await expect(this.document.currentThemeClass).resolves.toEqual(
      "theme-light"
    );
  }

  async openSettings() {
    await this.openSettingsButton.click();

    const url = new URL(this.page.url());
    expect(url.pathname).toEqual("/about");
  }

  async openSearch() {
    await this.openSearchButton.click();

    const url = new URL(this.page.url());
    expect(url.searchParams.get("openSearch")).toEqual("true");
  }

  async openPeriodicTable() {
    await this.openPeriodicTableButton.click();

    const url = new URL(this.page.url());
    expect(url.pathname).toEqual("/periodic-table");
  }

  async openMassCalculator() {
    await this.openMassCalculatorButton.click();

    const url = new URL(this.page.url());
    expect(url.pathname).toEqual("/mass-calculator");
  }

  async openUnitConverter() {
    await this.openUnitConverterButton.click({ force: true });
    await expect(this.page.getByText("Work in Progress")).toBeVisible();
    await this.page.getByRole("button", { name: "Close" }).click();
    await expect(this.page.getByText("Work in Progress")).toBeHidden();
  }

  async openQuizzes() {
    await this.openQuizzesButton.click();

    const url = new URL(this.page.url());
    expect(url.pathname).toEqual("/tests");
  }

  async openResources() {
    await this.openResourcesButton.click({ force: true });
    await expect(this.page.getByText("Work in Progress")).toBeVisible();
    await this.page.getByRole("button", { name: "Close" }).click();
    await expect(this.page.getByText("Work in Progress")).toBeHidden();
  }

  async rateAppCancel() {
    await expect(this.rateAppButton).toBeHidden();

    await this.page.reload();
    await this.page.reload();
    await this.page.reload();

    await expect(this.rateAppButton).toBeVisible();

    await this.rateAppButton.click();

    await expect(
      this.page.getByText(
        "If you think this app is useful, please rate it at the store so others will find it and learn too."
      )
    ).toBeVisible();

    await this.page.getByRole("button", { name: "Cancel" }).click();

    await expect(
      this.page.getByText(
        "If you think this app is useful, please rate it at the store so others will find it and learn too."
      )
    ).toBeHidden();

    await expect(this.rateAppButton).toBeHidden();
  }

  async rateAppOk() {
    await expect(this.rateAppButton).toBeHidden();

    await this.page.reload();
    await this.page.reload();
    await this.page.reload();

    await expect(this.rateAppButton).toBeVisible();

    await this.rateAppButton.click();

    await expect(
      this.page.getByText(
        "If you think this app is useful, please rate it at the store so others will find it and learn too."
      )
    ).toBeVisible();

    await this.page.getByRole("button", { name: "Ok" }).click();

    await expect(
      this.page.getByText(
        "If you think this app is useful, please rate it at the store so others will find it and learn too."
      )
    ).toBeHidden();

    await expect(this.rateAppButton).toBeHidden();
  }
}
