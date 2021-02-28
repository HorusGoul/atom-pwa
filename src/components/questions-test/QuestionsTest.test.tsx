import * as React from "react";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import QuestionsTest from "./QuestionsTest";

const question = {
  question: "Question 1",
  answers: [
    {
      answer: "Answer 1",
      right: false,
    },
    {
      answer: "Answer 2",
      right: true,
    },
  ],
};

test("should display the first question with answer buttons", () => {
  render(<QuestionsTest title="Questions" questions={[question]} />);

  expect(screen.getByText(/questions/i)).toBeInTheDocument();
  expect(screen.getByText(/question 1/i)).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /answer 1/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /answer 2/i })).toBeInTheDocument();
});

test("should call onAnswerClick after answering", async () => {
  const onAnswerClickMock = jest.fn();

  render(
    <QuestionsTest
      title="Questions"
      questions={[question]}
      onQuestionAnswer={onAnswerClickMock}
    />
  );

  userEvent.click(screen.getByRole("button", { name: /answer 2/i }));

  expect(onAnswerClickMock).toHaveBeenCalled();
});
