import { projectContext } from "../data/projectContext";
import type { ProjectId } from "../data/projects";
import { useState, useRef, useEffect } from "react";

export function ProjectBackground({ id }: { id: ProjectId }) {
  const context = projectContext[id];
  return (
    <section className="project-background" aria-label="Project background">
      <div>
        <span className="eyebrow">CONTEXT / {context.setting}</span>
        <h2>
          Where the idea
          <br />
          <span>meets the real world.</span>
        </h2>
      </div>
      <div>
        <p>{context.background}</p>
        <h3>Where it fits</h3>
        <p>{context.application}</p>
      </div>
    </section>
  );
}
export default function ProjectEvidence({ id }: { id: ProjectId }) {
  const context = projectContext[id];
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected !== null) {
      dialog.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [selected]);
  if (!context.figures.length) return null;
  return (
    <section
      className="evidence-gallery"
      aria-label="Figures from the project report"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">FROM THE ORIGINAL REPORT</span>
          <h2>The work, in view.</h2>
        </div>
        <p>
          Selected figures from the academic project. These show the documented
          build or design, separate from the browser simulation.
        </p>
      </div>
      <div
        className={`figure-grid ${context.figures.length === 1 ? "single" : ""}`}
      >
        {context.figures.map((figure, index) => (
          <figure key={figure.file}>
            <button
              className="figure-open"
              aria-label={`Enlarge: ${figure.caption}`}
              onClick={() => setSelected(index)}
            >
              <img
                loading="lazy"
                src={`${import.meta.env.BASE_URL}assets/reviewed/${figure.file}`}
                alt={figure.alt}
              />
              <span>View figure ↗</span>
            </button>
            <figcaption>
              <strong>{figure.caption}</strong>
              <span>{figure.source}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {selected !== null && (
        <dialog
          ref={dialog}
          className="figure-dialog"
          aria-label="Enlarged project figure"
          onCancel={() => setSelected(null)}
        >
          <button
            className="button small"
            autoFocus
            onClick={() => {
              dialog.current?.close();
              setSelected(null);
            }}
          >
            Close figure ×
          </button>
          <img
            src={`${import.meta.env.BASE_URL}assets/reviewed/${context.figures[selected].file}`}
            alt={context.figures[selected].alt}
          />
          <p>{context.figures[selected].caption}</p>
        </dialog>
      )}
    </section>
  );
}
