import { mapSymbolToAtomicNumber } from "@/data/PeriodicTableQuiz";
import { Page } from "playwright";

export class PeriodicTableQuizPage {
  get helpButton() {
    return this.page.locator(".periodic-table-test__current-question__button");
  }

  get helpSymbol() {
    return this.helpButton
      .innerText()
      .then((text) => text.replace("?", "").replace("\n", "").trim());
  }

  getElementButtonByAtomicNumber(atomicNumber: number) {
    // Regexp that matches "2. " but not "12. "
    const regex = new RegExp(`^${atomicNumber}\\. `, "i");

    return this.page.getByLabel(regex);
  }

  constructor(public readonly page: Page) {}

  async partiallyCompleteTheTable() {
    for (let i = 1; i <= 60; i++) {
      const symbol = await this.helpSymbol;
      const atomic = mapSymbolToAtomicNumber[symbol];
      const elementButton = this.getElementButtonByAtomicNumber(atomic);
      await elementButton.click();
    }
  }
}
