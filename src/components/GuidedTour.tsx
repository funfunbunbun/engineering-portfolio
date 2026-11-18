import { useState } from "react";
import type { Project } from "../data/projects";

export default function GuidedTour({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  if (!open)
    return (
      <button
        className="button tour-start"
        onClick={() => {
          setStep(0);
          setOpen(true);
        }}
      >
        Read project walkthrough <span>{project.tour.length} steps</span>
      </button>
    );
  return (
    <section className="tour-panel" aria-label="Project walkthrough">
      <div className="tour-top">
        <span>
          Step {step + 1} of {project.tour.length}
        </span>
        <button className="text-button" onClick={() => setOpen(false)}>
          Close walkthrough ×
        </button>
      </div>
      <h3>{project.tour[step].title}</h3>
      <p className="transcript" aria-live="polite">
        {project.tour[step].text}
      </p>
      <div className="tour-controls">
        <button
          className="button small ghost"
          disabled={step === 0}
          onClick={() => setStep((s) => s - 1)}
        >
          Previous
        </button>
        <button
          className="button small"
          disabled={step === project.tour.length - 1}
          onClick={() => setStep((s) => s + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
}
