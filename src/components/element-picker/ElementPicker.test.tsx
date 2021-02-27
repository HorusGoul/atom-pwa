import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import elementManager from "../../ElementManager";
import ElementPicker from "./ElementPicker";

beforeAll(() => {
  elementManager.loadElements();
});

test("search for Neon", () => {
  const onElement = jest.fn();

  render(<ElementPicker onElement={onElement} />);
  expect(screen.getByText("Fermium")).toBeVisible();

  userEvent.type(screen.getByRole("textbox"), "Neon");
  expect(screen.queryByText("Fermium")).not.toBeInTheDocument();

  userEvent.click(screen.getByText("Noble gases"));

  const neon = elementManager.getElement(10);
  expect(onElement).toHaveBeenCalledWith(neon);
});

test("search for atomic number 2", () => {
  const onElement = jest.fn();

  render(<ElementPicker onElement={onElement} />);

  userEvent.type(screen.getByRole("textbox"), "2");

  userEvent.click(screen.getByText("Helium"));

  const helium = elementManager.getElement(2);
  expect(onElement).toHaveBeenCalledWith(helium);
});

// TODO: unskip when https://github.com/HorusGoul/atom-pwa/issues/27 is fixed
test.skip("search for atomic number 25", async () => {
  const onElement = jest.fn();

  render(<ElementPicker onElement={onElement} />);

  userEvent.type(screen.getByRole("textbox"), "25");
  expect(screen.getByRole("textbox")).toHaveValue("25");

  userEvent.click(await screen.findByText("Manganese"));

  const manganese = elementManager.getElement(25);
  expect(onElement).toHaveBeenCalledWith(manganese);
});
