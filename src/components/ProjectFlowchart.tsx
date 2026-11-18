import type { ProjectId } from "../data/projects";
import { flows } from "../data/flowcharts";
export default function ProjectFlowchart({ id }: { id: ProjectId }) {
  return (
    <section className="project-flowchart" aria-label="Project flowchart">
      <h2>How it works</h2>
      <div>
        <img
          loading="lazy"
          src={import.meta.env.BASE_URL + "assets/flows/" + id + ".svg"}
          alt={flows[id].join(" → ")}
        />
      </div>
      <details>
        <summary>Read the steps</summary>
        <ol>
          {flows[id].map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </details>
    </section>
  );
}
