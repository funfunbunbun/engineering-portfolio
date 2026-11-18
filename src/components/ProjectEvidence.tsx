import { projectContext } from "../data/projectContext";
import type { ProjectId } from "../data/projects";
export function ProjectBackground({ id }: { id: ProjectId }) {
  const context = projectContext[id];
  return (
    <section className="project-background" aria-label="Project background">
      <div>
        <span className="eyebrow">{context.setting}</span>
        <h2>Project summary</h2>
      </div>
      <div>
        <p>{context.background}</p>
        <h3>Application</h3>
        <p>{context.application}</p>
      </div>
    </section>
  );
}
export { default } from "./ProjectShowcase";
