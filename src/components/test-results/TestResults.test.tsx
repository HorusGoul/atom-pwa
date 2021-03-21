import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TestResults, { TestResultsProps } from "./TestResults";

const onRepeatMock = jest.fn();
const onRepeatWrongAnswersMock = jest.fn();

const wrapper = (props: TestResultsProps) => render(<TestResults {...props} />);

beforeEach(() => jest.clearAllMocks());

test("should render component and perform basic validations", () => {
  const props: TestResultsProps = {
    gaTestName: "mock",
    rightAnswers: 2,
    wrongAnswers: 4,
  };
  const component = wrapper(props);

  expect(component.container.querySelector(".test-results--good")).toBeNull();

  expect(
    component.container.querySelector(".test-results__title")?.textContent
  ).toEqual("Test results");

  expect(
    component.container.querySelector(".test-results__data__right")?.textContent
  ).toEqual("2");

  expect(
    component.container.querySelector(".test-results__data__total")?.textContent
  ).toEqual("6");

  expect(
    component.container.querySelector(".test-results__data__divider")
      ?.textContent
  ).toEqual("/");

  expect(screen.queryAllByRole("button")).toHaveLength(0);
});

test("should display percentage if test results are good", () => {
  const props: TestResultsProps = {
    gaTestName: "mock",
    rightAnswers: 5,
    wrongAnswers: 1,
  };
  const component = wrapper(props);

  expect(
    component.container.querySelector(".test-results--good")
  ).toBeDefined();
});

test("should render retake full test button", () => {
  const props: TestResultsProps = {
    gaTestName: "mock",
    rightAnswers: 5,
    wrongAnswers: 1,
    onRepeat: onRepeatMock,
  };
  const component = wrapper(props);

  expect(
    component.container.querySelector(".test-results--good")
  ).toBeDefined();

  expect(screen.getAllByRole("button")).toHaveLength(1);
  expect(
    component.container.querySelector(".icon-button__text")?.textContent
  ).toEqual("Retake full test");

  const retakeFullTestButton = screen.getByRole("button") as HTMLButtonElement;
  fireEvent.click(retakeFullTestButton);
  expect(onRepeatMock).toHaveBeenCalledTimes(1);
});

test("should render retake incorrect answers button", () => {
  const props: TestResultsProps = {
    gaTestName: "mock",
    rightAnswers: 5,
    wrongAnswers: 1,
    onRepeat: onRepeatMock,
    onRepeatWrongAnswers: onRepeatWrongAnswersMock,
  };
  const component = wrapper(props);

  expect(
    component.container.querySelector(".test-results--good")
  ).toBeDefined();

  expect(screen.getAllByRole("button")).toHaveLength(2);
  expect(
    component.container.querySelectorAll(".icon-button__text")[1]?.textContent
  ).toEqual("Retake incorrect answers");

  const retakeIncorrectTestButton = screen.getAllByRole(
    "button"
  )[1] as HTMLButtonElement;
  fireEvent.click(retakeIncorrectTestButton);
  expect(onRepeatMock).toHaveBeenCalledTimes(0);
  expect(onRepeatWrongAnswersMock).toHaveBeenCalledTimes(1);
});

test("should not render retake incorrect answers button if right answer === total", () => {
  const props: TestResultsProps = {
    gaTestName: "mock",
    rightAnswers: 5,
    wrongAnswers: 0,
    onRepeat: onRepeatMock,
    onRepeatWrongAnswers: onRepeatWrongAnswersMock,
  };
  const component = wrapper(props);

  expect(screen.getAllByRole("button")).toHaveLength(1);
  expect(
    component.container.querySelectorAll(".icon-button__text")[0]?.textContent
  ).toEqual("Retake full test");
});

test("should render component when total value as 0", () => {
  const props: TestResultsProps = {
    gaTestName: "mock",
    rightAnswers: 0,
    wrongAnswers: 0,
  };
  const component = wrapper(props);

  expect(
    component.container.querySelector(".test-results__data__right")?.textContent
  ).toEqual("0");

  expect(
    component.container.querySelector(".test-results__data__total")?.textContent
  ).toEqual("0");

  expect(
    component.container.querySelector(".test-results__data__divider")
      ?.textContent
  ).toEqual("/");

  expect(screen.queryAllByRole("button")).toHaveLength(0);
});
