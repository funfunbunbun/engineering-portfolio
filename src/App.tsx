import ProjectMechanism from "./components/ProjectMechanism";
import ProjectDeck from "./components/ProjectDeck";
import ProjectCover from "./components/ProjectCover";
import { projectYears, yearGroups } from "./data/projectYears";
import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import profile from "./data/profile.json";
import { projects, type Project } from "./data/projects";
import { Arrow } from "./components/Visual";
import Classroom from "./components/Classroom";
import GuidedTour from "./components/GuidedTour";

import DemoEmbed from "./components/DemoEmbed";
import ProjectWorkbench from "./components/ProjectWorkbench";
import { WeatherLab, NeuralLab } from "./components/IntelligentLabs";
import AlgorithmExcerpt from "./components/AlgorithmExcerpt";
import AdditionalDemo from "./components/AdditionalDemos";
import ProjectEvidence, {
  ProjectBackground,
} from "./components/ProjectEvidence";
import { projectContext } from "./data/projectContext";
import Experience, {
  Teaching,
  BeyondProjects,
  PhotoGallery,
  AboutLinks,
} from "./pages/Experience";
import ThemeToggle from "./components/ThemeToggle";
import ProjectFlowchart from "./components/ProjectFlowchart";
import { Navigate } from "react-router-dom";

function Header() {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  useEffect(() => setMenu(false), [location]);
  return (
    <header className="header">
      <Link to="/" className="brand" aria-label="Vinay home">
        <span className="brand-mark">
          VM<span>↗</span>
        </span>
        <span>
          Vinay
          <br />
          <b>Engineering portfolio</b>
        </span>
      </Link>
      <button
        className="menu-button"
        aria-expanded={menu}
        aria-controls="main-navigation"
        onClick={() => setMenu((v) => !v)}
      >
        {menu ? "Close ×" : "Menu +"}
      </button>
      <nav
        id="main-navigation"
        aria-label="Main navigation"
        className={menu ? "nav open" : "nav"}
      >
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/about">About me</NavLink>
        <NavLink className="nav-contact" to="/contact">
          Let’s talk <Arrow diagonal />
        </NavLink>
      </nav>
      <ThemeToggle />
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <a className="footer-email" href={"mailto:" + profile.email}>
        {profile.email}
        <Arrow diagonal />
      </a>
      <div className="footer-bottom">
        <AboutLinks />
        <Link to="/projects">Projects ↑</Link>
      </div>
    </footer>
  );
}

function ProjectCards({ all = false }: { all?: boolean }) {
  const [category, setCategory] = useState("All projects");
  const [query, setQuery] = useState("");
  const filtered = projects.filter(
    (p) =>
      (category === "All projects" || p.tags.includes(category)) &&
      `${p.title} ${p.subtitle} ${p.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="project-tools">
        <div className="filters" aria-label="Filter projects">
          {[
            "All projects",
            "Embedded Systems",
            "IoT",
            "Computer Vision",
            "Automation",
            "Control Systems",
            "Mechanical Design",
            "Software",
            "Experimental Science",
            "Robotics",
            "Intelligent Systems",
          ].map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              className={category === c ? "filter active" : "filter"}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        {all && (
          <label className="search-field">
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects"
            />
          </label>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {filtered.length} projects shown
      </p>
      {(all ? yearGroups : ["Selected projects"]).map((year) => (
        <section
          className={
            year
              ? "project-year-group"
              : "project-year-group ungrouped-projects"
          }
          key={year}
        >
          {all && year && filtered.some((p) => projectYears[p.id] === year) && (
            <h2 className="year-group">{year}</h2>
          )}
          <div className="project-grid">
            {(all
              ? filtered.filter((p) => projectYears[p.id] === year)
              : filtered.slice(0, 6)
            ).map((p) => (
              <Link
                to={`/projects/${p.id}`}
                className={`project-card visual-${p.id}`}
                key={p.id}
              >
                <div className="card-image">
                  {projectYears[p.id] && (
                    <span className="card-index">{projectYears[p.id]}</span>
                  )}
                  <span className="card-category">{p.category}</span>
                  <ProjectCover id={p.id} />
                  <span className="card-open">
                    <Arrow diagonal />
                  </span>
                </div>
                <div className="card-copy">
                  {projectYears[p.id] && (
                    <span className="project-year">{projectYears[p.id]}</span>
                  )}
                  <div className="card-meta">
                    <span>{p.subtitle}</span>
                    <span className="status-label">
                      <i />
                      {p.status}
                    </span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="tags">
                    {p.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <span className="card-demo-cta">
                    Try interactive demo <Arrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
      {!filtered.length && (
        <div className="empty-results">
          <h3>No matching projects.</h3>
          <p>Try a different search or category.</p>
          <button
            className="button small"
            onClick={() => {
              setQuery("");
              setCategory("All projects");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
      {!all && (
        <Link className="text-link all-projects-link" to="/projects">
          Explore all {projects.length} projects <Arrow />
        </Link>
      )}
    </>
  );
}

function Home() {
  return (
    <>
      <section className="hero section-wrap">
        <div className="hero-copy">
          <div className="eyebrow">Welcome to my portfolio</div>
          <h1>
            Practical
            <br />
            <span>engineering</span>
            <br />
            solutions.
          </h1>
          <p>{profile.biography}</p>
          <p>A collection of projects I’ve worked on over the years.</p>
          <div className="hero-actions">
            <Link className="button" to="/projects">
              View projects <Arrow />
            </Link>
          </div>
          <div className="hero-note">
            <p>
              These are my projects over the years. Try the demos and see if
              they solve something for you!
            </p>
          </div>
        </div>
        <ProjectDeck />
      </section>
      <div className="capability-strip">
        <span>Embedded systems</span>
        <i>+</i>
        <span>Control & automation</span>
        <i>+</i>
        <span>Robotics</span>
        <i>+</i>
        <span>Computer vision</span>
      </div>
      <section className="section-wrap work-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">University projects</span>
            <h2>Selected projects</h2>
          </div>
          <p>
            Read about the projects, see the original work and try the browser
            demos.
          </p>
        </div>
        <ProjectCards />
      </section>
      <BeyondProjects />
      <ContactBanner />
    </>
  );
}

function ContactBanner() {
  return (
    <section className="contact-banner section-wrap">
      <div>
        <span className="eyebrow">Contact</span>
        <h2>Let’s talk</h2>
      </div>
      <Link className="button light" to="/contact">
        Contact me <Arrow diagonal />
      </Link>
    </section>
  );
}

function ProjectsPage() {
  return (
    <section className="section-wrap page-section">
      <div className="section-heading">
        <h1>Projects</h1>
        <p>
          My engineering projects from university, with summaries, report
          figures and demos.
        </p>
      </div>
      <ProjectCards all />
    </section>
  );
}

function DetailContent({ project }: { project: Project }) {
  const location = useLocation();
  useEffect(() => {
    if (new URLSearchParams(location.search).get("demo") === "1")
      requestAnimationFrame(() =>
        document.getElementById("interactive-demo")?.scrollIntoView(),
      );
  }, [location.search]);
  const embed =
    project.id === "fpga-fan"
      ? "fpga-pwm-fan-controller"
      : project.id === "plc-sorting"
        ? "plc-hmi-sorting-machine"
        : null;
  return (
    <section className="section-wrap detail-page">
      <Link to="/projects" className="back-link">
        ← All projects
      </Link>
      <div className="detail-heading">
        <div>
          <span className="eyebrow">
            {projectYears[project.id] && `${projectYears[project.id]} / `}
            {project.category}
          </span>
          <h1>{project.title}</h1>
          <p>{project.subtitle}</p>
        </div>
        <span className="badge">{project.status}</span>
      </div>
      <ProjectEvidence id={project.id} />
      <button
        className="detail-demo-link"
        onClick={() =>
          document.getElementById("interactive-demo")?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
          })
        }
      >
        Jump to interactive demo ↓
      </button>
      <details className="project-notes">
        <summary>Project background and components</summary>
        <ProjectBackground id={project.id} />
        <ProjectMechanism id={project.id} />
      </details>
      <h2 className="demo-title">Interactive demo</h2>
      <GuidedTour project={project} />
      <div className="demo-shell" id="interactive-demo">
        <ProjectWorkbench id={project.id} />
        {project.id === "weather-expert" && (
          <WeatherLab engineering={false} />
        )}
        {project.id === "neural-classifiers" && (
          <NeuralLab engineering={false} />
        )}
        <AdditionalDemo id={project.id} engineering={false} />
        {project.id === "smart-classroom" && (
          <Classroom engineering={false} />
        )}
        {embed && (
          <>
            <div className="embed-heading">
              <span className="eyebrow">
                {project.id === "fpga-fan"
                  ? "EMBEDDED / PWM SIGNAL LAB"
                  : "AUTOMATION / CONVEYOR LAB"}
              </span>
              <span className="simulation-stamp">
                <i /> INTERACTIVE SIMULATION
              </span>
            </div>
            <DemoEmbed slug={embed} title={project.subtitle} />
          </>
        )}
      </div>
      <ProjectFlowchart id={project.id} />
      <AlgorithmExcerpt id={project.id} />
      <div className="project-explanation">
        <div>
          <span className="eyebrow">Project objective</span>
          <h2>{project.problem}</h2>
        </div>
        <div>
          <h3>The approach</h3>
          <p>{project.approach}</p>
          <h3>Demo limitations</h3>
          <p>{project.limitations}</p>
          <p className="evidence-note">{projectContext[project.id].evidence}</p>
        </div>
      </div>
      <div className="next-project">
        <span className="eyebrow">Next project</span>
        {(() => {
          const next =
            projects[(projects.indexOf(project) + 1) % projects.length];
          return (
            <Link to={`/projects/${next.id}`}>
              {next.subtitle}
              <Arrow diagonal />
            </Link>
          );
        })()}
      </div>
    </section>
  );
}

function ProjectPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  return project ? (
    <DetailContent key={project.id} project={project} />
  ) : (
    <NotFound />
  );
}

function About() {
  return (
    <>
      <section className="section-wrap page-section about-intro">
        <span className="eyebrow">About me</span>
        <img
          className="about-portrait"
          src={
            import.meta.env.BASE_URL +
            "assets/reviewed/vinay-tutoring-portrait.webp"
          }
          alt="Vinay"
        />
        <h1>Hi, I’m Vinay.</h1>
        <p className="about-bio">{profile.biography}</p>
        <p>
          I enjoy building things, learning how they work and helping other
          people understand them.
        </p>
        <nav className="about-navigation" aria-label="About me sections">
          <a
            href="#/about#achievements"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("achievements")?.scrollIntoView();
            }}
          >
            Achievements
          </a>
          <Link to="/about/experience">Experience</Link>
          <Link to="/about/tutoring">Tutoring</Link>
        </nav>
        <AboutLinks />
      </section>
      <section className="section-wrap about-achievements" id="achievements">
        <h2>Achievements</h2>
        <div className="about-achievement-grid">
          <article>
            <span className="achievement-number">3rd</span>
            <h3>PROTON Business Case Study Challenge</h3>
            <p>
              I contributed to the team that placed third in the 2024 challenge,
              working on automotive business case analysis and presentation.
            </p>
          </article>
        </div>
        <PhotoGallery group="achievement" />
        <section className="deans-section">
          <h2>Dean’s List</h2>{" "}
          <article>
            <span className="achievement-number">7</span>
            <h3>Consecutive Dean’s Lists</h3>
            <p>
              I graduated from Universiti Sains Malaysia with first-class
              honours in mechatronics.
            </p>
          </article>
          <PhotoGallery group="achievement" topic="deans" />
        </section>
      </section>
      <Experience embedded />
      <Teaching embedded />
      <ContactBanner />
    </>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  return (
    <section className="section-wrap contact-page page-section">
      <span className="eyebrow">CONTACT / SAY HELLO</span>
      <h1>Let’s talk</h1>
      <p>
        If you’d like to discuss a project or ask about tutoring,
        <br />
        Send me a message.
      </p>
      <a className="contact-address" href={`mailto:${profile.email}`}>
        {profile.email}
        <Arrow diagonal />
      </a>
      <div className="contact-actions">
        <a className="button" href={`mailto:${profile.email}`}>
          Open email <Arrow diagonal />
        </a>
        <button
          className="button ghost"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(profile.email);
              setCopied(true);
              setCopyError(false);
            } catch {
              setCopyError(true);
            }
          }}
        >
          {copied ? "Email copied ✓" : "Copy email address"}
        </button>
      </div>
      <p role="status" className="contact-note">
        {copyError
          ? "Copy unavailable. Select the email address above and copy it manually."
          : copied
            ? "Email address copied to your clipboard."
            : "Your mail app handles the message. This website does not collect or store it."}
      </p>
      <a
        className="text-link linkedin-contact"
        href={profile.linkedin}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn <Arrow diagonal />
      </a>
      <a
        className="text-link linkedin-contact"
        href={profile.youtube}
        target="_blank"
        rel="noopener noreferrer"
      >
        YouTube <Arrow diagonal />
      </a>
      <div className="contact-signoff">
        <span className="brand-mark">
          V<span>↗</span>
        </span>
        <div>
          <strong>{profile.name}</strong>
          <span>Mechatronics graduate</span>
        </div>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="section-wrap page-section">
      <h1>Page not found</h1>
      <Link className="button" to="/projects">
        View projects <Arrow />
      </Link>
    </section>
  );
}

export default function App() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const mounted = useRef(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (mounted.current) mainRef.current?.focus();
    mounted.current = true;
    const project = projects.find(
      (p) => location.pathname === `/projects/${p.id}`,
    );
    document.title = `${project?.subtitle ?? (location.pathname === "/" ? "Engineering portfolio" : location.pathname.slice(1).replace(/^./, (c) => c.toUpperCase()))} | Vinay`;
  }, [location.pathname]);
  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Skip to content
      </a>
      <Header />
      <main ref={mainRef} id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/demos" element={<Navigate replace to="/projects" />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route
            path="/experience"
            element={<Navigate replace to="/about/experience" />}
          />
          <Route path="/about/experience" element={<Experience />} />
          <Route
            path="/teaching"
            element={<Navigate replace to="/about/tutoring" />}
          />
          <Route path="/about/tutoring" element={<Teaching />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
