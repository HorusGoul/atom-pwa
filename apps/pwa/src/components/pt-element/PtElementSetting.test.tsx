import * as React from "react";
import PtElementSetting from "./PtElementSetting";
import { screen } from "@testing-library/react";
import { render } from "@/test-utils";
import userEvent from "@testing-library/user-event";
import IRON_ELEMENT from "@/data/elements/26.json";

import { Element } from "@/Element";

const element = (IRON_ELEMENT as unknown) as Element;

describe("PtElementSetting", () => {
  it("shows the elements atomic number", () => {
    render(<PtElementSetting element={element} />);

    expect(screen.getByText(element.atomic)).toBeInTheDocument();
  });

  it("shows the elements symbol", () => {
    render(<PtElementSetting element={element} />);

    const symbolElements = screen.getAllByText(element.symbol);

    for (const symbolElement of symbolElements) {
      expect(symbolElement).toBeInTheDocument();
    }
  });

  it("shows the elements name", () => {
    render(<PtElementSetting element={element} />);

    expect(screen.getByText(element.name)).toBeInTheDocument();
  });

  it("adds the element group as a classname", () => {
    render(<PtElementSetting element={element} />);

    expect(
      screen.getByRole("checkbox", {
        name: `${element.atomic}. ${element.name}`,
      })
    ).toHaveClass(element.group);
  });

  it("calls onClick when the element is clicked", () => {
    const onClick = vi.fn();
    render(<PtElementSetting element={element} onClick={onClick} />);

    userEvent.click(screen.getByText(element.name));

    expect(onClick).toHaveBeenCalledWith(element);
  });
});
