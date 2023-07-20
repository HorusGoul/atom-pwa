import * as React from "react";
import { screen } from "@testing-library/react";
import { render } from "@/test-utils";
import userEvent from "@testing-library/user-event";
import MassCalculator from "./MassCalculator";
import "hammerjs";

test("should render mass calculator", () => {
  render(<MassCalculator />, {
    initialHistoryEntries: ["/mass-calculator"],
  });

  expect(screen.getByText(/mass calculator/i)).toBeInTheDocument();
  expect(screen.getByText(/total/i)).toBeInTheDocument();
  expect(screen.getByText(/298\.06532 g \/ mol/i)).toBeInTheDocument();
  expect(screen.getByText(/add element/i)).toBeInTheDocument();
  expect(screen.getByText(/clear/i)).toBeInTheDocument();
  expect(screen.getByText(/holmium/i)).toBeInTheDocument();
  expect(screen.getByText(/164\.93032 g \/ mol/i)).toBeInTheDocument();
});

test("should clear elements", () => {
  render(<MassCalculator />, {
    initialHistoryEntries: ["/mass-calculator"],
  });

  userEvent.click(screen.getByText(/clear/i));
  expect(screen.getByText(/0 g \/ mol/i)).toBeInTheDocument();
  expect(screen.queryByText(/holmium/i)).not.toBeInTheDocument();
});

test("should add elements and verify total mass", () => {
  render(<MassCalculator />, {
    initialHistoryEntries: ["/mass-calculator"],
  });

  // clear elements
  userEvent.click(screen.getByText(/clear/i));

  // add element
  userEvent.click(screen.getByText(/add element/i));

  expect(screen.getByRole("textbox")).toBeInTheDocument();

  userEvent.click(screen.getAllByText(/hydrogen/i)[0]);

  // adding another element
  userEvent.click(screen.getByText(/add element/i));
  userEvent.type(screen.getByRole("textbox"), "oxygen");

  userEvent.click(screen.getAllByText(/oxygen/i)[0]);

  userEvent.click(screen.getAllByText(/hydrogen/i)[0]);
  userEvent.clear(screen.getByDisplayValue("1"));
  userEvent.type(screen.getByDisplayValue("0"), "2");

  userEvent.click(screen.getAllByRole("button")[5]);

  //verify total mass of H2O(water)
  expect(screen.getByText(/18\.01528 g \/ mol/i)).toBeInTheDocument();
});

test("should be able to increase and decrease element amount with icons", () => {
  render(<MassCalculator />, {
    initialHistoryEntries: ["/mass-calculator"],
  });

  // clear elements
  userEvent.click(screen.getByText(/clear/i));

  // add element
  userEvent.click(screen.getByText(/add element/i));

  userEvent.click(screen.getAllByText(/hydrogen/i)[0]);

  // open increase amount modal
  userEvent.click(screen.getAllByText(/hydrogen/i)[0]);

  // verify initial amount of Hydrogen
  expect(screen.getByDisplayValue("1")).toBeInTheDocument();

  // Click + icon
  userEvent.click(screen.getAllByRole("button")[6]);

  // Verify amount is increased
  expect(screen.getByDisplayValue("2")).toBeInTheDocument();

  // Click - icon
  userEvent.click(screen.getAllByRole("button")[5]);

  expect(screen.getByDisplayValue("1")).toBeInTheDocument();
});

test("should increase element amount by +1 if user add same element again", () => {
  render(<MassCalculator />, {
    initialHistoryEntries: ["/mass-calculator"],
  });

  // clear elements
  userEvent.click(screen.getByText(/clear/i));

  // add element
  userEvent.click(screen.getByText(/add element/i));

  userEvent.click(screen.getAllByText(/hydrogen/i)[0]);

  // open add element modal again
  userEvent.click(screen.getByText(/add element/i));

  // add hydrogen again
  userEvent.click(screen.getAllByText(/hydrogen/i)[2]);

  // Verify total mass of 2 atoms of Hydrogen
  expect(screen.getByText(/2\.01588 g \/ mol/i)).toBeInTheDocument();
});

test("should navigate back", () => {
  const { route } = render(<MassCalculator />, {
    initialHistoryEntries: ["/mass-calculator"],
  });

  userEvent.click(screen.getAllByRole("button")[0]);
  expect(route.location.pathname).toBe("/");
});

test("should not allow user to add negative amounts", () => {
  render(<MassCalculator />, {
    initialHistoryEntries: ["/mass-calculator"],
  });

  // clear elements
  userEvent.click(screen.getByText(/clear/i));

  // add element
  userEvent.click(screen.getByText(/add element/i));

  userEvent.click(screen.getAllByText(/hydrogen/i)[0]);

  // open increase amount modal
  userEvent.click(screen.getAllByText(/hydrogen/i)[0]);

  // verify initial amount of Hydrogen
  expect(screen.getByDisplayValue("1")).toBeInTheDocument();

  // Click - icon
  userEvent.click(screen.getAllByRole("button")[5]);

  expect(screen.getByDisplayValue("0")).toBeInTheDocument();

  userEvent.click(screen.getAllByRole("button")[5]);

  // Click again on - icon
  expect(screen.getByDisplayValue("0")).toBeInTheDocument();
});

test("should be able to close add element modal by clicking on overlay", () => {
  render(<MassCalculator />, {
    initialHistoryEntries: ["/mass-calculator"],
  });

  // clear elements
  userEvent.click(screen.getByText(/clear/i));

  // add element
  userEvent.click(screen.getByText(/add element/i));

  // close add elements modal by clicking on overlay
  userEvent.click(screen.getByTestId("overlay"));
});
