import { Link } from "react-router-dom";
import { Arrow } from "../components/Visual";
import profile from "../data/profile.json";

export function BeyondProjects() {
  return (
    <section className="section-wrap beyond-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">BEYOND THE BUILD</span>
          <h2>
            Engineering is
            <br />
            <span>a people thing, too.</span>
          </h2>
        </div>
        <p>
          Competitions, teaching, student activities, and industry learning add
          another dimension to the work.
        </p>
      </div>
      <div className="beyond-grid">
        {[
          {
            number: "01",
            title: "Ideas under pressure.",
            label: "PROTON · 3RD PLACE",
            text: "Team contributor in the PROTON Business Case Study Challenge.",
            route: "/experience",
          },
          {
            number: "02",
            title: "Make it click.",
            label: "TUTORING",
            text: "Helping learners work through mathematics, science, and the reasoning behind an answer.",
            route: "/teaching",
          },
          {
            number: "03",
            title: "Learn with others.",
            label: "CLUBS & INDUSTRIAL TRAINING",
            text: "Student involvement, event protocol, and structured technical learning.",
            route: "/experience",
          },
        ].map((item) => (
          <Link className="beyond-card" to={item.route} key={item.number}>
            <span className="eyebrow">
              {item.number} / {item.label}
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <Arrow diagonal />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Experience() {
  return (
    <section className="section-wrap page-section experience-page">
      <span className="eyebrow">EXPERIENCE / ACHIEVEMENTS & INVOLVEMENT</span>
      <h1>
        More than
        <br />
        <span>the technical part.</span>
      </h1>
      <p className="page-intro">
        A few experiences that bring together technical thinking, communication,
        and working with people.
      </p>
      <section className="achievement-feature" aria-label="PROTON achievement">
        <div className="award-art" aria-hidden="true">
          <span>03</span>
          <svg viewBox="0 0 250 120">
            <path
              d="M15 100h60V65h55V30h55v70h50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="m130 20 20-15 20 15" fill="none" stroke="currentColor" />
            <circle cx="150" cy="47" r="8" stroke="currentColor" fill="none" />
          </svg>
          <small>BUSINESS CASE / TEAM CONTRIBUTION</small>
        </div>
        <div>
          <span className="eyebrow">ACHIEVEMENT / PROTON</span>
          <h2>
            3rd place.
            <br />
            <span>A shared effort.</span>
          </h2>
          <p className="achievement-role">
            PROTON Business Case Study Challenge · Team contributor
          </p>
          <p>
            Contributed to a team case-study effort connecting engineering
            context with automotive strategy. The supplied presentations explore
            EV adoption and digital transformation in automotive retail.
          </p>
          <div className="tags">
            <span>Case analysis</span>
            <span>Teamwork</span>
            <span>Technical communication</span>
          </div>
          <p className="source-note">
            Placing and contributor role confirmed by Vinay. Presentation
            materials cover the 2024 and 2025 challenges; the placing is not
            assigned to a specific year here.
          </p>
        </div>
      </section>
      <div className="experience-heading">
        <span className="eyebrow">LEARNING IN PRACTICE</span>
        <h2>
          Inside the community.
          <br />
          <span>Alongside industry.</span>
        </h2>
      </div>
      <div className="experience-timeline">
        <article>
          <span className="timeline-kind">INDUSTRIAL TRAINING</span>
          <div>
            <h3>Digital design & verification learning</h3>
            <p className="timeline-subtitle">MOHE–Intel ELITE programme</p>
            <p>
              The supplied training logbook records learning in Verilog,
              simulation, testbenches, timing, verification, and teamwork. This
              section describes the training themes rather than internal
              assignments or company systems.
            </p>
            <div className="tags">
              <span>Verilog</span>
              <span>Simulation</span>
              <span>Verification</span>
              <span>Timing</span>
            </div>
          </div>
        </article>
        <article>
          <span className="timeline-kind">STUDENT INVOLVEMENT</span>
          <div>
            <h3>Career Fair 2023</h3>
            <p className="timeline-subtitle">
              Ceremony & Protocol Department · November 2022–May 2023
            </p>
            <p>
              Student event involvement in ceremony and protocol, contributing
              to the coordination behind a university career fair.
            </p>
          </div>
        </article>
        <article>
          <span className="timeline-kind">CLUBS</span>
          <div>
            <h3>EICC & STEM club involvement</h3>
            <p>
              The supplied résumé records EICC membership and earlier Form 6
              STEM Club involvement as a monitor and committee member. These are
              historical activities; no current appointment is implied.
            </p>
            <div className="tags">
              <span>Student community</span>
              <span>Organisation</span>
              <span>Communication</span>
            </div>
          </div>
        </article>
      </div>
      <div className="experience-links">
        <Link className="button" to="/teaching">
          Explore the tutoring side <Arrow />
        </Link>
        <a
          className="text-link"
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          Find me on LinkedIn <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}

export function Teaching() {
  return (
    <section className="section-wrap page-section teaching-page">
      <span className="eyebrow">TUTORING / CLEAR THINKING, STEP BY STEP</span>
      <div className="teaching-hero">
        <div>
          <h1>
            A little clarity.
            <br />
            <span>A lot more confidence.</span>
          </h1>
          <p>
            I enjoy breaking an unfamiliar problem into smaller steps,
            connecting an equation to an idea, and helping a learner understand
            why an answer works.
          </p>
          <p>
            The supplied tutoring archive includes materials for
            secondary-school mathematics, additional mathematics, science, and
            STPM Mathematics (T).
          </p>
        </div>
        <div
          className="teaching-art"
          aria-label="Illustration of a quadratic graph"
        >
          <span className="eyebrow">UNDERSTAND THE SHAPE</span>
          <svg
            viewBox="0 0 420 300"
            role="img"
            aria-label="Illustrative parabola y equals x squared"
          >
            <path d="M45 240h330M210 270V30" stroke="#577f9c" />
            <path
              d="M75 50Q210 430 345 50"
              stroke="#bbddf5"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="210" cy="240" r="5" fill="#b7ddca" />
            <text
              x="230"
              y="80"
              fill="#bdd8ea"
              fontSize="24"
              fontFamily="monospace"
            >
              y = x²
            </text>
            <text x="356" y="258" fill="#a1bdce" fontSize="12">
              x
            </text>
            <text x="192" y="35" fill="#a1bdce" fontSize="12">
              y
            </text>
          </svg>
          <p>
            Connect the equation.
            <br />
            See the pattern.
          </p>
        </div>
      </div>
      <div className="teaching-topics">
        {[
          [
            "01",
            "Mathematics",
            "Build a foundation in algebra, functions, geometry, and structured problem-solving.",
          ],
          [
            "02",
            "Additional mathematics",
            "Work through equations, coordinate relationships, and multi-step reasoning.",
          ],
          [
            "03",
            "Science & STPM topics",
            "Connect mathematical tools with scientific ideas and higher-level mathematics.",
          ],
        ].map(([n, t, d]) => (
          <article key={n}>
            <span className="eyebrow">{n} / SUBJECT FOCUS</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </div>
      <div className="teaching-method">
        <span className="eyebrow">HOW I LIKE TO EXPLAIN THINGS</span>
        <h2>
          Start with the idea.
          <br />
          <span>Then build the method.</span>
        </h2>
        <ol>
          <li>
            <span>01</span>
            <div>
              <h3>Find the starting point</h3>
              <p>
                Identify what the learner knows and what the question is asking.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Make the steps visible</h3>
              <p>
                Use a worked example, a diagram, or a simpler version of the
                problem.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Let understanding do the work</h3>
              <p>
                Try a related question and explain the reasoning in the
                learner’s own words.
              </p>
            </div>
          </li>
        </ol>
      </div>
      <p className="teaching-privacy">
        This page describes tutoring experience. Student records, payments,
        class recordings, and third-party textbooks or question banks are not
        published.
      </p>
      <Link className="button" to="/contact">
        Get in touch <Arrow diagonal />
      </Link>
    </section>
  );
}
