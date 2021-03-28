import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import Checkbox, { CheckboxProps } from "./Checkbox";

const onChangeMock = jest.fn();

test("should render checkbox with default state", () => {
  const { container } = render(<Checkbox />);

  expect(
    container.querySelector(".checkbox__input")?.getAttribute("checked")
  ).toBeNull();
  expect(container.querySelector(".checkbox__label")).toBeNull();
});

test("should render checkbox with given custom props and perform some validations", () => {
  const props: CheckboxProps = {
    readOnly: true,
    value: true,
    onChange: onChangeMock,
  };
  const { container } = render(<Checkbox {...props} />);

  expect(
    container.querySelector(".checkbox__input")?.getAttribute("checked")
  ).toStrictEqual("");

  const checkboxInput = container.querySelector(
    ".checkbox__input"
  ) as HTMLInputElement;
  fireEvent.click(checkboxInput);
  expect(onChangeMock).toHaveBeenCalledTimes(0);

  fireEvent.click(checkboxInput, { checked: false });
  expect(onChangeMock).toHaveBeenCalledTimes(0);
});

test("should invoke onChange on checkbox", () => {
  const props: CheckboxProps = {
    value: true,
    onChange: onChangeMock,
  };
  const { container } = render(<Checkbox {...props} />);

  expect(
    container.querySelector(".checkbox__input")?.getAttribute("checked")
  ).toStrictEqual("");

  const checkboxInput = container.querySelector(
    ".checkbox__input"
  ) as HTMLInputElement;

  fireEvent.click(checkboxInput, { checked: false });
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith(false);
});

test("should invoke onChange on checkbox", () => {
  const props: CheckboxProps = {
    value: true,
    onChange: onChangeMock,
  };
  const { container } = render(
    <Checkbox {...props}>
      <label>Test</label>
    </Checkbox>
  );

  expect(container.querySelector(".checkbox__label")?.textContent).toEqual(
    "Test"
  );
});
