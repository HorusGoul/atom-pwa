import * as React from "react";
import ElementInfo from "./ElementInfo";
import { render, screen } from "@testing-library/react";

const myElement = {
  atomic: 81,
  symbol: "Tl",
  name: "Thallium",
  atomicMass: "204.3833",
  cpkHexColor: "A6544D",
  electronicConfiguration: "[Xe] 4f14 5d10 6s2 6p1",
  electronegativity: 2.04,
  atomicRadius: 156,
  ionRadius: "150 (+1)",
  vanDelWaalsRadius: 196,
  ionizationEnergy: 589,
  electronAffinity: -19,
  oxidationStates: "1, 3",
  standardState: "solid",
  bondingType: "metallic",
  meltingPoint: "577",
  boilingPoint: "1746",
  density: 11.85,
  group: "basic_metals",
  yearDiscovered: 1861,
  valency: "+1 +3",
  wrongValences: ["+2 +4", "+1 +2", "+2 +3", "+1 +3 +5", "+2 +4 +6", "-1"],
  testState: {
    valencesTest: true,
    ptTest: true,
  },
};
function testElement(elementProperty: string | number) {
  expect(screen.getByText(`${elementProperty}`)).toBeInTheDocument();
}

describe("should show element information", () => {
  test("should show the element name", () => {
    render(<ElementInfo element={myElement} />);
    testElement(myElement.name);
  });

  test("should show the atomic number of the element ", () => {
    render(<ElementInfo element={myElement} />);

    expect(screen.getByText(/atomic number/i)).toBeInTheDocument();
    testElement(myElement.atomic);
  });
  test("should show the symbol of the element ", () => {
    render(<ElementInfo element={myElement} />);

    expect(screen.getByText(/symbol/i)).toBeInTheDocument();
    testElement(myElement.symbol);
  });
  test("should show the atomic mass number of the element ", () => {
    render(<ElementInfo element={myElement} />);
    expect(screen.getByText(/atomic number/i)).toBeInTheDocument();
    expect(screen.getByText(/204\.3833 g \/ mol/i)).toBeInTheDocument();
  });

  test("should show the electronic configuraion of the element ", () => {
    render(<ElementInfo element={myElement} />);

    expect(screen.getByText(/electronic c/i));
    testElement(myElement.electronicConfiguration);
  });

  test("should show the electronegativity of the element ", () => {
    render(<ElementInfo element={myElement} />);

    expect(screen.getByText(/electronegativity/i)).toBeInTheDocument();
    testElement(myElement.electronegativity);
  });

  test("should show the atomic radius of the element ", () => {
    render(<ElementInfo element={myElement} />);

    expect(screen.getByText(/atomic radius/i)).toBeInTheDocument();
    expect(screen.getByText(/156 pm/i)).toBeInTheDocument();
  });

  test("should show the ion radius of the element ", () => {
    render(<ElementInfo element={myElement} />);

    expect(screen.getByText(/ionic radius/i)).toBeInTheDocument();
    expect(screen.getByText(/150 \(\+1\) pm/i)).toBeInTheDocument();
  });

  test("should show the Van Del Waals radius of the element ", () => {
    render(<ElementInfo element={myElement} />);

    expect(screen.getByText(/van der waals radius/i)).toBeInTheDocument();
    expect(screen.getByText(/196 pm/i)).toBeInTheDocument();
  });

  test("should show the ionization energy of the element ", () => {
    render(<ElementInfo element={myElement} />);

    expect(screen.getByText(/ionization energy/i)).toBeInTheDocument();
    expect(screen.getByText(/196 pm/i)).toBeInTheDocument();
  });

  test("should show the electron affinity of the element ", () => {
    render(<ElementInfo element={myElement} />);

    expect(screen.getByText(/electron affinity/i)).toBeInTheDocument();
    testElement(myElement.electronAffinity);
  });

  test("should show the oxidiation states of the element ", () => {
    render(<ElementInfo element={myElement} />);

    expect(screen.getByText(/oxidation states/i)).toBeInTheDocument();
    testElement(myElement.oxidationStates);
  });
});
