import { render, screen, fireEvent, act } from "@testing-library/react";
import { it, expect, vi } from "vitest";
import NanoDemo from "./NanoDemo";
it("buffers input until Enter, shows the response, and cancels a pending input on reset", () => {
  vi.useFakeTimers();
  try {
    render(<NanoDemo />);
    fireEvent.click(screen.getByRole("button", { name: "4" }));
    fireEvent.click(screen.getByRole("button", { name: "2" }));
    fireEvent.click(screen.getByRole("button", { name: "Enter" }));
    expect(
      screen.getByRole("status", { name: "Nano message" }),
    ).toHaveTextContent("Sending");
    act(() => vi.advanceTimersByTime(1100));
    expect(screen.getByText("Input received")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset demo" }));
    act(() => vi.advanceTimersByTime(2000));
    expect(
      screen.getByRole("status", { name: "Nano message" }),
    ).toHaveTextContent("Ready");
    expect(screen.queryByText("Input received")).not.toBeInTheDocument();
  } finally {
    vi.useRealTimers();
  }
});
