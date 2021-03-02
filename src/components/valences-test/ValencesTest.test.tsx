import * as React from "react";
import { Router } from "react-router-dom";
import {
  getElementError,
  render,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

import ElementManager from "../../ElementManager";
import ValencesTest from "./ValencesTest";

const history = createMemoryHistory();

jest.mock("../../ElementManager", () => ({
  getElements: () => [
    {
      atomic: 1,
      testState: {
        valencesTest: true,
      },
      valency: "+2 +4 +6 / -2",
    },
    {
      atomic: 1,
      testState: {
        valencesTest: true,
      },
      valency: "+1 / -1",
    },
  ],
  getElement: () => ({
    atomic: 1,
    valency: "+2 +4 +6 / -2",
    wrongValences: [
      "+2",
      "+1 +3 +5 +7 / -1",
      "+2 +6",
      "+3 +5 / -3",
      "+3 +5",
      "+2 +4 +6",
    ],
  }),
}));

const setup = () => {
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
  const questionCard = container.querySelector(".question-card") as HTMLElement;
  const rightAnswer = within(questionCard).getByRole("button", {
    name: "+2 +4 +6 / -2",
  });
  userEvent.click(rightAnswer);
});

test("Should add 'wrong' classes when click on a wrong answer", () => {
  const { container } = setup();
});

test("Should render results", () => {
  const { container } = setup();
});
