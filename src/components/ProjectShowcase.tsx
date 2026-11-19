import { useState, useRef, useEffect } from "react";
import { projectContext } from "../data/projectContext";
import { projectPurpose } from "../data/projectPurpose";
import { projectRecordings } from "../data/projectRecordings";
import { projects, type ProjectId } from "../data/projects";
import Icon from "./Icon";

export default function ProjectShowcase({ id }: { id: ProjectId }) {
  const context = projectContext[id];
  const purpose = projectPurpose[id];
  const project = projects.find((item) => item.id === id)!;
  const recording = projectRecordings[id];
  const media = [
    ...(recording ? [{ ...recording, image: recording.poster, video: recording.file, alt: recording.label }] : []),
    ...context.figures.map((figure) => ({ ...figure, image: figure.file, video: "", label: figure.caption })),
  ];
  const [active, setActive] = useState(0);
  const move = (direction: number) => setActive((index) => (index + direction + media.length) % media.length);
  const [enlarged, setEnlarged] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = media[active];
  const isPhoto = Boolean(current && /prototype|photo|deployment|control-panel|physical-model|school-stem|traffic-top-view|metal-detection|sorting-diverter/.test(current.image));
  const asset = (file: string) => `${import.meta.env.BASE_URL}assets/reviewed/${file}`;
  const imageSrc = current ? asset(current.image) : `${import.meta.env.BASE_URL}assets/flows/${id}.svg`;
  const caption = current?.caption ?? "Illustrated project workflow. Original source and private records are not included.";
  useEffect(() => {
    if (!enlarged) return;
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [enlarged]);

  return (
    <section className="project-showcase" aria-label="Project photos and outputs">
      <div className="showcase-gallery">
        <figure className="showcase-feature">
          <div className={`showcase-stage${isPhoto && !current?.video ? " photo-stage" : ""}`}>
            {current?.video ? (
              <video key={current.video} controls muted playsInline loop={id !== "vehicle-velocity"} preload="metadata" poster={imageSrc} aria-label={current.label}>
                <source src={asset(current.video)} type="video/mp4" />
              </video>
            ) : (
              <button className="showcase-enlarge" onClick={() => setEnlarged(true)} aria-label={`Enlarge: ${caption}`} title="Enlarge image">
                <img src={imageSrc} alt={current?.alt ?? `${project.title}: illustrated project workflow`} fetchPriority="high" style={current?.image === "vehicle-roadside-deployment.webp" ? { objectPosition: "50% 0%" } : undefined} />
                <span className="enlarge-badge" aria-hidden="true"><Icon name="expand" /></span>
              </button>
            )}
            {media.length > 1 && (
              <div className="showcase-arrows">
                <button onClick={() => move(-1)} aria-label="Previous project media">‹</button>
                <button onClick={() => move(1)} aria-label="Next project media">›</button>
              </div>
            )}
          </div>
          <figcaption aria-live="polite">
            <strong>{caption}</strong>
            <span>{current?.source ?? "Portfolio diagram"}</span>
          </figcaption>
        </figure>
        {media.length > 1 && (
          <div className="showcase-thumbnails" role="group" aria-label="Choose project photo or recording">
            {media.map((item, index) => (
              <button key={item.image} aria-label={`Show: ${item.label}`} title={item.caption} aria-pressed={active === index} onClick={() => setActive(index)}>
                <img loading="lazy" src={asset(item.image)} alt="" />
                <span>{item.video ? `▶ ${item.caption}` : item.caption}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <aside className="showcase-brief" aria-label="Problem and use case">
        <span className="eyebrow">{context.setting}</span>
        <h2>The problem</h2>
        <p>{purpose.problem}</p>
        <h3>Use case</h3>
        <p>{purpose.useCase}</p>
        <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </aside>
      {enlarged && (
        <dialog ref={dialog} className="figure-dialog" aria-label="Enlarged project figure" onCancel={() => setEnlarged(false)}>
          <button className="figure-close" aria-label="Close figure" title="Close figure" autoFocus onClick={() => { dialog.current?.close(); setEnlarged(false); }}><Icon name="close" /></button>
          <img src={imageSrc} alt={current?.alt ?? `${project.title}: illustrated workflow`} />
          <p>{caption}</p>
        </dialog>
      )}
    </section>
  );
}
