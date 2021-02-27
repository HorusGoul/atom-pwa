import * as React from "react";
import { render, screen } from "@testing-library/react";
import PtElementTest from "./PtElementTest";
import IRON_ELEMENT from "../../data/elements/26.json";

describe("PtElementTest", () => {
  describe("when discovered", () => {
    it("shows the elements atomic number", () => {
      render(<PtElementTest element={IRON_ELEMENT} discovered />);

      expect(screen.getByText(IRON_ELEMENT.atomic)).toBeInTheDocument();
    });

    it("shows the elements symbol", () => {
      render(<PtElementTest element={IRON_ELEMENT} discovered />);

      expect(screen.getByText(IRON_ELEMENT.symbol)).toBeInTheDocument();
    });

    it("shows the elements name", () => {
      render(<PtElementTest element={IRON_ELEMENT} discovered />);

      expect(screen.getByText(IRON_ELEMENT.name)).toBeInTheDocument();
    });
  });

  describe("when not discovered", () => {
    it("shows only the element atomic number", () => {
      render(<PtElementTest element={IRON_ELEMENT} discovered={false} />);

      expect(screen.getByText(IRON_ELEMENT.atomic)).toBeInTheDocument();
      expect(screen.queryByText(IRON_ELEMENT.symbol)).not.toBeInTheDocument();
      expect(screen.queryByText(IRON_ELEMENT.name)).not.toBeInTheDocument();
    });

    it("shows a placeholder", () => {
      render(<PtElementTest element={IRON_ELEMENT} discovered={false} />);

      expect(screen.getByText("?")).toBeInTheDocument();
      expect(screen.getByText("???")).toBeInTheDocument();
    });
  });
});
