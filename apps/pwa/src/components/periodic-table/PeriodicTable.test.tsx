import * as React from "react";
import PeriodicTable from "./PeriodicTable";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import PtElementInfo from "@/components/pt-element/PtElementInfo";
import { Element } from "@/Element";
import { render } from "@/test-utils";

const elementsMap = import.meta.globEager("../../data/elements/*.json");
const elements = Object.values(elementsMap) as Element[];

function elementRenderer(atomic: number) {
  const element = elements.find((element) => element.atomic === atomic);
  if (!element) return null;
  return <PtElementInfo element={element} />;
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

    elements.forEach((element) => {
      expect(screen.getByText(element.name)).toBeInTheDocument();
    });
  });
});
