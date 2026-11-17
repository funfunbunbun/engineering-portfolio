import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it } from "vitest";
import Classroom from "./Classroom";

it("updates decisions and event history and resets inputs and outputs", () => {
  render(<Classroom engineering />);
  fireEvent.change(screen.getByRole("slider", { name: /Temperature/ }), {
    target: { value: "32" },
  });
  expect(screen.getByText("Running")).toBeInTheDocument();
  expect(screen.getByText("Fan on")).toBeInTheDocument();
  fireEvent.change(screen.getByRole("slider", { name: /Occupancy/ }), {
    target: { value: "0" },
  });
  expect(screen.getByText("Standby")).toBeInTheDocument();
  expect(screen.getByText("Fan off")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Reset simulation" }));
  expect(screen.getByRole("slider", { name: /Temperature/ })).toHaveValue("25");
  expect(screen.getByRole("slider", { name: /Occupancy/ })).toHaveValue("12");
  expect(screen.getByText("Simulation reset to defaults.")).toBeInTheDocument();
  expect(screen.queryByText("Fan on")).not.toBeInTheDocument();
});
