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
import { Arrow, ProjectVisual } from "./components/Visual";
import Classroom from "./components/Classroom";
import GuidedTour from "./components/GuidedTour";
import VehicleDemo from "./components/VehicleDemo";
import DemoEmbed from "./components/DemoEmbed";
import AdditionalDemo from "./components/AdditionalDemos";
import ProjectEvidence, {
  ProjectBackground,
} from "./components/ProjectEvidence";
import { projectContext } from "./data/projectContext";
import Experience, { Teaching, BeyondProjects } from "./pages/Experience";

function Header() {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  useEffect(() => setMenu(false), [location]);
  return (
    <header className="header">
      <Link
        to="/"
        className="brand"
        aria-label="VM Engineering Technologies home"
      >
        <span className="brand-mark">
          VM<span>↗</span>
        </span>
        <span>
          ENGINEERING
          <br />
          <b>TECHNOLOGIES</b>
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
        <NavLink to="/experience">Experience</NavLink>
        <NavLink to="/teaching">Tutoring</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink className="nav-contact" to="/contact">
          Let’s talk <Arrow diagonal />
        </NavLink>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link to="/" className="footer-brand">
          VM Engineering Technologies
          <span>Engineering ideas, made understandable.</span>
        </Link>
        <a href={`mailto:${profile.email}`} className="footer-email">
          {profile.email}
          <Arrow diagonal />
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Academic projects · Educational simulations</span>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>
        <Link to="/projects">Back to the work ↑</Link>
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
              placeholder="Search the work…"
            />
          </label>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {filtered.length} projects shown
      </p>
      <div className="project-grid">
        {(all ? filtered : filtered.slice(0, 6)).map((p) => (
          <Link
            to={`/projects/${p.id}`}
            className={`project-card visual-${p.id}`}
            key={p.id}
          >
            <div className="card-image">
              <span className="card-index">PROJECT / {p.number}</span>
              <span className="card-category">{p.category}</span>
              <ProjectVisual id={p.id} />
              <span className="card-open">
                <Arrow diagonal />
              </span>
            </div>
            <div className="card-copy">
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
            </div>
          </Link>
        ))}
      </div>
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
          <div className="eyebrow">
            <span className="status-dot" /> THE INTERACTIVE ENGINEERING
            PORTFOLIO
          </div>
          <h1>
            Ideas are good.
            <br />
            <span>Working things</span>
            <br />
            are better.
          </h1>
          <p>
            I’m {profile.name}. Explore engineering through academic projects
            you can see, understand, and interact with.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/projects">
              Explore the projects <Arrow />
            </Link>
            <Link className="text-link" to="/about">
              Meet the engineer <Arrow diagonal />
            </Link>
          </div>
          <div className="hero-note">
            <span>BUILT TO BE EXPLORED</span>
            <p>
              Adjust an input. Follow a signal.
              <br />
              See the engineering behind the outcome.
            </p>
          </div>
        </div>
        <div className="hero-lab">
          <div className="lab-toolbar">
            <span>
              <i /> CONCEPT LAB
            </span>
            <span>01 / PWM SIGNAL</span>
          </div>
          <div className="lab-figure">
            <ProjectVisual id="fpga-fan" hero />
            <div className="lab-coordinate x">X: SIGNAL</div>
            <div className="lab-coordinate y">Y: RESPONSE</div>
          </div>
          <div className="lab-bottom">
            <span className="lab-label">
              A little input.
              <br />
              <b>A visible difference.</b>
            </span>
            <Link to="/projects/fpga-fan" className="lab-try">
              Try the fan controller <Arrow diagonal />
            </Link>
          </div>
          <span className="lab-footnote">
            Concept illustration · Open the demo to adjust duty cycle
          </span>
        </div>
      </section>
      <div className="capability-strip">
        <span>EMBEDDED SYSTEMS</span>
        <i>+</i>
        <span>CONTROL & AUTOMATION</span>
        <i>+</i>
        <span>IoT</span>
        <i>+</i>
        <span>COMPUTER VISION</span>
      </div>
      <section className="section-wrap work-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / SELECTED UNIVERSITY WORK</span>
            <h2>
              Less scrolling.
              <br />
              <span>More experimenting.</span>
            </h2>
          </div>
          <p>
            Open a project, turn a control, and follow the logic. Each
            experience clearly separates an educational model from approved
            project evidence.
          </p>
        </div>
        <ProjectCards />
      </section>
      <section className="approach-section section-wrap">
        <div>
          <span className="eyebrow">02 / BEHIND THE INTERACTION</span>
          <h2>
            Engineering, with
            <br />
            the thinking left in.
          </h2>
          <p>
            The interesting part is how a system gets from an input to an
            outcome. These demos make that journey visible.
          </p>
          <Link to="/about" className="text-link">
            A little about me <Arrow diagonal />
          </Link>
        </div>
        <div className="approach-steps">
          {[
            [
              "01",
              "Start with the problem",
              "Understand what the system is trying to do.",
            ],
            [
              "02",
              "Get hands-on",
              "Change a parameter and observe the response.",
            ],
            [
              "03",
              "Look under the hood",
              "Switch to Engineering Mode for rules, signals, and assumptions.",
            ],
          ].map(([n, t, d]) => (
            <div key={n}>
              <span>{n}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </div>
          ))}
        </div>
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
        <span className="eyebrow">LET’S CONNECT</span>
        <h2>
          Have a question
          <br />
          or an idea?
        </h2>
      </div>
      <Link className="button light" to="/contact">
        Start a conversation <Arrow diagonal />
      </Link>
    </section>
  );
}

function ProjectsPage() {
  return (
    <section className="section-wrap page-section">
      <span className="eyebrow">THE PROJECT INDEX</span>
      <div className="section-heading">
        <h1>
          Explore. Adjust.
          <br />
          <span>Understand.</span>
        </h1>
        <p>
          A collection of university engineering concepts, brought into the
          browser. Start with a field that interests you.
        </p>
      </div>
      <ProjectCards all />
    </section>
  );
}

function DetailContent({ project }: { project: Project }) {
  const [engineering, setEngineering] = useState(false);
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
            PROJECT {project.number} / {project.category.toUpperCase()}
          </span>
          <h1>{project.title}</h1>
          <p>{project.subtitle}</p>
        </div>
        <span className="badge">{project.status}</span>
      </div>
      <div className="detail-intro">
        <p>{project.description}</p>
        <div className="tags">
          {project.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <ProjectBackground id={project.id} />
      <div className="mode-bar">
        <div>
          <span className="eyebrow">EXPLORE THE SYSTEM</span>
          <p>Your inputs stay in this browser.</p>
        </div>
        <div className="mode-switch" role="group" aria-label="Display mode">
          <button
            aria-pressed={!engineering}
            onClick={() => setEngineering(false)}
          >
            Overview
          </button>
          <button
            aria-pressed={engineering}
            onClick={() => setEngineering(true)}
          >
            Engineering Mode
          </button>
        </div>
      </div>
      <GuidedTour project={project} />
      <div className="demo-shell">
        <AdditionalDemo id={project.id} engineering={engineering} />
        {project.status === "Documented project" && (
          <div className="documented-intro">
            <ProjectVisual id={project.id} />
            <div>
              <span className="eyebrow">DOCUMENTED ACADEMIC WORK</span>
              <h3>Explore the design and the reasoning.</h3>
              <p>
                This project is presented through its background, methods, and
                available report figures. No interactive hardware model is
                claimed.
              </p>
            </div>
          </div>
        )}
        {project.id === "smart-classroom" && (
          <Classroom engineering={engineering} />
        )}
        {project.id === "vehicle-velocity" && (
          <VehicleDemo engineering={engineering} />
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
            {engineering && (
              <div className="engineering-panel">
                <div>
                  <h4>
                    {project.id === "fpga-fan"
                      ? "Signal relationship"
                      : "Illustrative state sequence"}
                  </h4>
                  <code>
                    {project.id === "fpga-fan"
                      ? "D = t_high / T × 100%"
                      : "IDLE → SENSE → ROUTE → DELIVERED"}
                  </code>
                  <p>
                    {project.id === "fpga-fan"
                      ? "The period remains fixed at an illustrative 10 ms (100 Hz). Only high-time changes. These are demonstration values, not verified FPGA settings."
                      : "Next step triggers one transition. Run sequence uses a 900 ms illustrative delay per transition. Object categories are examples."}
                  </p>
                </div>
                <div>
                  <h4>Independent demo</h4>
                  <p>
                    The demo also works as a standalone page. Its source has its
                    own local project repository.
                  </p>
                  <a
                    className="text-link"
                    href={`${import.meta.env.BASE_URL}demos/${embed}/index.html`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open standalone demo <Arrow diagonal />
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <ProjectEvidence id={project.id} />
      <div className="project-explanation">
        <div>
          <span className="eyebrow">THE QUESTION</span>
          <h2>{project.problem}</h2>
        </div>
        <div>
          <h3>The approach</h3>
          <p>{project.approach}</p>
          <h3>Assumptions & evidence</h3>
          <p>{project.limitations}</p>
          <p className="evidence-note">{projectContext[project.id].evidence}</p>
        </div>
      </div>
      <div className="next-project">
        <span className="eyebrow">KEEP EXPLORING</span>
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
      <section className="section-wrap about-page page-section">
        <div>
          <span className="eyebrow">THE PERSON BEHIND THE PROJECTS</span>
          <h1>
            Hi, I’m
            <br />
            <span>{profile.name}.</span>
          </h1>
          <p className="about-bio">{profile.biography}</p>
          <p>
            This portfolio brings together my university engineering interests
            through small, explorable experiences.
          </p>
          <Link className="button" to="/projects">
            See the work <Arrow />
          </Link>
        </div>
        <div className="about-diagram">
          <span className="eyebrow">MY AREAS OF INTEREST</span>
          <div className="interest-core">
            VM<span>ENGINEERING</span>
          </div>
          <div className="interest-list">
            <span>Embedded systems</span>
            <span>Control systems</span>
            <span>IoT & sensing</span>
            <span>Automation</span>
            <span>Computer vision</span>
          </div>
          <p>
            From a signal to a system.
            <br />
            From an idea to something you can explore.
          </p>
        </div>
      </section>
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
      <h1>
        Good things start
        <br />
        <span>with a conversation.</span>
      </h1>
      <p>
        Curious about a project or have an engineering idea?
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
        Connect on LinkedIn <Arrow diagonal />
      </a>
      <div className="contact-signoff">
        <span className="brand-mark">
          VM<span>↗</span>
        </span>
        <div>
          <strong>{profile.name}</strong>
          <span>VM Engineering Technologies</span>
        </div>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="section-wrap page-section">
      <span className="eyebrow">404 / NO SIGNAL</span>
      <h1>
        This page is
        <br />
        <span>off the circuit.</span>
      </h1>
      <Link className="button" to="/projects">
        Back to the projects <Arrow />
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
    document.title = `${project?.subtitle ?? (location.pathname === "/" ? "Interactive engineering portfolio" : location.pathname.slice(1).replace(/^./, (c) => c.toUpperCase()))} | VM Engineering Technologies`;
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
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
