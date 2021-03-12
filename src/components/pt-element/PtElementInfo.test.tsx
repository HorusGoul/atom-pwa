import * as React from "react";
import PtElementInfo from "./PtElementInfo";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IRON_ELEMENT from "../../data/elements/26.json";

describe("PTElementInfo", () => {
  it("shows the elements atomic number", () => {
    render(<PtElementInfo element={IRON_ELEMENT} />);

    expect(screen.getByText(IRON_ELEMENT.atomic)).toBeInTheDocument();
  });

  it("shows the elements symbol", () => {
    render(<PtElementInfo element={IRON_ELEMENT} />);

    expect(screen.getByText(IRON_ELEMENT.symbol)).toBeInTheDocument();
  });

  it("shows the elements name", () => {
    render(<PtElementInfo element={IRON_ELEMENT} />);

    expect(screen.getByText(IRON_ELEMENT.name)).toBeInTheDocument();
  });

  it("adds the element group as a classname", () => {
    render(<PtElementInfo element={IRON_ELEMENT} />);

    const name = `${IRON_ELEMENT.atomic} ${IRON_ELEMENT.symbol} ${IRON_ELEMENT.name}`;
    expect(screen.getByRole("button", { name })).toHaveClass(
      IRON_ELEMENT.group
    );
  });

  it("calls onClick when the element is clicked", () => {
    const onClick = jest.fn();
    render(<PtElementInfo element={IRON_ELEMENT} onClick={onClick} />);

    userEvent.click(screen.getByText(IRON_ELEMENT.name));

    expect(onClick).toHaveBeenCalledWith(IRON_ELEMENT);
  });
});
