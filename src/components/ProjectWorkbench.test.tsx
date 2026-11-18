import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it } from "vitest";
import ProjectWorkbench from "./ProjectWorkbench";
it("validates terminal actions and clears the session on reset", () => {
  render(<ProjectWorkbench id="atm-interface" />);
  fireEvent.change(screen.getByRole("spinbutton"), {
    target: { value: "200" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Withdraw credits" }));
  expect(screen.getByRole("status")).toHaveTextContent("Insufficient");
  fireEvent.click(screen.getByRole("button", { name: "Deposit credits" }));
  expect(screen.getByText("300.00")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Reset simulation" }));
  expect(screen.getByText("100.00")).toBeInTheDocument();
});
it("restores the CAD groups and resets the exploded view", () => {
  render(<ProjectWorkbench id="trolley-cad" />);
  fireEvent.click(screen.getByRole("checkbox", { name: "Basket" }));
  fireEvent.change(screen.getByRole("slider", { name: /Explode/ }), {
    target: { value: "100" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Reset simulation" }));
  expect(screen.getByRole("checkbox", { name: "Basket" })).toBeChecked();
  expect(screen.getByRole("slider")).toHaveValue("0");
});
