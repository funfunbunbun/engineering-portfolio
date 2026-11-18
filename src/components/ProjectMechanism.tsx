import type { ProjectId } from "../data/projects";
import { projectMechanisms } from "../data/projectMechanisms";
export default function ProjectMechanism({ id }: { id: ProjectId }) {
  const [parts, steps] = projectMechanisms[id];
  return (
    <section className="project-mechanism">
      <h2>Components and operation</h2>
      <div>
        <section>
          <h3>Elements used</h3>
          <ul>
            {parts.map((part) => (
              <li key={part}>{part}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>How the project works</h3>
          <ol>
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      </div>
    </section>
  );
}
