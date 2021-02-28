import * as React from "react";

import { render, screen } from "@testing-library/react";

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
