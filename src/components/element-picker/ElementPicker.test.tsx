import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ElementPicker from "./ElementPicker";

test("search for Neon", () => {
  const onElement = jest.fn();

  render(<ElementPicker onElement={onElement} />);
  expect(screen.getByText("Fermium")).toBeVisible();

  userEvent.type(screen.getByRole("textbox"), "Neon");
  expect(screen.queryByText("Fermium")).not.toBeInTheDocument();

  userEvent.click(screen.getByText("Noble gases"));

  expect(onElement).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "Neon",
    })
  );
});

test("search for atomic number 2", () => {
  const onElement = jest.fn();

  render(<ElementPicker onElement={onElement} />);

  userEvent.type(screen.getByRole("textbox"), "2");

  userEvent.click(screen.getByText("Helium"));

  expect(onElement).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "Helium",
    })
  );
});

// TODO: unskip when https://github.com/HorusGoul/atom-pwa/issues/27 is fixed
test.skip("search for atomic number 25", async () => {
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
