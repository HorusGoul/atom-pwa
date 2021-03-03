import * as React from "react";
import { Router } from "react-router-dom";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

import ElementManager from "../../ElementManager";
import ValencesTest from "./ValencesTest";

const history = createMemoryHistory();

const setup = () => {
  ElementManager.loadElements();
  return render(
    <Router history={history}>
      <ValencesTest />
    </Router>
  );
};

test("Should render a question and four answers", () => {
  const { container } = setup();
  const questionCard = container.querySelector(".question-card") as HTMLElement;
  expect(questionCard).toBeInTheDocument();
  const buttons = within(questionCard).getAllByRole("button");
  expect(buttons).toHaveLength(4);
});

test("should display a new question when clicking on the correct answer", () => {
  const { container } = setup();
  const elementTag = container.querySelector(".element");
  const currentElementSymbol = elementTag?.textContent!;

  const element = ElementManager.getElements().find(
    (element) => element.symbol === currentElementSymbol
  );
  const rightAnswer = screen.getByRole("button", {
    name: element?.valency,
  });

  userEvent.click(rightAnswer);
  expect(elementTag).not.toHaveTextContent(currentElementSymbol);
});

test("Should keep the same question when clicking on a wrong answer", () => {
  const { container } = setup();
  const questionCard = container.querySelector(".question-card") as HTMLElement;
  const elementTag = container.querySelector(".element");
  const currentElementSymbol = elementTag?.textContent!;

  const element = ElementManager.getElements().find(
    (element) => element.symbol === currentElementSymbol
  );
  const wrongAnswer = within(questionCard).getAllByRole("button", {
    name: RegExp(`^(?!.*\\${element!.valency})`),
  })[0];
  userEvent.click(wrongAnswer);
  expect(elementTag).toHaveTextContent(currentElementSymbol);
});

test("Should go back to tests", async () => {
  const { container } = setup();
  const backLink = container.querySelector(
    ".navbar__back-button"
  ) as HTMLElement;
  userEvent.click(backLink);
  waitFor(() => {
    expect(screen.findByRole("button", { name: /tests/i })).toBeInTheDocument();
  });
});
