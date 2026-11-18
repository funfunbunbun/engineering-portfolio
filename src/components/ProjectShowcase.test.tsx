import { fireEvent, render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";
import ProjectShowcase from "./ProjectShowcase";

it("leads with the actual prototype and lets visitors select its circuit diagram", () => {
  render(<ProjectShowcase id="fpga-fan" />);
  const gallery = screen.getByRole("region", { name: "Project photos and outputs" });
  expect(within(gallery).getByRole("button", { name: /Enlarge:/ }).querySelector("img"))
    .toHaveAttribute("src", expect.stringContaining("fan-prototype.webp"));
  fireEvent.click(within(gallery).getByRole("button", { name: /Show: The original signal chain/ }));
  expect(within(gallery).getByRole("button", { name: /Enlarge:/ }).querySelector("img"))
    .toHaveAttribute("src", expect.stringContaining("fan-control-diagram.webp"));
  expect(within(gallery).getByRole("heading", { name: "Use case" })).toBeInTheDocument();
  expect(within(gallery).queryByText(/^Image \d+$/)).not.toBeInTheDocument();
  fireEvent.click(within(gallery).getByRole("button", { name: "Previous project media" }));
  expect(within(gallery).getByRole("button", { name: /Enlarge:/ }).querySelector("img"))
    .toHaveAttribute("src", expect.stringContaining("fan-prototype.webp"));
});

it("offers the real PLC recording before the simulated sequence", () => {
  render(<ProjectShowcase id="plc-sorting" />);
  const clip = screen.getByLabelText("Recorded PLC sorting machine demonstration");
  expect(clip.querySelector("source")).toHaveAttribute("src", expect.stringContaining("plc-sorting-demo.mp4"));
  expect(clip).toHaveAttribute("controls");
  expect(clip).not.toHaveAttribute("autoplay");
  fireEvent.click(screen.getByRole("button", { name: /Show: The pneumatic and electrical diagram/ }));
  expect(screen.queryByLabelText("Recorded PLC sorting machine demonstration")).not.toBeInTheDocument();
});
