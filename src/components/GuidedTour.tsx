import { useCallback, useEffect, useState } from "react";
import type { Project } from "../data/projects";

export default function GuidedTour({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [narrate, setNarrate] = useState(false);
  const [paused, setPaused] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [audioError, setAudioError] = useState("");
  const supported =
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    typeof SpeechSynthesisUtterance !== "undefined";
  const cancel = useCallback(() => {
    if (supported) window.speechSynthesis.cancel();
  }, [supported]);
  useEffect(() => {
    if (!open || !narrate || !supported) return;
    cancel();
    setPaused(false);
    const speech = new SpeechSynthesisUtterance(project.tour[step].text);
    speech.lang = "en";
    speech.rate = 0.95;
    speech.onstart = () => setSpeaking(true);
    speech.onend = () => setSpeaking(false);
    speech.onerror = () => {
      setSpeaking(false);
      setAudioError(
        "Narration is unavailable. You can continue with the transcript.",
      );
    };
    setAudioError("");
    window.speechSynthesis.speak(speech);
    return () => {
      speech.onstart = null;
      speech.onend = null;
      speech.onerror = null;
      cancel();
    };
  }, [open, narrate, step, project, supported, cancel]);
  useEffect(() => {
    function silence() {
      cancel();
      setNarrate(false);
      setSpeaking(false);
      setPaused(false);
    }
    function visibility() {
      if (document.hidden) silence();
    }
    window.addEventListener("pagehide", silence);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancel();
      window.removeEventListener("pagehide", silence);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [cancel]);
  if (!open)
    return (
      <button
        className="button tour-start"
        onClick={() => {
          setOpen(true);
          setStep(0);
        }}
      >
        ▷ Start guided tour <span>3 short steps · audio optional</span>
      </button>
    );
  return (
    <section className="tour-panel" aria-label="Guided tour">
      <div className="tour-top">
        <span className="eyebrow">
          GUIDED TOUR / {String(step + 1).padStart(2, "0")} OF 03
        </span>
        <button
          className="text-button"
          onClick={() => {
            cancel();
            setNarrate(false);
            setOpen(false);
          }}
        >
          Exit tour ×
        </button>
      </div>
      <h3>{project.tour[step].title}</h3>
      <p className="transcript" aria-live="polite">
        {project.tour[step].text}
      </p>
      <div className="tour-controls">
        <div>
          <button
            className="button small ghost"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
          >
            Previous
          </button>
          <button
            className="button small"
            onClick={() => setStep((s) => s + 1)}
            disabled={step === project.tour.length - 1}
          >
            Next
          </button>
        </div>
        <div>
          {supported ? (
            <>
              <button
                className="text-button"
                aria-pressed={narrate}
                onClick={() => {
                  if (narrate) cancel();
                  setNarrate((n) => !n);
                  setSpeaking(false);
                  setPaused(false);
                }}
              >
                {narrate ? "Mute narration" : "Enable narration"}
              </button>
              {narrate && (
                <button
                  className="text-button"
                  disabled={!speaking && !paused}
                  onClick={() => {
                    if (paused) window.speechSynthesis.resume();
                    else window.speechSynthesis.pause();
                    setPaused((p) => !p);
                  }}
                >
                  {paused ? "Resume audio" : "Pause audio"}
                </button>
              )}
            </>
          ) : (
            <span className="muted">Audio unavailable · transcript ready</span>
          )}
        </div>
      </div>
      {audioError && (
        <p role="status" className="muted">
          {audioError}
        </p>
      )}
    </section>
  );
}
