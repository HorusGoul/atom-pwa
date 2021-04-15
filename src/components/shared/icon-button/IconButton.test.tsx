import * as React from "react";
import { screen } from "@testing-library/react";
import { render } from "@/test-utils";
import IconButton from "./IconButton";

test("should render IconButton without text", () => {
  const { container } = render(<IconButton iconName="replay" />);

  expect(screen.queryAllByRole("button")).toHaveLength(1);
  expect(container.querySelector(".icon-button__text")).toBeNull();
});

test("should render IconButton with text", () => {
  const { container } = render(
    <IconButton iconName="replay" text="Retake full test" />
  );

  expect(container.querySelector(".icon-button__text")?.textContent).toEqual(
    "Retake full test"
  );
});
