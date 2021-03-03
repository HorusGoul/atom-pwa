import * as React from "react";
import { render } from "@testing-library/react";
import cases from "jest-in-case";
import Atom, { colors, AtomColorVariant, ColorMap } from "./Atom";

cases(
  "should apply the colors correctly",
  ({ colorKey }: { colorKey: AtomColorVariant }) => {
    const { container } = render(<Atom color={colorKey} />);

    // Selecting the circle within svg element which represents an atom.
    const circle = container.querySelector("div > svg > g > circle");

    expect(circle?.getAttribute("fill")).toEqual(colors[colorKey].main);

    // Selecting the ellipse (Which is something similar to a circle.) within svg element which represents an atom.
    const getEllipse = (idx: number) =>
      container.querySelector(`div > svg > g > ellipse:nth-child(${idx})`);

    expect(getEllipse(2)?.getAttribute("stroke")).toEqual(
      colors[colorKey].dark
    );
    expect(getEllipse(3)?.getAttribute("stroke")).toEqual(
      colors[colorKey].main
    );
    expect(getEllipse(4)?.getAttribute("stroke")).toEqual(
      colors[colorKey].light
    );
  },
  (Object.keys(colors) as (keyof ColorMap)[]).map((colorKey) => ({
    colorKey,
  }))
);
