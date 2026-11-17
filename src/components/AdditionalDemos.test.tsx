import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { expect, it } from "vitest";
import { HeartDemo, TrafficDemo, FloodDemo } from "./AdditionalDemos";

it("requires presence and finger contact before the illustrative capture, and resets", () => {
  render(<HeartDemo engineering />);
  expect(
    screen.getByRole("button", { name: "Simulate capture" }),
  ).toBeDisabled();
  expect(
    screen.getByRole("checkbox", { name: "Finger on sensor" }),
  ).toBeDisabled();
  fireEvent.click(screen.getByRole("checkbox", { name: "Visitor present" }));
  fireEvent.click(screen.getByRole("checkbox", { name: "Finger on sensor" }));
  fireEvent.click(screen.getByRole("button", { name: "Simulate capture" }));
  expect(screen.getByText("Illustrative capture complete")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Reset simulation" }));
  expect(
    screen.getByRole("checkbox", { name: "Visitor present" }),
  ).not.toBeChecked();
  expect(
    screen.getByRole("button", { name: "Simulate capture" }),
  ).toBeDisabled();
});
it("never allows the pedestrian to cross while traffic has green or amber", () => {
  render(<TrafficDemo engineering />);
  fireEvent.click(screen.getByRole("button", { name: "Request crossing" }));
  expect(screen.getByLabelText("Traffic signal: Amber")).toBeInTheDocument();
  for (let i = 0; i < 8; i++) {
    const crossing = screen.queryByText("Pedestrian: Cross");
    if (crossing)
      expect(screen.getByLabelText("Traffic signal: Red")).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: /Next phase|Request crossing/ }),
    );
  }
  fireEvent.click(screen.getByRole("button", { name: "Reset simulation" }));
  expect(screen.getByLabelText("Traffic signal: Green")).toBeInTheDocument();
});
it("switches the illustrative pump at the stated threshold and resets", () => {
  render(<FloodDemo engineering />);
  const slider = screen.getByRole("slider", { name: /Water level/ });
  fireEvent.change(slider, { target: { value: "59" } });
  expect(screen.getByText("Pump standby")).toBeInTheDocument();
  fireEvent.change(slider, { target: { value: "60" } });
  expect(screen.getByText("Pump on")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Reset simulation" }));
  expect(slider).toHaveValue("30");
  expect(screen.getByText("Pump standby")).toBeInTheDocument();
});
