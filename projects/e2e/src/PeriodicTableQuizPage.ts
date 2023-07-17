import type { Page } from "@playwright/test";
import { expect } from "playwright-test-coverage";
import { mapSymbolToAtomicNumber } from "./data/PeriodicTableQuiz";

export class PeriodicTableQuizPage {
  get title() {
    return this.page.getByText("Periodic Table Test");
  }

  get completeTheTableDialog() {
    return this.page.getByLabel("Complete the table");
  }

  get completeTheTableDialogCloseButton() {
    return this.completeTheTableDialog.getByRole("button", { name: "Close" });
  }

  get helpButton() {
    return this.page.getByRole("button", { name: "help" });
  }

  get helpSymbol() {
    return this.helpButton
      .innerText()
      .then((text) => text.replace("?", "").replace("\n", "").trim());
  }

  get oopsAlert() {
    return this.page.getByRole("alert", { name: "Oops!" });
  }

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

  getElementButtonByAtomicNumber(atomicNumber: number) {
    // Regexp that matches "2. " but not "12. "
    const regex = new RegExp(`^${atomicNumber}\\. `, "i");

    return this.page.getByLabel(regex);
  }

  async goto() {
    await this.page.goto("/tests/periodic-table");
  }

  async titleIsVisible() {
    await expect(this.title).toBeVisible();
  }

  async completeTheTableDialogIsVisible() {
    await expect(this.completeTheTableDialog).toBeVisible();
  }

  async closeCompleteTheTableDialog() {
    await this.completeTheTableDialogCloseButton.click();
    expect(this.completeTheTableDialog).toBeHidden();
  }

  async openCompleteTheTableDialog() {
    await this.helpButton.click();
    await this.completeTheTableDialogIsVisible();
  }

  async oopsAlertIsVisible() {
    await expect(this.oopsAlert).toBeVisible();
  }

  async oopsAlertIsNotVisible() {
    await expect(this.oopsAlert).toBeHidden();
  }

  async testResultsTitleIsVisible() {
    await expect(this.testResultsTitle).toBeVisible();
  }

  async retakeFullTestButtonIsVisible() {
    await expect(this.retakeFullTestButton).toBeVisible();
  }

  async retakeIncorrectAnswersButtonIsVisible() {
    await expect(this.retakeIncorrectAnswersButton).toBeVisible();
  }

  async completeTheTableWithoutMistakes() {
    await this.completeTheTable();
    await expect(this.page.getByText("118/118")).toBeVisible();
  }

  async completeTheTableWithMistakes() {
    // Selecting Lithium because test is determined to start with Hydrogen
    await this.getElementButtonByAtomicNumber(3).click();
    await this.completeTheTable();
    await expect(this.page.getByText("117/118")).toBeVisible();
  }

  async retakeIncorrectAnswers() {
    await this.retakeIncorrectAnswersButton.click();
    // Checking Hydrogen because it was the only incorrect answer
    await expect(this.getElementButtonByAtomicNumber(1)).toBeEnabled();
    await this.completeTheTableWithoutMistakes();
  }

  async retakeFullTest() {
    await this.retakeFullTestButton.click();
    await this.completeTheTableWithoutMistakes();
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
    await expect(this.title).toBeHidden();
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

  private async completeTheTable() {
    while (true) {
      if (await this.helpButton.isHidden()) {
        break;
      }

      const symbol = await this.helpSymbol;
      const atomic = mapSymbolToAtomicNumber[symbol];
      const elementButton = this.getElementButtonByAtomicNumber(atomic);
      await elementButton.click();
    }

    await this.testResultsTitleIsVisible();
  }
}
