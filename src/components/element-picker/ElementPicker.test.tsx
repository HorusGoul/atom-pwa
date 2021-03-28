import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ElementPicker from "./ElementPicker";

test("search for Neon", () => {
  const onElement = jest.fn();

  render(<ElementPicker onElement={onElement} />);
  expect(screen.getByText("Helium")).toBeVisible();

  userEvent.type(screen.getByRole("textbox"), "Neon");
  expect(screen.queryByText("Helium")).not.toBeInTheDocument();

  userEvent.click(screen.getByText("Noble gases"));

  expect(onElement).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "Neon",
    })
  );
});

test("search for atomic number 118", () => {
  const onElement = jest.fn();

  render(<ElementPicker onElement={onElement} />);

  userEvent.type(screen.getByRole("textbox"), "118");

  userEvent.click(screen.getByText("Oganesson"));

  expect(onElement).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "Oganesson",
    })
  );
});

test("search for atomic number 25", async () => {
  const onElement = jest.fn();

  render(<ElementPicker onElement={onElement} />);

  userEvent.type(screen.getByRole("textbox"), "25");
  expect(screen.getByRole("textbox")).toHaveValue("25");

  userEvent.click(await screen.findByText("Manganese"));

  expect(onElement).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "Manganese",
    })
  );
});
