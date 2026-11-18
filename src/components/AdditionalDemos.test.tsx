import { render, screen, fireEvent, act } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import HeartDemo from "./HeartDemo";
import { TrafficDemo, FloodDemo } from "./AdditionalDemos";

it("captures only after finger contact and clears the reading on removal", () => {
  vi.useFakeTimers();
  try {
    render(<HeartDemo engineering />);
    expect(
      screen.getByRole("button", { name: "Capture reading" }),
    ).toBeDisabled();
    fireEvent.change(screen.getByLabelText("Simulated heartbeat"), {
      target: { value: "slow" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Place finger" }));
    expect(
      screen.getByRole("button", { name: "Capture reading" }),
    ).toBeDisabled();
    act(() => vi.advanceTimersByTime(650));
    fireEvent.click(screen.getByRole("button", { name: "Capture reading" }));
    expect(screen.getByRole("status")).toHaveTextContent("Reading captured");
    expect(screen.getByRole("status")).toHaveTextContent("Bradycardia range");
    fireEvent.click(screen.getByRole("button", { name: "Remove finger" }));
    expect(screen.getByRole("status")).toHaveTextContent(
      "Place a finger to begin",
    );
    expect(
      screen.getByRole("button", { name: "Capture reading" }),
    ).toBeDisabled();
  } finally {
    vi.useRealTimers();
  }
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
