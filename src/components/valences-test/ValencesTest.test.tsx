import * as React from "react";
import { Router } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

import { TEST_SELECTION } from "../../routes";
import ElementManager from "../../ElementManager";
import ValencesTest from "./ValencesTest";
import * as Settings from "./settings/ValencesTestSettings";

const mockSettings = {
  elements: [
    {
      atomic: 1,
      enabled: true,
      stats: {
        right: 0,
        times: 0,
        wrong: 0,
      },
    },
  ],
};

const setup = () => {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router history={history}>
        <ValencesTest />
      </Router>
    ),
    history,
  };
};

afterEach(() => {
  jest.restoreAllMocks();
});

test("should render a question and four answers", () => {
  const { container } = setup();

  const questionCard = container.querySelector(".question-card") as HTMLElement;
  expect(questionCard).toBeInTheDocument();

  const buttons = within(questionCard).getAllByRole("button");
  expect(buttons).toHaveLength(4);
});

test("should display a new question when clicking on the correct answer", () => {
  const { container } = setup();

  // Getting the randomly displayed element
  const elementTag = container.querySelector(".element");
  const currentElementSymbol = elementTag!.textContent!;
  const element = ElementManager.getElements().find(
    (element) => element.symbol === currentElementSymbol
  );

  const rightAnswer = screen.getByRole("button", {
    name: element!.valency,
  });

  userEvent.click(rightAnswer);
  expect(elementTag).not.toHaveTextContent(currentElementSymbol);
});

test("should keep the same question when clicking on a wrong answer", async () => {
  jest
    .spyOn(Settings, "getValencesTestSettings")
    .mockReturnValueOnce(mockSettings);
  const { container } = setup();

  // Getting the randomly displayed element
  const elementTag = container.querySelector(".element");
  const currentElementSymbol = elementTag!.textContent!;
  const element = ElementManager.getElements().find(
    (element) => element.symbol === currentElementSymbol
  );

  // Getting a wrong answer
  const questionCard = container.querySelector(".question-card") as HTMLElement;
  const wrongAnswer = within(questionCard)
    .getAllByRole("button")
    .filter((button) => button.textContent !== element!.valency)[0];

  userEvent.click(wrongAnswer);
  expect(elementTag).toHaveTextContent(currentElementSymbol);

  // Getting results
  userEvent.click(screen.getByRole("button", { name: element!.valency }));
  expect(
    container.querySelector(".test-results__data__right")
  ).toHaveTextContent("0");

  // Reseting test
  userEvent.click(
    screen.getByRole("button", { name: /retake incorrect answers/i })
  );
  expect(await screen.findByText(element!.valency)).toBeInTheDocument();
});

test("should go back to tests", async () => {
  const { container, history } = setup();
  const backLink = container.querySelector(
    ".navbar__back-button"
  ) as HTMLElement;

  userEvent.click(backLink);
  expect(history.location.pathname).toBe(TEST_SELECTION);
});

test("should display results", () => {
  jest
    .spyOn(Settings, "getValencesTestSettings")
    .mockReturnValueOnce(mockSettings);
  const { container } = setup();
  const currentElementSymbol = container.querySelector(".element")!
    .textContent!;
  const element = ElementManager.getElements().find(
    (element) => element.symbol === currentElementSymbol
  );

  const rightAnswer = screen.getByRole("button", {
    name: element!.valency,
  });
  userEvent.click(rightAnswer);

  // Getting answers results
  expect(
    container.querySelector(".test-results__data__right")
  ).toHaveTextContent("1");

  userEvent.click(screen.getByText(/retake full test/i));
  expect(container.querySelector(".element")).toBeInTheDocument();
});
