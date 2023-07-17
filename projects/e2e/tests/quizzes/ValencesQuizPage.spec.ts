import { ValencesQuizPage } from "@/ValencesQuizPage";
import { expect, test } from "playwright-test-coverage";

test.beforeEach(async ({ page }) => {
  // Fix math.random() so that the test is deterministic
  await page.addInitScript(() => {
    Math.random = () => 0.5;
  });
});

test("should have a visible title", async ({ page }) => {
  const valencesQuizPage = new ValencesQuizPage(page);

  await valencesQuizPage.goto();
  await valencesQuizPage.titleIsVisible();
});

test("should show are you sure dialog when you click the Go Back button", async ({
  page,
}) => {
  const valencesQuizPage = new ValencesQuizPage(page);

  await valencesQuizPage.goto();
  await valencesQuizPage.goBack();
});

test("should go back to the home page when you click the Go Back button and confirm", async ({
  page,
}) => {
  const valencesQuizPage = new ValencesQuizPage(page);

  await valencesQuizPage.goto();
  await valencesQuizPage.goBack();
  await valencesQuizPage.confirmAreYouSureDialog();
});

test("should stay on the quiz page when you click the Go Back button and cancel", async ({
  page,
}) => {
  const valencesQuizPage = new ValencesQuizPage(page);

  await valencesQuizPage.goto();
  await valencesQuizPage.goBack();
  await valencesQuizPage.cancelAreYouSureDialog();
});

test("should show are you sure dialog when you click the Settings button", async ({
  page,
}) => {
  const valencesQuizPage = new ValencesQuizPage(page);

  await valencesQuizPage.goto();
  await valencesQuizPage.openSettings();
});

test("should go to the settings page when you click the Settings button and confirm", async ({
  page,
}) => {
  const valencesQuizPage = new ValencesQuizPage(page);

  await valencesQuizPage.goto();
  await valencesQuizPage.openSettings();
  await valencesQuizPage.confirmAreYouSureDialog();
});

test("should stay on the quiz page when you click the Settings button and cancel", async ({
  page,
}) => {
  const valencesQuizPage = new ValencesQuizPage(page);

  await valencesQuizPage.goto();
  await valencesQuizPage.openSettings();
  await valencesQuizPage.cancelAreYouSureDialog();
});

test("should display the question title", async ({ page }) => {
  const valencesQuizPage = new ValencesQuizPage(page);

  await valencesQuizPage.goto();
  await valencesQuizPage.questionTitleIsVisible();
});

test("should display the correct answer", async ({ page }) => {
  const valencesQuizPage = new ValencesQuizPage(page);

  await valencesQuizPage.goto();
  await valencesQuizPage.correctAnswerIsVisible();
});

test("should not change the question if you click an incorrect answer", async ({
  page,
}) => {
  const valencesQuizPage = new ValencesQuizPage(page);

  await valencesQuizPage.goto();

  const buttons = await valencesQuizPage.getIncorrectAnswerButtons();

  for (const button of buttons) {
    await button.click();
    // We expect the question title to be "H" because the quiz is deterministic due to the Math.random() fix
    expect(valencesQuizPage.questionTitle).toHaveText("H");
  }
});

test("should change the question if you click the correct answer", async ({
  page,
}) => {
  const valencesQuizPage = new ValencesQuizPage(page);

  await valencesQuizPage.goto();
  await valencesQuizPage.clickCorrectAnswer();
});

test("should complete the quiz if you answer all the questions correctly", async ({
  page,
}) => {
  const valencesQuizPage = new ValencesQuizPage(page);

  await valencesQuizPage.goto();
  await valencesQuizPage.completeTheQuizWithoutMistakes();
});

test("should show the retake only the wrong answers button when you make a mistake", async ({
  page,
}) => {
  const valencesQuizPage = new ValencesQuizPage(page);

  await valencesQuizPage.goto();
  await valencesQuizPage.completeTheQuizWithMistakes();
  await valencesQuizPage.retakeIncorrectAnswersButtonIsVisible();
});

test("should retake only the wrong answers when you click the retake only the wrong answers button", async ({
  page,
}) => {
  const valencesQuizPage = new ValencesQuizPage(page);

  await valencesQuizPage.goto();
  await valencesQuizPage.completeTheQuizWithMistakes();
  await valencesQuizPage.retakeIncorrectAnswers();
});

test("should retake the whole quiz when you click the retake the whole quiz button", async ({
  page,
}) => {
  const valencesQuizPage = new ValencesQuizPage(page);

  await valencesQuizPage.goto();
  await valencesQuizPage.completeTheQuizWithMistakes();
  await valencesQuizPage.retakeFullTest();
});
