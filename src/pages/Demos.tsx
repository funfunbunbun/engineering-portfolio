import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { Arrow, ProjectVisual } from "../components/Visual";
export default function Demos() {
  return (
    <section className="section-wrap page-section demo-index">
      <span className="eyebrow">THE HANDS-ON INDEX / 16 EDUCATIONAL DEMOS</span>
      <h1>
        Don’t just read it.
        <br />
        <span>Try it.</span>
      </h1>
      <p className="page-intro">
        Every project has something to explore. These browser models illustrate
        an idea; the report figures and original project context sit alongside
        them.
      </p>
      <div className="demo-index-grid">
        {projects.map((project) => (
          <Link
            className="demo-index-card"
            to={`/projects/${project.id}?demo=1`}
            key={project.id}
          >
            <div>
              <ProjectVisual id={project.id} />
              <span className="eyebrow">{project.category}</span>
            </div>
            <section>
              <h2>{project.subtitle}</h2>
              <p>
                {project.id === "vehicle-velocity"
                  ? "Adjust fictional distance and time; approved project footage is still pending."
                  : project.description}
              </p>
              <span className="try-demo">
                Try demo <Arrow />
              </span>
            </section>
          </Link>
        ))}
      </div>
    </section>
  );
}
