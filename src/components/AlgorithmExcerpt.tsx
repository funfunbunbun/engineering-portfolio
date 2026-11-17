import { useState } from "react";
import type { ProjectId } from "../data/projects";
import { algorithmExcerpts } from "../data/algorithmExcerpts";
export default function AlgorithmExcerpt({ id }: { id: ProjectId }) {
  const example = algorithmExcerpts[id];
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  if (!example) return null;
  return (
    <section
      className="algorithm-section"
      aria-label="Selected algorithm example"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            THE IMPORTANT IDEA / SMALL CODE EXAMPLE
          </span>
          <h2>{example.title}</h2>
        </div>
        <p>{example.description}</p>
      </div>
      <div className="algorithm-block">
        <div>
          <span>EXPLANATORY EXAMPLE · ADAPTED</span>
          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(example.code);
                setCopied(true);
              } catch {
                setFailed(true);
              }
            }}
          >
            {copied ? "Copied ✓" : "Copy example"}
          </button>
        </div>
        <pre tabIndex={0}>
          <code>{example.code}</code>
        </pre>
      </div>
      <p className="algorithm-note" role="status">
        {failed
          ? "Copy unavailable. Select the code above to copy it manually."
          : example.note}
      </p>
    </section>
  );
}
