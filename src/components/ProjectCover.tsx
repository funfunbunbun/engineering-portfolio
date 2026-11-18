import type { ProjectId } from "../data/projects";
import { ProjectVisual } from "./Visual";

export default function ProjectCover({ id, hero = false }: { id: ProjectId; hero?: boolean }) {
  return <ProjectVisual id={id} hero={hero} />;
}
