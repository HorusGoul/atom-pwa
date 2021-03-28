import * as React from "react";
import TestElementSettings from "./TestElementSettings";
import { render, screen } from "@testing-library/react";

const TEST_SETTING = {
  atomic: 26,
  enabled: true,
  stats: {
    right: 0,
    times: 0,
    wrong: 0,
  },
};

describe("TestElementSettings", () => {
  it("shows the expected data", () => {
    render(<TestElementSettings setting={TEST_SETTING} />);

    expect(screen.getByText("Fe")).toBeInTheDocument();
    expect(screen.getByText("26. Iron")).toBeInTheDocument();
    expect(screen.getByText("Transition metals")).toBeInTheDocument();
  });

  it("renders the setting disabled", () => {
    render(
      <TestElementSettings setting={{ ...TEST_SETTING, enabled: false }} />
    );

    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("renders the setting enabled", () => {
    render(
      <TestElementSettings setting={{ ...TEST_SETTING, enabled: true }} />
    );

    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});
