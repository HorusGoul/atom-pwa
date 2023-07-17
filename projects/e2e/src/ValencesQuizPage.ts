import { Page } from "@playwright/test";
import { expect } from "playwright-test-coverage";
import { mapSymbolToValency } from "./data/ValencesQuiz";
import { QuizPage } from "./QuizPage";

export class ValencesQuizPage extends QuizPage {
  pathname = "/tests/valences";

  get title() {
    return this.page.getByText("Valences Test");
  }

  get questionTitle() {
    return this.page.getByTestId("question-title");
  }

  async titleIsVisible() {
    await expect(this.title).toBeVisible();
  }

  async getCorrectAnswerButton() {
    return this.page.getByRole("button", {
      name: await this.getCorrectAnswerText(),
      exact: true,
    });
  }

  async getIncorrectAnswerButtons() {
    const buttons = await this.page.getByTestId(/^question-answer-/).all();
    const correctAnswerText = await this.getCorrectAnswerText();

    const allButtons = await Promise.all(
      buttons.map(
        async (button) => [button, await button.textContent()] as const
      )
    );

    return allButtons
      .filter(([, text]) => text !== correctAnswerText)
      .map(([button]) => button);
  }

  async questionTitleIsVisible() {
    await expect(this.questionTitle).toBeVisible();
  }

  async correctAnswerIsVisible() {
    await expect(await this.getCorrectAnswerButton()).toBeVisible();
  }

  async clickCorrectAnswer() {
    const currentQuestionTitleText = await this.questionTitle.textContent();
    const correctAnswerButton = await this.getCorrectAnswerButton();

    await correctAnswerButton.click();
    await expect(this.questionTitle).not.toHaveText(
      currentQuestionTitleText ?? "UNKNOWN_SYMBOL"
    );
  }

  async completeTheQuizWithoutMistakes() {
    await this.completeTheQuiz();
    await expect(this.page.getByText("51/51")).toBeVisible();
  }

  async completeTheQuizWithMistakes() {
    const incorrectAnswerButtons = await this.getIncorrectAnswerButtons();

    for (const incorrectAnswerButton of incorrectAnswerButtons) {
      await incorrectAnswerButton.click();
    }

    await this.completeTheQuiz();
    await expect(this.page.getByText("50/51")).toBeVisible();
  }

  async retakeIncorrectAnswers() {
    await this.retakeIncorrectAnswersButton.click();
    // Checking Hydrogen because it was the only incorrect answer
    await expect(this.questionTitle).toHaveText("H");
    await this.completeTheQuizWithoutMistakes();
  }

  async retakeFullTest() {
    await this.retakeFullTestButton.click();
    await this.completeTheQuizWithoutMistakes();
  }

  private async completeTheQuiz() {
    while (true) {
      if (await this.testResultsTitle.isVisible()) {
        break;
      }

      const correctAnswerButton = await this.getCorrectAnswerButton();
      await correctAnswerButton.click();
    }

    await this.testResultsTitleIsVisible();
  }

  private async getCorrectAnswerText() {
    const symbol = (await this.questionTitle.textContent()) ?? "UNKNOWN_SYMBOL";
    expect(symbol).not.toBe("UNKNOWN_SYMBOL");

    const valency = mapSymbolToValency[symbol] ?? "UNKNOWN_ANSWER";
    expect(valency).not.toBe("UNKNOWN_ANSWER");

    return valency;
  }
}
