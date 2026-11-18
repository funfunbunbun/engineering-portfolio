import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projects, type ProjectId } from "../data/projects";
import { Arrow } from "./Visual";
import ProjectCover from "./ProjectCover";

const featuredIds: ProjectId[] = [
  "fpga-fan",
  "vehicle-velocity",
  "smart-classroom",
  "plc-sorting",
  "robot-recycling",
];
const featured = featuredIds.map((id) => projects.find((project) => project.id === id)!);
const summaries: Partial<Record<ProjectId, string>> = {
  "fpga-fan": "FPGA control of fan speed using temperature sensing and pulse-width modulation.",
  "vehicle-velocity": "Camera-based vehicle detection, tracking and speed estimation on a Raspberry Pi 5.",
  "smart-classroom": "Classroom lighting, fan and window control using occupancy and environmental sensors.",
  "plc-sorting": "A conveyor sorting sequence using sensors, a PLC and an HMI.",
  "robot-recycling": "A pick-and-place sequence for sorting metal and non-metal objects.",
};

export default function ProjectDeck() {
  const [index, setIndex] = useState(0);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const project = featured[index];
  const move = (direction: number) =>
    setIndex((current) => (current + direction + featured.length) % featured.length);

  return (
    <section
      className="hero-lab project-deck"
      aria-label="Featured projects"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          move(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
      onPointerDown={(event) => {
        if (event.pointerType === "mouse") return;
        gesture.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerCancel={() => { gesture.current = null; }}
      onPointerUp={(event) => {
        const start = gesture.current;
        gesture.current = null;
        if (!start) return;
        const distance = event.clientX - start.x;
        if (Math.abs(distance) > 50 && Math.abs(distance) > Math.abs(event.clientY - start.y))
          move(distance < 0 ? 1 : -1);
      }}
    >
      <div className="deck-slide" key={project.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${featured.length}`}>
        <div className="lab-toolbar">
          <span>Featured project</span>
          <span>{project.category}</span>
        </div>
        <div className="lab-figure"><ProjectCover id={project.id} hero /></div>
        <div className="deck-copy">
          <h2>{project.title}</h2>
          <p>{summaries[project.id]}</p>
          <Link to={`/projects/${project.id}`} className="lab-try">
            View project <Arrow diagonal />
          </Link>
        </div>
      </div>
      <div className="deck-navigation">
        <button type="button" onClick={() => move(-1)} aria-label="Previous featured project">←</button>
        <div className="deck-positions" role="group" aria-label="Choose featured project">
          {featured.map((item, position) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.title}`}
              aria-pressed={position === index}
              onClick={() => setIndex(position)}
            ><span /></button>
          ))}
        </div>
        <span className="deck-count" role="status" aria-atomic="true">
          <span aria-hidden="true">{index + 1} / {featured.length}</span>
          <span className="sr-only">{project.title}, project {index + 1} of {featured.length}</span>
        </span>
        <button type="button" onClick={() => move(1)} aria-label="Next featured project">→</button>
      </div>
    </section>
  );
}
