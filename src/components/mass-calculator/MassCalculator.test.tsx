import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MassCalculator from "./MassCalculator";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { IElement } from "@/Element";
import ElementManager, { getElementLocales } from "../../ElementManager";
import "hammerjs";

const elementsArr = [
  {
    atomic: 67,
    symbol: "Ho",
    name: "Holmium",
    atomicMass: "164.93032",
    cpkHexColor: "00FF9C",
    electronicConfiguration: "[Xe] 4f11 6s2",
    electronegativity: 1.23,
    atomicRadius: 226,
    ionRadius: "90.1 (+3)",
    vanDelWaalsRadius: 2,
    ionizationEnergy: 581,
    electronAffinity: -50,
    oxidationStates: "3",
    standardState: "solid",
    bondingType: "metallic",
    meltingPoint: "1747",
    boilingPoint: "2968",
    density: 8.8,
    group: "lanthanoids",
    yearDiscovered: 1878,
    valency: "+3",
    wrongValences: ["+1", "+2", "+2 +3", "+3 +5", "+2 +4"],
    testState: {
      valencesTest: false,
      ptTest: true,
    },
    realname: "abc",
  },
  {
    atomic: 16,
    symbol: "S",
    name: "Sulfur",
    atomicMass: "32.065",
    cpkHexColor: "FFFF30",
    electronicConfiguration: "[Ne] 3s2 3p4",
    electronegativity: 2.58,
    atomicRadius: 88,
    ionRadius: "184 (-2)",
    vanDelWaalsRadius: 180,
    ionizationEnergy: 1000,
    electronAffinity: -200,
    oxidationStates: "-2, -1, 1, 2, 3, 4, 5, 6",
    standardState: "solid",
    bondingType: "covalent_network",
    meltingPoint: "392.2",
    boilingPoint: "717.82",
    density: 1.96,
    group: "amphigens",
    yearDiscovered: 1878,
    valency: "+2 +4 +6 / -2",
    wrongValences: [
      "+1 +3 +5 +7 / -1",
      "+2 +4 +6",
      "+3 +5 / -3",
      "+3 +5",
      "+2 +6",
      "+2",
    ],
    testState: {
      valencesTest: true,
      ptTest: true,
    },
    realname: "abc",
  },
  {
    atomic: 44,
    symbol: "Ru",
    name: "Ruthenium",
    atomicMass: "101.07",
    cpkHexColor: "248F8F",
    electronicConfiguration: "[Kr] 4d7 5s1",
    electronegativity: 2.2,
    atomicRadius: 178,
    ionRadius: "68 (+3)",
    vanDelWaalsRadius: 188,
    ionizationEnergy: 710,
    electronAffinity: -101,
    oxidationStates: "-2, 1, 2, 3, 4, 5, 6, 7, 8",
    standardState: "solid",
    bondingType: "metallic",
    meltingPoint: "2610",
    boilingPoint: "4425",
    density: 12.37,
    group: "transition_metals",
    yearDiscovered: 1827,
    valency: "+2 +3 +4 +6 +8",
    wrongValences: [
      "+2 +3 +4 +5 +6 +8",
      "+2 +4 +6 +8",
      "+1 +3 +5 +7 / -1",
      "+1",
      "+2",
      "+2 +4",
      "+2 +3",
      "+1 +2",
    ],
    testState: {
      valencesTest: false,
      ptTest: true,
    },
    realname: "abc",
  },
];

beforeEach(() => {
  jest.clearAllMocks();
  jest
    .spyOn(ElementManager, "getElement")
    .mockImplementation((atomic) =>
      elementsArr.find((element) => element.atomic === atomic)
    );
});

test("should render component", () => {
  const history = createMemoryHistory({
    initialEntries: ["/mass-calculator"],
  });

  render(
    <Router history={history}>
      <MassCalculator />
    </Router>
  );

  expect(screen.getByText(/mass calculator/i)).toBeInTheDocument();
  expect(screen.getByText(/total/i)).toBeInTheDocument();
  expect(screen.getByText(/298\.06532 g \/ mol/i)).toBeInTheDocument();
  expect(screen.getByText(/add element/i)).toBeInTheDocument();
  expect(screen.getByText(/clear/i)).toBeInTheDocument();
  expect(screen.getByText(/holmium/i)).toBeInTheDocument();
  expect(screen.getByText(/164\.93032 g \/ mol/i)).toBeInTheDocument();
  expect(screen.getByText(/ruthenium/i)).toBeInTheDocument();
  expect(screen.getByText(/sulfur/i)).toBeInTheDocument();
  expect(screen.getByText(/32\.065 g \/ mol/i)).toBeInTheDocument();
});
