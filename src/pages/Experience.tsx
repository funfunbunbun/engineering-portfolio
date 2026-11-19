import { Link } from "react-router-dom";
import { Arrow } from "../components/Visual";
import Icon from "../components/Icon";
import profile from "../data/profile.json";
import { aboutPhotos, type AboutPhoto } from "../data/aboutMedia";

export function AboutLinks() {
  return (
    <div className="about-socials">
      <a href={profile.linkedin} className="social-link" aria-label="LinkedIn" title="LinkedIn" target="_blank" rel="noopener noreferrer">
        <Icon name="linkedin" />
        <span className="icon-tooltip" aria-hidden="true">LinkedIn</span>
      </a>
      <a href={profile.youtube} className="social-link" aria-label="YouTube" title="YouTube" target="_blank" rel="noopener noreferrer">
        <Icon name="youtube" />
        <span className="icon-tooltip" aria-hidden="true">YouTube</span>
      </a>
    </div>
  );
}

export function PhotoGallery({
  group,
  topic,
}: {
  group: AboutPhoto["group"];
  topic?: AboutPhoto["topic"];
}) {
  const photos = aboutPhotos.filter(
    (photo) =>
      photo.group === group &&
      (topic
        ? photo.topic === topic
        : photo.group !== "achievement" || photo.topic !== "deans"),
  );
  if (!photos.length) return null;
  return (
    <div
      className={
        photos.length === 1 ? "about-photo-grid single" : "about-photo-grid"
      }
    >
      {photos.map((photo) => (
        <figure key={photo.file}>
          <a
            href={import.meta.env.BASE_URL + "assets/reviewed/" + photo.file}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View photo: ${photo.caption}`}
          >
            <img
              loading="lazy"
              src={import.meta.env.BASE_URL + "assets/reviewed/" + photo.file}
              alt={photo.alt}
            />
          </a>
          <figcaption>{photo.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function BeyondProjects() {
  return (
    <section className="section-wrap beyond-section">
      <div className="section-heading">
        <h2>About me</h2>
        <p>
          My time at university also included teaching, competitions, student
          clubs and event work.
        </p>
      </div>
      <div className="beyond-grid">
        {[
          {
            title: "Achievements",
            text: "Seven consecutive Dean’s Lists, first-class honours and a third-place team result in the PROTON challenge.",
            route: "/about",
          },
          {
            title: "Experience",
            text: "Industrial training, EICC, CETS, career fairs and student activities.",
            route: "/about/experience",
          },
          {
            title: "Tutoring",
            text: "SPM Form 4 and 5 STEM subjects, and Form 6 Mathematics T and Physics.",
            route: "/about/tutoring",
          },
        ].map((item) => (
          <Link className="beyond-card" to={item.route} key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <Arrow diagonal />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Experience({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  return (
    <section
      className={
        "section-wrap experience-page " +
        (embedded ? "about-experience" : "page-section")
      }
      id="experience"
    >
      {!embedded && (
        <Link to="/about" className="back-link">
          ← About me
        </Link>
      )}
      {embedded ? <h2>Experience</h2> : <h1>Experience</h1>}
      <div className="experience-timeline">
        <article>
          <span className="timeline-kind">Capstone</span>
          <div>
            <h3>Smart classroom school outreach</h3>
            <p>
              We demonstrated our smart classroom capstone project at a school.
            </p>
            <PhotoGallery group="experience" topic="capstone" />
          </div>
        </article>
        <article>
          <span className="timeline-kind">Industrial training</span>
          <div>
            <h3>MOHE–Intel ELITE programme</h3>
            <p>
              Training in digital design and verification, including Verilog,
              simulation, testbenches and timing. I worked through technical
              exercises and team activities during the programme.
            </p>
            <div className="tags">
              <span>Verilog</span>
              <span>Digital design</span>
              <span>Verification</span>
            </div>
            <PhotoGallery group="experience" topic="training" />
          </div>
        </article>
        <article>
          <span className="timeline-kind">Club leadership</span>
          <div>
            <h3>EICC and CETS</h3>
            <p>
              I was the director of CETS 1.0 and 2.0, and served as EICC
              secretary for one year. My work included coordinating activities,
              organising events and supporting the club’s administration.
            </p>
            <h4>CETS 1.0 and 2.0</h4>
            <PhotoGallery group="experience" topic="clubs" />
            <h4>Deepavali and school outreach</h4>
            <PhotoGallery group="experience" topic="activities" />
          </div>
        </article>
        <article>
          <span className="timeline-kind">University events</span>
          <div>
            <h3>Career Fair 2023 and 2024</h3>
            <p>
              I was part of the ceremony department and served as an emcee for
              the gala dinners. I helped with event arrangements, programme flow
              and communication on the day.
            </p>
            <PhotoGallery group="experience" topic="events" />
          </div>
        </article>
        <article>
          <span className="timeline-kind">Student activities</span>
          <div>
            <h3>PPSL orientation committee</h3>
            <p>
              I was part of PPSL, the orientation committee for the 2023 intake.
              We helped welcome new students and supported their introduction to
              university life.
            </p>
            <PhotoGallery group="experience" topic="ppsl" />
          </div>
        </article>
      </div>
      {!embedded && <AboutLinks />}
    </section>
  );
}

function TeachingIllustration() {
  return (
    <div className="teaching-art">
      <svg
        viewBox="0 0 480 310"
        role="img"
        aria-label="Vinay explaining a graph to a student at a whiteboard"
      >
        <rect
          x="160"
          y="25"
          width="275"
          height="160"
          rx="9"
          fill="#203747"
          stroke="#a8cee3"
        />
        <path
          d="M202 147h182M230 156V56M241 139q55-6 102-64"
          fill="none"
          stroke="#b5d9c6"
          strokeWidth="3"
        />
        <text x="278" y="61" fill="#dcebf4" fontSize="18">
          y = x²
        </text>
        <g stroke="#bdd8ea" strokeWidth="5" strokeLinecap="round" fill="none">
          <circle cx="112" cy="123" r="22" />
          <path d="M112 147v81m0-59 48 17 38-45m-86 29-31 33m31 25-24 55m24-55 30 55" />
          <circle cx="352" cy="219" r="18" />
          <path d="M352 240v40m0-29-38 12m38-10 32 10" />
        </g>
        <g stroke="#bdd8ea" fill="none" strokeWidth="2">
          <rect x="94" y="117" width="16" height="10" rx="3" />
          <rect x="115" y="117" width="16" height="10" rx="3" />
          <path d="M110 121h5" />
        </g>
        <text x="87" y="305" fill="#dcebf4" fontSize="15">
          Vinay
        </text>
        <text x="322" y="305" fill="#dcebf4" fontSize="15">
          Student
        </text>
        <path
          d="M286 273h131m-116 0v28m102-28v28"
          stroke="#a8cee3"
          strokeWidth="4"
        />
      </svg>
      <p>
        I like using diagrams and worked examples to explain a problem one step
        at a time.
      </p>
    </div>
  );
}

export function Teaching({ embedded = false }: { embedded?: boolean }) {
  return (
    <section
      className={
        "section-wrap teaching-page " +
        (embedded ? "about-teaching" : "page-section")
      }
      id="tutoring"
    >
      {!embedded && (
        <Link to="/about" className="back-link">
          ← About me
        </Link>
      )}
      <div className="teaching-hero">
        <div>
          {embedded ? <h2>Tutoring</h2> : <h1>Tutoring</h1>}
          <p>
            I teach Malaysian secondary-school and Form 6 subjects. I enjoy
            helping students understand the reasoning behind an answer and
            practise until they can work through a similar question themselves.
          </p>
          <div className="teaching-topics compact">
            <article>
              <h3>SPM · Form 4 and 5</h3>
              <p>STEM subjects, including mathematics and science.</p>
            </article>
            <article>
              <h3>Form 6</h3>
              <p>Mathematics T and Physics.</p>
            </article>
          </div>
          <a
            className="text-link"
            href={profile.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            My YouTube channel <Arrow diagonal />
          </a>
        </div>
        <TeachingIllustration />
      </div>
      <PhotoGallery group="teaching" />
      {!embedded && (
        <Link className="button" to="/contact">
          Contact me about tutoring <Arrow diagonal />
        </Link>
      )}
    </section>
  );
}
