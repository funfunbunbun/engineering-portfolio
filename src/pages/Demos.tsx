import { projectYears } from "../data/projectYears";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { Arrow, ProjectVisual } from "../components/Visual";
export default function Demos() {
  return (
    <section className="section-wrap page-section demo-index">
      <span className="eyebrow">16 projects</span>
      <h1>Project demos</h1>
      <p className="page-intro">
        Try the simulations and recorded demonstrations from my projects. Open a
        project to read its summary and see the original report figures.
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
              <span className="project-year">{projectYears[project.id]}</span>
              <h2>{project.title}</h2>
              <p>
                {project.id === "vehicle-velocity"
                  ? "Explore vehicle detection and speed estimation."
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
