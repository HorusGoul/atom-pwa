import * as React from "react";
import PtElementInfo from "./PtElementInfo";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IRON_ELEMENT from "../../data/elements/26.json";

import { IElement } from "@/Element";

const element = (IRON_ELEMENT as unknown) as IElement;

describe("PTElementInfo", () => {
  it("shows the elements atomic number", () => {
    render(<PtElementInfo element={element} />);

    expect(screen.getByText(element.atomic)).toBeInTheDocument();
  });

  it("shows the elements symbol", () => {
    render(<PtElementInfo element={element} />);

    expect(screen.getByText(element.symbol)).toBeInTheDocument();
  });

  it("shows the elements name", () => {
    render(<PtElementInfo element={element} />);

    expect(screen.getByText(element.name)).toBeInTheDocument();
  });

  it("adds the element group as a classname", () => {
    render(<PtElementInfo element={element} />);

    const name = `${element.atomic} ${element.symbol} ${element.name}`;
    expect(screen.getByRole("button", { name })).toHaveClass(element.group);
  });

  it("calls onClick when the element is clicked", () => {
    const onClick = jest.fn();
    render(<PtElementInfo element={element} onClick={onClick} />);

    userEvent.click(screen.getByText(element.name));

    expect(onClick).toHaveBeenCalledWith(element);
  });
});
