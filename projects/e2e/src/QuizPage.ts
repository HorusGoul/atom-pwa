import { Locator, Page } from "@playwright/test";
import { expect } from "playwright-test-coverage";

export abstract class QuizPage {
  abstract readonly pathname: string;
  abstract get title(): Locator;

  get testResultsTitle() {
    return this.page.getByText("Test Results");
  }

  get retakeFullTestButton() {
    return this.page.getByRole("button", { name: "Retake full test" });
  }

  get retakeIncorrectAnswersButton() {
    return this.page.getByRole("button", { name: "Retake incorrect answers" });
  }

  get goBackButton() {
    return this.page.getByRole("button", { name: "Go back" });
  }

  get settingsButton() {
    return this.page.getByRole("button", { name: "Settings" });
  }

  get areYouSureDialog() {
    return this.page.getByRole("dialog", { name: "Are you sure?" });
  }

  get areYouSureDialogContinueButton() {
    return this.areYouSureDialog.getByRole("button", { name: "Continue" });
  }

  get areYouSureDialogCancelButton() {
    return this.areYouSureDialog.getByRole("button", { name: "Cancel" });
  }

  get areYouSureDialogCloseButton() {
    return this.areYouSureDialog.getByRole("button", { name: "Close" });
  }

  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto(this.pathname);
  }

  abstract titleIsVisible(): Promise<void>;

  async testResultsTitleIsVisible() {
    await expect(this.testResultsTitle).toBeVisible();
  }

  async retakeFullTestButtonIsVisible() {
    await expect(this.retakeFullTestButton).toBeVisible();
  }

  async retakeIncorrectAnswersButtonIsVisible() {
    await expect(this.retakeIncorrectAnswersButton).toBeVisible();
  }

  async goBack() {
    await this.goBackButton.click();
    await expect(this.areYouSureDialog).toBeVisible();
  }

  async openSettings() {
    await this.settingsButton.click();
    await expect(this.areYouSureDialog).toBeVisible();
  }

  async confirmAreYouSureDialog() {
    await this.areYouSureDialogContinueButton.click();
    await expect(this.areYouSureDialog).toBeHidden();

    const pathname = new URL(this.page.url()).pathname;
    expect(pathname).not.toEqual(this.pathname);
  }

  async cancelAreYouSureDialog() {
    await this.areYouSureDialogCancelButton.click();
    await expect(this.areYouSureDialog).toBeHidden();
    await this.titleIsVisible();
  }

  async closeAreYouSureDialog() {
    await this.areYouSureDialogCloseButton.click();
    await expect(this.areYouSureDialog).toBeHidden();
    await this.titleIsVisible();
  }
}
