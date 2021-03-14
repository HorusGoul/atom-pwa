import * as React from "react";
import ElementInfo from "./ElementInfo";
import { render, screen } from "@testing-library/react";
import THALLIUM_ELEMENT from "@/data/elements/81.json";
import { IElement } from "@/Element";

const element = (THALLIUM_ELEMENT as unknown) as IElement;

function testElement(elementProperty: string | number) {
  expect(screen.getByText(`${elementProperty}`)).toBeInTheDocument();
}

describe("should show element information", () => {
  test("should show the element name", () => {
    render(<ElementInfo element={element} />);
    testElement(element.name);
  });

  test("should show the atomic number of the element ", () => {
    render(<ElementInfo element={element} />);

    expect(screen.getByText(/atomic number/i)).toBeInTheDocument();
    testElement(element.atomic);
  });
  test("should show the symbol of the element ", () => {
    render(<ElementInfo element={element} />);

    expect(screen.getByText(/symbol/i)).toBeInTheDocument();
    testElement(element.symbol);
  });
  test("should show the atomic mass number of the element ", () => {
    render(<ElementInfo element={element} />);
    expect(screen.getByText(/atomic number/i)).toBeInTheDocument();
    expect(screen.getByText(/204\.3833 g \/ mol/i)).toBeInTheDocument();
  });

  test("should show the electronic configuraion of the element ", () => {
    render(<ElementInfo element={element} />);

    expect(screen.getByText(/electronic c/i));
    testElement(element.electronicConfiguration);
  });

  test("should show the electronegativity of the element ", () => {
    render(<ElementInfo element={element} />);

    expect(screen.getByText(/electronegativity/i)).toBeInTheDocument();
    testElement(element.electronegativity);
  });

  test("should show the atomic radius of the element ", () => {
    render(<ElementInfo element={element} />);

    expect(screen.getByText(/atomic radius/i)).toBeInTheDocument();
    expect(screen.getByText(/156 pm/i)).toBeInTheDocument();
  });

  test("should show the ion radius of the element ", () => {
    render(<ElementInfo element={element} />);

    expect(screen.getByText(/ionic radius/i)).toBeInTheDocument();
    expect(screen.getByText(/150 \(\+1\) pm/i)).toBeInTheDocument();
  });

  test("should show the Van Del Waals radius of the element ", () => {
    render(<ElementInfo element={element} />);

    expect(screen.getByText(/van der waals radius/i)).toBeInTheDocument();
    expect(screen.getByText(/196 pm/i)).toBeInTheDocument();
  });

  test("should show the ionization energy of the element ", () => {
    render(<ElementInfo element={element} />);

    expect(screen.getByText(/ionization energy/i)).toBeInTheDocument();
    expect(screen.getByText(/196 pm/i)).toBeInTheDocument();
  });

  test("should show the electron affinity of the element ", () => {
    render(<ElementInfo element={element} />);

    expect(screen.getByText(/electron affinity/i)).toBeInTheDocument();
    testElement(element.electronAffinity);
  });

  test("should show the oxidiation states of the element ", () => {
    render(<ElementInfo element={element} />);

    expect(screen.getByText(/oxidation states/i)).toBeInTheDocument();
    testElement(element.oxidationStates);
  });
});
