import { projectContext } from "../data/projectContext";
import type { ProjectId } from "../data/projects";
import { ProjectVisual } from "./Visual";

export default function ProjectCover({ id, hero = false }: { id: ProjectId; hero?: boolean }) {
  const figure = projectContext[id].figures[0];
  if (!figure) return <ProjectVisual id={id} hero={hero} />;
  const diagram = /diagram|schematic|flowchart|architecture|boundaries|menu/.test(figure.file);
  return (
    <img
      className={`project-cover${hero ? " hero-cover" : ""}${diagram ? " diagram-cover" : ""}`}
      src={`${import.meta.env.BASE_URL}assets/reviewed/${figure.file}`}
      alt={figure.alt}
      loading={hero ? "eager" : "lazy"}
    />
  );
}
