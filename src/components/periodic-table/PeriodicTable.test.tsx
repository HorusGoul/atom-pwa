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

async function renderTable() {
  render(<PeriodicTable elementRenderer={elementRenderer} />);
  await waitForElementToBeRemoved(
    () => screen.queryAllByLabelText(/loading/i),
    { timeout: 4000 }
  );
}

describe("should render the periodic table", () => {
  beforeAll(() => {
    ElementManager.loadElements();
  });

  test("should show a spinner", async () => {
    const { container } = render(
      <PeriodicTable elementRenderer={elementRenderer} />
    );
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  test("should show all the elements of the periodic table", async () => {
    await renderTable();
    // periodic table has 118 elements as of now
    expect(screen.getAllByLabelText(/atomic-number/i)).toHaveLength(118);
  });
});
