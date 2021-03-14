import * as React from "react";
import { render, screen } from "@testing-library/react";
import PtElementTest from "./PtElementTest";
import IRON_ELEMENT from "../../data/elements/26.json";
import { IElement } from "@/Element";

const element = (IRON_ELEMENT as unknown) as IElement;

describe("PtElementTest", () => {
  describe("when discovered", () => {
    it("shows the elements atomic number", () => {
      render(
        <PtElementTest element={element} shouldShowError={false} discovered />
      );

      expect(screen.getByText(element.atomic)).toBeInTheDocument();
    });

    it("shows the elements symbol", () => {
      render(
        <PtElementTest element={element} shouldShowError={false} discovered />
      );

      expect(screen.getByText(element.symbol)).toBeInTheDocument();
    });

    it("shows the elements name", () => {
      render(
        <PtElementTest element={element} shouldShowError={false} discovered />
      );

      expect(screen.getByText(element.name)).toBeInTheDocument();
    });
  });

  describe("when not discovered", () => {
    it("shows only the element atomic number", () => {
      render(
        <PtElementTest
          element={element}
          shouldShowError={false}
          discovered={false}
        />
      );

      expect(screen.getByText(element.atomic)).toBeInTheDocument();
      expect(screen.queryByText(element.symbol)).not.toBeInTheDocument();
      expect(screen.queryByText(element.name)).not.toBeInTheDocument();
    });

    it("shows a placeholder", () => {
      render(
        <PtElementTest
          element={element}
          shouldShowError={false}
          discovered={false}
        />
      );

      expect(screen.getByText("?")).toBeInTheDocument();
      expect(screen.getByText("???")).toBeInTheDocument();
    });
  });
});
