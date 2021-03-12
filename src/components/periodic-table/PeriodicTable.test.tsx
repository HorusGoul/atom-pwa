import * as React from "react";
import PeriodicTable, { IPeriodicTableElement } from "./PeriodicTable";
import {
  render,
  screen,
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
  test("should show a spinner", async () => {
    render(<PeriodicTable elementRenderer={elementRenderer} />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  test("should show all the elements of the periodic table", async () => {
    render(<PeriodicTable elementRenderer={elementRenderer} />);
    await waitForElementToBeRemoved(
      () => screen.queryAllByLabelText(/loading/i),
      { timeout: 4000 }
    );

    const elements = ElementManager.getElements();

    elements.forEach((element) => {
      expect(screen.getByText(element.name)).toBeInTheDocument();
    });
  });
});
