import * as React from "react";
import { Router } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { TEST_SELECTION } from "@/routes";
import { STORAGE_KEY, defaultSettings } from "@/hooks/useSettings";
import ValencesTest from "./ValencesTest";

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

beforeEach(() => {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...defaultSettings,
      tests: {
        valences: {
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
        },
      },
    })
  );
});

afterEach(() => {
  window.localStorage.clear();
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

  const rightAnswer = screen.getByRole("button", { name: /\+1 \/ \-1/i });

  userEvent.click(rightAnswer);

  expect(container.querySelector(".element")).not.toBeInTheDocument();
});

test("should keep the same question when clicking on a wrong answer", async () => {
  const { container } = setup();

  // Getting a wrong answer
  const questionCard = container.querySelector(".question-card") as HTMLElement;
  const wrongAnswer = within(questionCard).getAllByRole("button", {
    name: /^(?!\+1 \/ \-1).*$/i,
  })[0];

  userEvent.click(wrongAnswer);
  expect(container.querySelector(".element")).toBeInTheDocument();

  // Getting results
  userEvent.click(screen.getByRole("button", { name: /\+1 \/ \-1/i }));
  expect(
    container.querySelector(".test-results__data__right")
  ).toHaveTextContent("0");

  // Resetting test
  userEvent.click(
    screen.getByRole("button", { name: /retake incorrect answers/i })
  );
  expect(await screen.findByText(/\+1 \/ \-1/i)).toBeInTheDocument();
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
  const { container } = setup();

  const rightAnswer = screen.getByRole("button", { name: /\+1 \/ \-1/i });
  userEvent.click(rightAnswer);

  // Getting answers results
  expect(
    container.querySelector(".test-results__data__right")
  ).toHaveTextContent("1");

  userEvent.click(screen.getByText(/retake full test/i));
  expect(container.querySelector(".element")).toBeInTheDocument();
});
