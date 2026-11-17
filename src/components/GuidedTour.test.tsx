import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it, vi, afterEach } from "vitest";
import GuidedTour from "./GuidedTour";
import { projects } from "../data/projects";

afterEach(() => vi.unstubAllGlobals());
it("starts silently, narrates only on opt-in, and cancels on exit and unmount", () => {
  const speak = vi.fn();
  const cancel = vi.fn();
  vi.stubGlobal("speechSynthesis", {
    speak,
    cancel,
    pause: vi.fn(),
    resume: vi.fn(),
  });
  vi.stubGlobal(
    "SpeechSynthesisUtterance",
    class {
      text: string;
      constructor(text: string) {
        this.text = text;
      }
    },
  );
  const { unmount } = render(<GuidedTour project={projects[1]} />);
  expect(speak).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button", { name: /Start guided tour/ }));
  expect(speak).not.toHaveBeenCalled();
  expect(screen.getByText(projects[1].tour[0].text)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Enable narration" }));
  expect(speak).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole("button", { name: "Next" }));
  expect(speak).toHaveBeenCalledTimes(2);
  fireEvent.click(screen.getByRole("button", { name: /Exit tour/ }));
  expect(cancel).toHaveBeenCalled();
  cancel.mockClear();
  unmount();
  expect(cancel).toHaveBeenCalled();
});

it("retains a complete manual tour when browser narration is unavailable", () => {
  const { unmount } = render(<GuidedTour project={projects[0]} />);
  fireEvent.click(screen.getByRole("button", { name: /Start guided tour/ }));
  expect(screen.getByText(/Audio unavailable/)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
  fireEvent.click(screen.getByRole("button", { name: "Next" }));
  fireEvent.click(screen.getByRole("button", { name: "Next" }));
  expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  expect(screen.getByText(projects[0].tour[2].text)).toBeInTheDocument();
  unmount();
});
