import { PeriodicTableQuizPage } from "@/PeriodicTableQuizPage";
import { expect, test } from "playwright-test-coverage";

test.beforeEach(async ({ page }) => {
  test.setTimeout(120000);

  // Fix math.random() so that the test is deterministic
  await page.addInitScript(() => {
    Math.random = () => 0.5;
  });
});

test("should have a visible title", async ({ page }) => {
  const periodicTableQuizPage = new PeriodicTableQuizPage(page);

  await periodicTableQuizPage.goto();
  await periodicTableQuizPage.titleIsVisible();
});

test("should start with the Complete the table dialog open", async ({
  page,
}) => {
  const periodicTableQuizPage = new PeriodicTableQuizPage(page);

  await periodicTableQuizPage.goto();
  await periodicTableQuizPage.completeTheTableDialogIsVisible();
});

test("should close the Complete the table dialog when the Close button is clicked", async ({
  page,
}) => {
  const periodicTableQuizPage = new PeriodicTableQuizPage(page);

  await periodicTableQuizPage.goto();
  await periodicTableQuizPage.closeCompleteTheTableDialog();
});

test("should open the Complete the table dialog when clicking the help button", async ({
  page,
}) => {
  const periodicTableQuizPage = new PeriodicTableQuizPage(page);

  await periodicTableQuizPage.goto();
  await periodicTableQuizPage.closeCompleteTheTableDialog();
  await periodicTableQuizPage.openCompleteTheTableDialog();
});

test("should show an Oops message when you click the wrong element", async ({
  page,
}) => {
  const periodicTableQuizPage = new PeriodicTableQuizPage(page);

  await periodicTableQuizPage.goto();
  await periodicTableQuizPage.closeCompleteTheTableDialog();

  // Selecting Lithium because test is determined to start with Hydrogen
  const wrongElementButton = periodicTableQuizPage.getElementButtonByAtomicNumber(
    3
  );

  await wrongElementButton.click();
  await periodicTableQuizPage.oopsAlertIsVisible();
});

test("should mark the element as correct when you click the right element", async ({
  page,
}) => {
  const periodicTableQuizPage = new PeriodicTableQuizPage(page);

  await periodicTableQuizPage.goto();
  await periodicTableQuizPage.closeCompleteTheTableDialog();

  // Selecting Hydrogen because test is determined to start with Hydrogen
  const rightElementButton = periodicTableQuizPage.getElementButtonByAtomicNumber(
    1
  );

  await rightElementButton.click();

  // The button should now be disabled
  await expect(rightElementButton).toBeDisabled();

  // The button should now have the name of the element and its symbol
  await expect(rightElementButton).toHaveText("1HHydrogen");
});

test("should complete the quiz when all elements are selected", async ({
  page,
}) => {
  const periodicTableQuizPage = new PeriodicTableQuizPage(page);

  await periodicTableQuizPage.goto();
  await periodicTableQuizPage.closeCompleteTheTableDialog();
  await periodicTableQuizPage.completeTheTableWithoutMistakes();
});

test("should show the retake only the wrong answers button when you make a mistake", async ({
  page,
}) => {
  const periodicTableQuizPage = new PeriodicTableQuizPage(page);

  await periodicTableQuizPage.goto();
  await periodicTableQuizPage.closeCompleteTheTableDialog();
  await periodicTableQuizPage.completeTheTableWithMistakes();
  await periodicTableQuizPage.retakeIncorrectAnswersButtonIsVisible();
});

test("should retake only the wrong answers when you click the retake only the wrong answers button", async ({
  page,
}) => {
  const periodicTableQuizPage = new PeriodicTableQuizPage(page);

  await periodicTableQuizPage.goto();
  await periodicTableQuizPage.closeCompleteTheTableDialog();
  await periodicTableQuizPage.completeTheTableWithMistakes();
  await periodicTableQuizPage.retakeIncorrectAnswers();
});

test("should retake the whole quiz when you click the retake the whole quiz button", async ({
  page,
}) => {
  const periodicTableQuizPage = new PeriodicTableQuizPage(page);

  await periodicTableQuizPage.goto();
  await periodicTableQuizPage.closeCompleteTheTableDialog();
  await periodicTableQuizPage.completeTheTableWithoutMistakes();
  await periodicTableQuizPage.retakeFullTest();
});

test("should show are you sure dialog when you click the Go Back button", async ({
  page,
}) => {
  const periodicTableQuizPage = new PeriodicTableQuizPage(page);

  await periodicTableQuizPage.goto();
  await periodicTableQuizPage.closeCompleteTheTableDialog();
  await periodicTableQuizPage.goBack();
});

test("should go back to the home page when you click the Go Back button and confirm", async ({
  page,
}) => {
  const periodicTableQuizPage = new PeriodicTableQuizPage(page);

  await periodicTableQuizPage.goto();
  await periodicTableQuizPage.closeCompleteTheTableDialog();
  await periodicTableQuizPage.goBack();
  await periodicTableQuizPage.confirmAreYouSureDialog();
});

test("should stay on the quiz page when you click the Go Back button and cancel", async ({
  page,
}) => {
  const periodicTableQuizPage = new PeriodicTableQuizPage(page);

  await periodicTableQuizPage.goto();
  await periodicTableQuizPage.closeCompleteTheTableDialog();
  await periodicTableQuizPage.goBack();
  await periodicTableQuizPage.cancelAreYouSureDialog();
});

test("should show are you sure dialog when you click the Settings button", async ({
  page,
}) => {
  const periodicTableQuizPage = new PeriodicTableQuizPage(page);

  await periodicTableQuizPage.goto();
  await periodicTableQuizPage.closeCompleteTheTableDialog();
  await periodicTableQuizPage.openSettings();
});

test("should go to the settings page when you click the Settings button and confirm", async ({
  page,
}) => {
  const periodicTableQuizPage = new PeriodicTableQuizPage(page);

  await periodicTableQuizPage.goto();
  await periodicTableQuizPage.closeCompleteTheTableDialog();
  await periodicTableQuizPage.openSettings();
  await periodicTableQuizPage.confirmAreYouSureDialog();
});

test("should stay on the quiz page when you click the Settings button and cancel", async ({
  page,
}) => {
  const periodicTableQuizPage = new PeriodicTableQuizPage(page);

  await periodicTableQuizPage.goto();
  await periodicTableQuizPage.closeCompleteTheTableDialog();
  await periodicTableQuizPage.openSettings();
  await periodicTableQuizPage.cancelAreYouSureDialog();
});
