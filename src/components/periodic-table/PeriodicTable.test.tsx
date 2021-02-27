import * as React from "react";
import PeriodicTable, { IPeriodicTableElement } from "./PeriodicTable";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import PtElementInfo from "../pt-element/PtElementInfo";
import ElementManager from "../../ElementManager";

function elementRenderer(atomic: number): IPeriodicTableElement {
  return {
    // @ts-ignore fix this
    component: PtElementInfo,
    props: {
      element: ElementManager.getElement(atomic),
      onClick: undefined,
    },
  };
}

describe("should render the periodic table", () => {
  beforeAll(() => {
    ElementManager.loadElements();
  });

  test("should show a spinner", async () => {
    const { container } = render(
      <PeriodicTable elementRenderer={elementRenderer} />
    );
    // expect(container.querySelector("svg")).toBeInTheDocument();
    expect(screen.getByLabelText(/loading-spinner/i)).toBeInTheDocument();
  });

  test("should show the periodic table", async () => {
    const { container } = render(
      <PeriodicTable elementRenderer={elementRenderer} />
    );
    await waitForElementToBeRemoved(container.querySelector("svg"));
    expect(screen.getByText(/hydrogen/i)).toBeInTheDocument();
  });
});
