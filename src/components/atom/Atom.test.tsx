import * as React from "react";
import { render } from "@testing-library/react";
import cases from "jest-in-case";
import Atom, { colors, AtomColorVariant, ColorMap } from "./Atom";

cases(
  "should apply the colors correctly",
  ({ colorKey }: { colorKey: AtomColorVariant }) => {
    const { container } = render(<Atom color={colorKey} />);

    const circle = container.querySelector("div > svg > g > circle");
    const getEllipse = (idx: number) =>
      container.querySelector(`div > svg > g > ellipse:nth-child(${idx})`);

    expect(circle?.getAttribute("fill")).toEqual(colors[colorKey].main);
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
