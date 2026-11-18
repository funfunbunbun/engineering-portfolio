import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { Arrow, ProjectVisual } from "../components/Visual";
const periods: Record<string, string> = {
  "vehicle-velocity": "2026",
  "plc-sorting": "2023–2024",
  "heart-monitor": "2023–2024",
  "fpga-fan": "2023–2024",
  "flood-control": "2022–2023",
  "trolley-cad": "2022–2023",
  "spring-study": "2020–2021",
};
const groups = [
  "2026",
  "2023–2024",
  "2022–2023",
  "2020–2021",
  "Other projects",
];
export default function Demos() {
  return (
    <section className="section-wrap page-section demo-index">
      <span className="eyebrow">16 projects</span>
      <h1>Project demos</h1>
      <p className="page-intro">
        Try the simulations and recorded demonstrations from my projects. Open a
        project to read its summary and see the original report figures. Dates
        below follow documented project or report periods.
      </p>
      {groups.map((period) => (
        <section key={period}>
          <h2 className="demo-date-heading">{period}</h2>
          <div className="demo-index-grid">
            {projects
              .filter(
                (project) =>
                  (periods[project.id] || "Other projects") === period,
              )
              .map((project) => (
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
      ))}
    </section>
  );
}
