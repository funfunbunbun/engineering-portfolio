import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import ProjectDeck from "./ProjectDeck";

it("browses projects manually with matching titles, positions and destinations", () => {
  render(<MemoryRouter><ProjectDeck /></MemoryRouter>);
  const deck = screen.getByRole("region", { name: "Featured projects" });
  const view = within(deck);
  expect(view.getByRole("link", { name: "View project" })).toHaveAttribute("href", "/projects/fpga-fan");
  fireEvent.click(view.getByRole("button", { name: "Next featured project" }));
  expect(view.getByRole("heading")).toHaveTextContent("Vehicle detection and speed estimation");
  expect(view.getByRole("link", { name: "View project" })).toHaveAttribute("href", "/projects/vehicle-velocity");
  expect(view.getByRole("status")).toHaveTextContent("project 2 of 5");
  fireEvent.click(view.getByRole("button", { name: "Show Smart classroom" }));
  expect(view.getByRole("button", { name: "Show Smart classroom" })).toHaveAttribute("aria-pressed", "true");
  fireEvent.keyDown(deck, { key: "ArrowLeft" });
  expect(view.getByRole("heading")).toHaveTextContent("Vehicle detection and speed estimation");
  fireEvent.click(view.getByRole("button", { name: "Previous featured project" }));
  fireEvent.click(view.getByRole("button", { name: "Previous featured project" }));
  expect(view.getByRole("link", { name: "View project" })).toHaveAttribute("href", "/projects/robot-recycling");
  fireEvent.keyDown(deck, { key: "ArrowRight" });
  expect(view.getByRole("heading")).toHaveTextContent("FPGA fan controller");
});
