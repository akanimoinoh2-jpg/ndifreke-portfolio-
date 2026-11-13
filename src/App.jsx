import React, { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import petrollBusinessOverview from "../Screenshot 2026-06-07 230802.png";
import petrollOperations from "../Screenshot 2026-06-07 230931.png";
import petrollExecutiveSummary from "../Screenshot 2026-06-07 231037.png";
import drawSqlDiagram from "../Screenshot 2026-07-02 222931.png";
import pythonExercise from "../Screenshot 2026-07-28 203328.png";
import workbookScreenshot from "../Screenshot 2026-11-09 195320.png";
import superstoreScreenshot from "../Screenshot 2026-11-09 201812.png";
import concordVideo from "../CONCORD PROJECT.mp4";
import juneRecording from "../Recording 2026-06-07 235700.mp4";
import whatsappVideo from "../WhatsApp Video 2026-07-25 at 8.30.40 PM.mp4";
import teamAlphaWorkbook from "../TEAM_ALPHA PROJECT- Financial Performance & Revenue Forecasting.zip?url";

const linkedInUrl =
  "https://www.linkedin.com/in/ndifreke-enefiok-jacob-?utm_source=share_via&utm_content=profile&utm_medium=member_ios";
const githubUrl = "https://github.com/analystdestiny27";
const whatsappUrl = "https://wa.me/2347033346833";
const ADMIN_PASSWORD = "ndifreke2026";

const imageProjects = {
  "petroll-overview": {
    category: "Power BI · Petroll Ltd.",
    title: "Business Overview",
    src: petrollBusinessOverview,
    fileName: "Screenshot 2026-06-07 230802.png",
    summary:
      "A business overview bringing revenue movement and product-level performance into one view for Petroll Ltd.",
    question: "What is happening across the business at a glance?",
    focus: [
      ["Revenue movement", "Follow the revenue trend and compare performance over time."],
      ["Product contribution", "See how products contribute to the overall business picture."],
      ["Overview first", "A summary page designed to make the key measures easy to scan."],
    ],
  },
  "petroll-operations": {
    category: "Power BI · Petroll Ltd.",
    title: "Operations & Performance",
    src: petrollOperations,
    fileName: "Screenshot 2026-06-07 230931.png",
    summary:
      "An operational dashboard view that brings performance indicators and business trends together for closer review.",
    question: "Where can an operations view add useful context?",
    focus: [
      ["Performance indicators", "Review the summary measures presented on the operations page."],
      ["Trend context", "Compare the visual trend charts to see how results move over time."],
      ["Explore the detail", "Use the dashboard layout to move from headline measures into supporting views."],
    ],
  },
  "petroll-executive-summary": {
    category: "Power BI · Petroll Ltd.",
    title: "Executive Summary & Insights",
    src: petrollExecutiveSummary,
    fileName: "Screenshot 2026-06-07 231037.png",
    summary:
      "An executive-facing summary page combining performance visuals with a concise set of written observations.",
    question: "How can the dashboard make its main signals easier to act on?",
    focus: [
      ["Key measures", "Bring the summary indicators into a single, readable view."],
      ["Visual comparisons", "Use charts to add context to performance figures."],
      ["Written insights", "Pair dashboard visuals with concise observations for quicker review."],
    ],
  },
  "drawsql-schema": {
    category: "Database design · drawSQL",
    title: "Relational schema diagram",
    src: drawSqlDiagram,
    fileName: "Screenshot 2026-07-02 222931.png",
    summary:
      "A captured relational schema diagram showing how records are organized and connected across the pictured database entities.",
    question: "How do the entities in this database relate to one another?",
    focus: [
      ["Entity map", "Review the pictured customer, sales, product, supplier, and category tables."],
      ["Relationships", "Trace the links shown between related records."],
      ["Structure before analysis", "A schema view helps clarify the data model before querying its contents."],
    ],
  },
  "python-exercise": {
    category: "Python · Learning exercise",
    title: "Voter eligibility exercise",
    src: pythonExercise,
    fileName: "Screenshot 2026-07-28 203328.png",
    summary:
      "A Python learning exercise that checks a person's age and voter-card response against eligibility conditions.",
    question: "How can input and conditional logic produce a clear eligibility result?",
    focus: [
      ["User input", "Collect the age and voter-card response used by the exercise."],
      ["Conditional logic", "Evaluate the provided values against the pictured conditions."],
      ["Readable outcomes", "Return a message that reflects the checked scenario."],
    ],
  },
  "financial-workbook": {
    category: "Financial dashboard · TEAM_ALPHA project",
    title: "SuperStore financial performance dashboard",
    src: workbookScreenshot,
    fileName: "Screenshot 2026-11-09 195320.png",
    summary:
      "A SuperStore Americas performance dashboard with headline metrics and views of revenue, growth, and category margin.",
    question: "What do the sales and profitability views show together?",
    focus: [
      ["Headline performance", "The dashboard reports $2,297,201 in sales and $286,397 in profit."],
      ["Trend and comparison", "Monthly revenue and year-over-year views add time context."],
      ["Category margin", "A category-by-year comparison supports a more detailed profitability review."],
    ],
  },
  "superstore-workbook": {
    category: "Excel · SuperStore dataset",
    title: "Transaction-level workbook",
    src: superstoreScreenshot,
    fileName: "Screenshot 2026-11-09 201812.png",
    summary:
      "A view of the underlying SuperStore spreadsheet, with customer, location, product, sales, quantity, discount, and profit fields.",
    question: "Which fields are available to explore retail performance?",
    focus: [
      ["Customer and location", "The visible columns include customer, segment, city, state, and region."],
      ["Product detail", "Product name, category, sub-category, and product ID appear in the table."],
      ["Sales measures", "Sales, quantity, discount, and profit fields support further analysis."],
    ],
  },
};

const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 20 20"
      fill="none"
    >
      {diagonal ? (
        <path d="M5 15 15 5M6 5h9v9" />
      ) : (
        <path d="M3 10h13m-5-5 5 5-5 5" />
      )}
    </svg>
  );
}

function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);
  const [speechMessage, setSpeechMessage] = useState("");
  const assistantPanelRef = React.useRef(null);
  const assistantToggleRef = React.useRef(null);

  useEffect(() => {
    if (!assistantOpen) return undefined;

    assistantPanelRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setAssistantOpen(false);
        assistantToggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [assistantOpen]);

  useEffect(() => {
    if (!assistantOpen) {
      window.speechSynthesis?.cancel();
      setAssistantSpeaking(false);
    }

    return () => window.speechSynthesis?.cancel();
  }, [assistantOpen]);

  const introduction =
    "Hello, I’m KingTalker. Let me introduce Ndifreke EnefioK. She is a journalist and development reporter based in Uyo, Akwa Ibom, with over six years of reporting experience. Her work includes research, editing, data journalism, multimedia storytelling, and fact-checking. She is growing her data analysis skills and sharing projects such as a SuperStore financial performance dashboard. Explore her portfolio, or contact her on WhatsApp.";

  const toggleAssistantSpeech = () => {
    const speech = window.speechSynthesis;

    if (!speech || typeof window.SpeechSynthesisUtterance === "undefined") {
      setSpeechMessage(
        "Speech playback is not supported in this browser. You can read the introduction above.",
      );
      return;
    }

    setSpeechMessage("");
    if (assistantSpeaking) {
      speech.cancel();
      setAssistantSpeaking(false);
      return;
    }

    speech.cancel();
    const utterance = new window.SpeechSynthesisUtterance(introduction);
    utterance.lang = "en-NG";
    utterance.rate = 0.96;
    utterance.onstart = () => setAssistantSpeaking(true);
    utterance.onend = () => setAssistantSpeaking(false);
    utterance.onerror = () => {
      setAssistantSpeaking(false);
      setSpeechMessage("Voice playback could not start. Please read the introduction above.");
    };
    speech.speak(utterance);
  };

  const closeAssistant = () => {
    setAssistantOpen(false);
    assistantToggleRef.current?.focus();
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link
          aria-label="Ndifreke EnefioK home"
          className="brand"
          onClick={() => setMenuOpen(false)}
          to="/"
        >
          <span className="brand-mark">NE</span>
          <span className="brand-name">
            Ndifreke <b>EnefioK</b>
          </span>
        </Link>
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
        </button>
        <nav
          aria-label="Main navigation"
          className={`main-nav${menuOpen ? " is-open" : ""}`}
        >
          {navigation.map(({ label, to }) => (
            <NavLink
              end={to === "/"}
              key={to}
              onClick={() => setMenuOpen(false)}
              to={to}
            >
              {label}
            </NavLink>
          ))}
          <Link
            className="nav-note"
            onClick={() => setMenuOpen(false)}
            to="/contact"
          >
            Let’s talk <ArrowIcon diagonal />
          </Link>
          <a
            aria-label="Chat on WhatsApp at 07033346833"
            className="nav-whatsapp"
            href={whatsappUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            WhatsApp <span>07033346833</span> <ArrowIcon diagonal />
          </a>
        </nav>
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <div className="assistant-widget">
        {assistantOpen && (
          <section
            aria-labelledby="assistant-title"
            className="assistant-panel"
            id="assistant-panel"
            ref={assistantPanelRef}
            role="dialog"
            tabIndex={-1}
          >
            <div className="assistant-panel-heading">
              <div>
                <p className="assistant-kicker">KingTalker · Profile guide</p>
                <h2 id="assistant-title">A little about Ndifreke</h2>
              </div>
              <button
                aria-label="Close KingTalker assistant"
                className="assistant-close"
                onClick={closeAssistant}
                type="button"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <p>
              Ndifreke EnefioK is a journalist and development reporter based
              in Uyo, Akwa Ibom, with over six years of reporting experience.
              Her work spans human-interest reporting, editing, data journalism,
              multimedia production, and fact-checking.
            </p>
            <button
              aria-label={assistantSpeaking ? "Stop KingTalker" : "Let KingTalker speak"}
              className="assistant-speech-button"
              onClick={toggleAssistantSpeech}
              type="button"
            >
              <span aria-hidden="true">{assistantSpeaking ? "Ⅱ" : "▶"}</span>
              {assistantSpeaking ? "Stop speaking" : "Listen to introduction"}
            </button>
            {speechMessage && (
              <p aria-live="polite" className="assistant-speech-message">
                {speechMessage}
              </p>
            )}
            <p className="assistant-note">
              KingTalker is a spoken profile guide, not an AI chat service.
            </p>
            <a
              className="assistant-whatsapp"
              href={whatsappUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Message on WhatsApp · 07033346833 <ArrowIcon diagonal />
            </a>
          </section>
        )}
        <button
          aria-expanded={assistantOpen}
          aria-controls={assistantOpen ? "assistant-panel" : undefined}
          aria-label={
            assistantOpen ? "Hide KingTalker assistant" : "Open KingTalker assistant"
          }
          className="assistant-toggle"
          onClick={() => {
            if (assistantOpen) {
              closeAssistant();
            } else {
              setAssistantOpen(true);
            }
          }}
          ref={assistantToggleRef}
          type="button"
        >
          <span aria-hidden="true" className="assistant-toggle-mark">
            KT
          </span>
          <span>KingTalker</span>
        </button>
      </div>

      <footer className="site-footer">
        <div className="footer-top">
          <p className="eyebrow eyebrow-light">Have a story worth exploring?</p>
          <a className="footer-email" href="mailto:ndifrekeenefiok27@gmail.com">
            Let’s find the signal.
            <ArrowIcon diagonal />
          </a>
        </div>
        <div className="footer-bottom">
          <Link className="footer-brand" to="/">
            NE <span>Ndifreke EnefioK</span>
          </Link>
          <p>Reporting, research &amp; data storytelling · Uyo, Nigeria</p>
          <div className="footer-contacts">
            <a href={whatsappUrl} rel="noopener" target="_blank">
              WhatsApp · 07033346833
            </a>
            <a href={linkedInUrl} rel="noopener" target="_blank">
              LinkedIn
            </a>
            <a href="mailto:ndifrekeenefiok27@gmail.com">
              Email me <ArrowIcon diagonal />
            </a>
            <Link className="footer-admin-link" to="/admin">
              Admin <ArrowIcon diagonal />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function Eyebrow({ children, className = "" }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

function SectionHeading({ number, eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <div className="section-index">
        <span>{number}</span>
        <span className="index-line" />
        <span>{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function DashboardImage({ className = "" }) {
  return (
    <img
      alt="SuperStore Americas Financial Performance Dashboard showing sales, profit, profit margin, order count, and yearly revenue charts"
      className={`dashboard-image ${className}`}
      height="422"
      loading="lazy"
      src="/assets/superstore-dashboard.png"
      width="724"
    />
  );
}

function EvidenceFigure({
  fileName,
  title,
  src,
  type = "image",
  detail,
  projectId,
}) {
  return (
    <figure className={`evidence-figure${type === "video" ? " is-video" : ""}`}>
      {type === "video" ? (
        <video controls playsInline preload="metadata">
          <source src={src} />
          Your browser does not support embedded video.
        </video>
      ) : (
        <Link
          aria-label={`Open ${title} project dashboard`}
          className="evidence-media"
          to={`/projects/evidence/${projectId}`}
        >
          <img alt={title} loading="lazy" src={src} />
          <span className="evidence-open-label">
            Explore this project <ArrowIcon />
          </span>
        </Link>
      )}
      <figcaption>
        {projectId ? (
          <Link
            className="evidence-title-link"
            to={`/projects/evidence/${projectId}`}
          >
            <strong>{title}</strong>
          </Link>
        ) : (
          <strong>{title}</strong>
        )}
        {detail && <span>{detail}</span>}
        <small>{fileName}</small>
      </figcaption>
    </figure>
  );
}

function HomePage() {
  return (
    <>
      <section className="home-hero page-wrap">
        <div className="hero-copy">
          <Eyebrow>
            <span className="eyebrow-dot" />
            Reporter · Emerging data analyst
          </Eyebrow>
          <h1>
            The story
            <br />
            is in the <em>details.</em>
          </h1>
          <p className="hero-description">
            I’m Ndifreke — a reporter learning to make data speak. I bring
            curiosity, careful verification, and clear storytelling to every
            question I explore.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" to="/projects">
              Explore my work <ArrowIcon />
            </Link>
            <Link className="text-link" to="/about">
              A little about me <ArrowIcon diagonal />
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="footnote-rule" />
            Based in Uyo, Nigeria
          </div>
        </div>
        <div className="hero-portrait">
          <div className="portrait-frame">
            <img
              alt="Ndifreke EnefioK, reporter and emerging data analyst"
              fetchPriority="high"
              height="457"
              src="/assets/ndifreke-portrait.jpeg"
              width="457"
            />
            <span className="portrait-number">01 / 04</span>
          </div>
          <div className="portrait-caption">
            <span>Ndifreke EnefioK</span>
            <span>Reporter&nbsp; / &nbsp;Analyst</span>
          </div>
          <div aria-hidden="true" className="hero-stamp">
            <span>Observe</span>
            <span>Question</span>
            <span>Report</span>
          </div>
          <span aria-hidden="true" className="portrait-side-note">
            REPORTING MEETS DATA
          </span>
        </div>
      </section>

      <section aria-label="Professional snapshot" className="proof-strip">
        <div className="proof-inner page-wrap">
          <div>
            <strong>6+</strong>
            <span>years in development reporting</span>
          </div>
          <div>
            <strong>Uyo</strong>
            <span>Akwa Ibom State, Nigeria</span>
          </div>
          <div>
            <strong>01</strong>
            <span>featured data project</span>
          </div>
          <p>Always looking closer.</p>
        </div>
      </section>

      <section className="featured-section page-wrap">
        <SectionHeading
          eyebrow="A closer look"
          number="01"
          title={
            <>
              Numbers with
              <br />
              a point of view.
            </>
          }
        >
          A first exploration of retail performance, presented through an
          interactive-style Excel dashboard.
        </SectionHeading>
        <article className="featured-project">
          <div className="featured-image-wrap">
            <DashboardImage />
            <span className="image-label">PROJECT 01 — EXCEL DASHBOARD</span>
          </div>
          <div className="featured-project-copy">
            <Eyebrow className="eyebrow-lime">Featured project</Eyebrow>
            <h3>SuperStore financial performance</h3>
            <p>
              A view of sales, profit, margin, and year-on-year patterns across
              the SuperStore dataset — bringing a large retail picture into
              focus.
            </p>
            <div className="project-inline-metrics">
              <span>
                <b>$2.30M</b> sales
              </span>
              <span>
                <b>12.5%</b> profit margin
              </span>
            </div>
            <Link
              className="light-link"
              to="/projects/superstore-financial-performance"
            >
              Read the project <ArrowIcon />
            </Link>
          </div>
        </article>
      </section>

      <section className="approach-section">
        <div className="page-wrap approach-layout">
          <SectionHeading
            eyebrow="How I work"
            number="02"
            title={
              <>
                Ask well.
                <br />
                Check twice.
              </>
            }
          >
            Journalism taught me that a useful finding is only as good as the
            question and the evidence behind it.
          </SectionHeading>
          <div className="approach-list">
            {[
              ["01", "Research & reporting", "Follow a question to its source."],
              ["02", "Fact-checking", "Verify before drawing a conclusion."],
              ["03", "Data storytelling", "Make the evidence clear and human."],
              ["04", "Excel analysis", "Explore patterns in a practical way."],
            ].map(([number, title, description]) => (
              <div className="approach-row" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <ArrowIcon diagonal />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-contact page-wrap">
        <div className="contact-mark" aria-hidden="true">
          NE
        </div>
        <div>
          <Eyebrow>Curious about working together?</Eyebrow>
          <h2>Let’s start with a good question.</h2>
        </div>
        <Link className="button button-outline" to="/contact">
          Get in touch <ArrowIcon />
        </Link>
        <a
          className="home-whatsapp"
          href={whatsappUrl}
          rel="noopener"
          target="_blank"
        >
          WhatsApp · 07033346833 <ArrowIcon diagonal />
        </a>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <div className="inner-page">
      <section className="page-intro page-wrap">
        <Eyebrow>
          <span className="eyebrow-dot" />
          About Ndifreke
        </Eyebrow>
        <h1>
          A reporter’s eye.
          <br />
          <em>A learner’s mind.</em>
        </h1>
        <p className="intro-deck">
          I’ve spent years asking questions, checking facts, and helping people
          make sense of the issues shaping their lives. Now I’m bringing that
          same discipline to data.
        </p>
      </section>

      <section className="story-section page-wrap">
        <div className="story-image">
          <img
            alt="Portrait of Ndifreke EnefioK"
            height="457"
            loading="lazy"
            src="/assets/ndifreke-portrait.jpeg"
            width="457"
          />
          <span>UYO, NIGERIA · 05°02′N 07°55′E</span>
        </div>
        <div className="story-copy">
          <Eyebrow>My point of view</Eyebrow>
          <h2>Good reporting starts with listening.</h2>
          <p>
            As a development reporter at The Mail Newspaper in Uyo, I cover
            stories that need context, patience, and a close look at the
            evidence. More than six years of development reporting have shaped
            how I approach research: stay curious, verify the details, and make
            the meaning accessible.
          </p>
          <p>
            My growing interest in data analysis is a natural extension of that
            work. I’m building practical skills in data analysis and dashboard
            storytelling, while bringing a reporter’s care for accuracy to the
            numbers.
          </p>
          <a
            className="text-link"
            download
            href="/assets/Ndifreke-Enefiok-CV.docx"
          >
            Download my CV <ArrowIcon diagonal />
          </a>
        </div>
      </section>

      <section className="career-section">
        <div className="page-wrap">
          <SectionHeading
            eyebrow="Experience & learning"
            number="03"
            title="A practice built on curiosity."
          />
          <div className="career-grid">
            <div className="career-column">
              <Eyebrow className="career-label">In the newsroom</Eyebrow>
              <article className="timeline-entry">
                <span className="timeline-date">JAN 2024 — PRESENT</span>
                <h3>Reporter</h3>
                <p>The Mail Newspaper · Uyo</p>
                <span className="entry-detail">
                  Development reporting, research, writing, and editing.
                </span>
              </article>
              <Eyebrow className="career-label">Education</Eyebrow>
              <article className="timeline-entry">
                <span className="timeline-date">2014</span>
                <h3>B.A. Communication Arts</h3>
                <p>University of Uyo</p>
              </article>
              <article className="timeline-entry">
                <span className="timeline-date">2008 — 2010</span>
                <h3>National Diploma, Mass Communication</h3>
                <p>Heritage Polytechnic</p>
              </article>
            </div>
            <div className="career-column">
              <Eyebrow className="career-label">Building data skills</Eyebrow>
              <article className="timeline-entry">
                <span className="timeline-date">FEB 2026 — PRESENT</span>
                <h3>Data Analysis Training</h3>
                <p>Start Innovation Hub</p>
              </article>
              <article className="timeline-entry">
                <span className="timeline-date">JUL — SEP 2024</span>
                <h3>Data Analysis Training</h3>
                <p>Youth Alive Foundation</p>
              </article>
              <Eyebrow className="career-label">Selected training</Eyebrow>
              <ul className="training-list">
                <li>
                  <span>2024</span>
                  Broadcast Investigation &amp; Specialized Reporting · Daily
                  Trust Foundation
                </li>
                <li>
                  <span>2023</span>
                  Investigative &amp; Data Journalism: Open Contract Reporting ·
                  ICIR
                </li>
                <li>
                  <span>2022</span>
                  Election Reporting &amp; Fact-Checking · International Press
                  Centre
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="civic-section page-wrap">
        <div>
          <Eyebrow>Beyond the byline</Eyebrow>
          <h2>Research, service, and civic voice.</h2>
        </div>
        <div className="civic-list">
          <div>
            <span>01</span>
            <p>
              <b>Director, Research &amp; Grants</b>
              <br />
              Queen Mother Empowerment Foundation · Nov 2024 — Present
            </p>
          </div>
          <div>
            <span>02</span>
            <p>
              <b>Media Officer</b>
              <br />
              CYDPAN · Aug 2021 — Present
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectCard() {
  return (
    <article className="project-card">
      <Link
        aria-label="View SuperStore financial performance project"
        className="project-card-image"
        to="/projects/superstore-financial-performance"
      >
        <DashboardImage />
        <span className="image-corner-label">VIEW PROJECT ↗</span>
      </Link>
      <div className="project-card-body">
        <div className="project-card-title">
          <div>
            <Eyebrow>Excel dashboard · Retail</Eyebrow>
            <h2>SuperStore financial performance</h2>
          </div>
          <span className="project-index">01</span>
        </div>
        <p>
          What does the overall picture of SuperStore sales and profitability
          reveal? This dashboard brings together headline performance measures,
          monthly revenue, year-over-year growth, and category margin.
        </p>
        <div className="project-stats">
          <Metric label="Total sales" value="$2.30M" />
          <Metric label="Total profit" value="$286K" />
          <Metric label="Orders" value="9,994" />
        </div>
        <Link
          className="text-link"
          to="/projects/superstore-financial-performance"
        >
          Explore the project <ArrowIcon />
        </Link>
        <a
          className="text-link workbook-link"
          download
          href={teamAlphaWorkbook}
        >
          Download the supplied workbook ZIP <ArrowIcon diagonal />
        </a>
      </div>
    </article>
  );
}

function RecentProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Works on Vercel too — /uploads paths come from the same origin as the frontend.
  const apiBase = "";

  useEffect(() => {
    let cancelled = false;
    fetch(`${apiBase}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setProjects(Array.isArray(data) ? data : []);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!loaded || projects.length === 0) return null;

  return (
    <section aria-labelledby="recent-projects-title" className="evidence-group">
      <div className="evidence-group-heading">
        <span>04</span>
        <div>
          <h3 id="recent-projects-title">Recent projects</h3>
          <p>The latest additions to the portfolio.</p>
        </div>
      </div>
      <div className="evidence-grid">
        {projects.map((project) => (
          <EvidenceFigure
            detail={project.category}
            fileName={project.title}
            key={project.id}
            projectId={`recent-${project.id}`}
            src={project.image}
            title={project.title}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectsPage() {
  return (
    <div className="inner-page">
      <section className="page-intro page-wrap">
        <Eyebrow>
          <span className="eyebrow-dot" />
          Selected work
        </Eyebrow>
        <h1>
          Evidence, made
          <br />
          <em>easier to see.</em>
        </h1>
        <p className="intro-deck">
          Dashboards, analysis exercises, and project recordings — with the
          supplied evidence shown alongside each entry.
        </p>
      </section>

      <section className="projects-list page-wrap">
        <ProjectCard />
        <p className="projects-note">
          The workbook ZIP and dashboard screenshot are included with the
          SuperStore project.
        </p>
      </section>

      <section aria-labelledby="evidence-title" className="evidence-section">
        <div className="page-wrap">
          <div className="evidence-heading">
            <Eyebrow>
              <span className="eyebrow-dot" />
              Project evidence
            </Eyebrow>
            <h2 id="evidence-title">Screenshots &amp; recordings</h2>
            <p>
              Original screenshots and video files supplied with the portfolio.
              Each is labeled with its visible context or original filename.
            </p>
          </div>

          <section aria-labelledby="petroll-evidence" className="evidence-group">
            <div className="evidence-group-heading">
              <span>01</span>
              <div>
                <h3 id="petroll-evidence">Petroll Ltd. dashboard pages</h3>
                <p>Power BI screenshots titled Business Overview, Operations &amp; Performance, and Executive Summary &amp; Insights.</p>
              </div>
            </div>
            <div className="evidence-grid">
              <EvidenceFigure
                detail="Business Overview for Petroll Ltd."
                fileName="Screenshot 2026-06-07 230802.png"
                projectId="petroll-overview"
                src={petrollBusinessOverview}
                title="Business Overview"
              />
              <EvidenceFigure
                detail="Operations & Performance"
                fileName="Screenshot 2026-06-07 230931.png"
                projectId="petroll-operations"
                src={petrollOperations}
                title="Operations & Performance"
              />
              <EvidenceFigure
                detail="Executive Summary & Insights"
                fileName="Screenshot 2026-06-07 231037.png"
                projectId="petroll-executive-summary"
                src={petrollExecutiveSummary}
                title="Executive Summary & Insights"
              />
            </div>
          </section>

          <section aria-labelledby="other-evidence" className="evidence-group">
            <div className="evidence-group-heading">
              <span>02</span>
              <div>
                <h3 id="other-evidence">Other project snapshots</h3>
                <p>Database diagram, Python exercise, and the supplied financial-performance workbook screenshot.</p>
              </div>
            </div>
            <div className="evidence-grid">
              <EvidenceFigure
                detail="Diagram captured in drawSQL"
                fileName="Screenshot 2026-07-02 222931.png"
                projectId="drawsql-schema"
                src={drawSqlDiagram}
                title="drawSQL schema diagram"
              />
              <EvidenceFigure
                detail="Python code shown in Visual Studio Code"
                fileName="Screenshot 2026-07-28 203328.png"
                projectId="python-exercise"
                src={pythonExercise}
                title="Python exercise"
              />
              <EvidenceFigure
                detail="TEAM_ALPHA PROJECT — Financial Performance & Revenue Forecasting"
                fileName="Screenshot 2026-11-09 195320.png"
                projectId="financial-workbook"
                src={workbookScreenshot}
                title="Financial performance workbook"
              />
              <EvidenceFigure
                detail="SuperStore Americas Financial Performance Dashboard"
                fileName="Screenshot 2026-11-09 201812.png"
                projectId="superstore-workbook"
                src={superstoreScreenshot}
                title="Data cleaning on Excel"
              />
            </div>
          </section>

          <section aria-labelledby="recordings-title" className="evidence-group">
            <div className="evidence-group-heading">
              <span>03</span>
              <div>
                <h3 id="recordings-title">Project recordings</h3>
                <p>Play the supplied videos here; their original filenames are retained.</p>
              </div>
            </div>
            <div className="evidence-grid video-grid">
              <EvidenceFigure
                fileName="CONCORD PROJECT.mp4"
                src={concordVideo}
                title="CONCORD PROJECT"
                type="video"
              />
              <EvidenceFigure
                fileName="Recording 2026-06-07 235700.mp4"
                src={juneRecording}
                title="Recording · June 7, 2026"
                type="video"
              />
              <EvidenceFigure
                fileName="WhatsApp Video 2026-07-25 at 8.30.40 PM.mp4"
                src={whatsappVideo}
                title="WhatsApp video · July 25, 2026"
                type="video"
              />
            </div>
          </section>

          <RecentProjectsSection />
        </div>
      </section>
    </div>
  );
}

function ProjectDetailPage() {
  return (
    <div className="inner-page project-detail">
      <section className="detail-heading page-wrap">
        <Link className="back-link" to="/projects">
          <ArrowIcon /> All projects
        </Link>
        <div className="detail-title-row">
          <div>
            <Eyebrow>
              <span className="eyebrow-dot" />
              Project 01 · Excel dashboard
            </Eyebrow>
            <h1>
              SuperStore
              <br />
              <em>financial performance</em>
            </h1>
          </div>
          <p>
            An overview of retail sales and profitability, built from the
            supplied SuperStore workbook and dashboard.
          </p>
        </div>
      </section>

      <section className="detail-dashboard page-wrap">
        <div className="detail-image-frame">
          <DashboardImage />
        </div>
        <div className="dashboard-caption">
          <span>FIG. 01</span>
          <span>SuperStore Americas Financial Performance Dashboard</span>
          <span>Source: supplied project workbook</span>
        </div>
        <a
          className="text-link"
          download
          href={teamAlphaWorkbook}
        >
          Download TEAM_ALPHA project workbook ZIP <ArrowIcon diagonal />
        </a>
      </section>

      <section className="detail-metrics page-wrap" aria-label="Dashboard metrics">
        <Metric label="Total sales" value="$2,297,201" />
        <Metric label="Total profit" value="$286,397" />
        <Metric label="Overall profit margin" value="12.5%" />
        <Metric label="Total orders" value="9,994" />
        <Metric label="Best-performing year" value="2014" />
      </section>

      <section className="detail-analysis page-wrap">
        <div className="analysis-lede">
          <Eyebrow>The question</Eyebrow>
          <h2>How is the store performing — and where should we look closer?</h2>
          <p>
            The dashboard places headline results beside the trends and
            breakdowns that help explain them. It is an exploratory overview,
            not a claim about business outcomes.
          </p>
        </div>
        <div className="analysis-findings">
          <article>
            <span>01 / REVENUE OVER TIME</span>
            <h3>Monthly movement, in context.</h3>
            <p>
              The monthly revenue chart makes changes across 2011–2014 visible,
              giving the annual results a more detailed timeline.
            </p>
          </article>
          <article>
            <span>02 / GROWTH</span>
            <h3>Compare the years.</h3>
            <p>
              A year-over-year view provides a quick way to compare annual
              growth across the four years shown in the dashboard.
            </p>
          </article>
          <article>
            <span>03 / CATEGORY MARGIN</span>
            <h3>Look beyond the total.</h3>
            <p>
              Profit margin by category and year shows how profitability varies
              across the product mix rather than hiding everything in one
              overall figure.
            </p>
          </article>
        </div>
      </section>

      <section className="detail-footer page-wrap">
        <div>
          <Eyebrow>Keep looking closer</Eyebrow>
          <h2>More questions are always worth asking.</h2>
        </div>
        <Link className="button button-dark" to="/projects">
          Back to projects <ArrowIcon />
        </Link>
      </section>
    </div>
  );
}

function EvidenceProjectPage() {
  const { evidenceId } = useParams();
  const project = imageProjects[evidenceId];

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <div className="inner-page project-detail evidence-project-detail">
      <section className="detail-heading page-wrap">
        <Link className="back-link" to="/projects">
          <ArrowIcon /> All projects
        </Link>
        <div className="detail-title-row">
          <div>
            <Eyebrow>
              <span className="eyebrow-dot" />
              {project.category}
            </Eyebrow>
            <h1>{project.title}</h1>
          </div>
          <p>{project.summary}</p>
        </div>
      </section>

      <section className="detail-dashboard page-wrap">
        <div className="evidence-detail-frame">
          <div className="evidence-detail-topbar">
            <span className="dashboard-status"><i /> PROJECT VIEW</span>
            <span>{project.category}</span>
            <span>01 / 01</span>
          </div>
          <img alt={project.title} src={project.src} />
          <div className="evidence-detail-bottom">
            <span>{project.title}</span>
            <span>{project.fileName}</span>
          </div>
        </div>
      </section>

      <section className="evidence-project-overview page-wrap">
        <div className="evidence-question">
          <Eyebrow>THE QUESTION</Eyebrow>
          <h2>{project.question}</h2>
        </div>
        <div className="evidence-focus-grid">
          {project.focus.map(([label, description], index) => (
            <article key={label}>
              <span>0{index + 1} / PROJECT LENS</span>
              <h3>{label}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-footer page-wrap">
        <div>
          <Eyebrow>Continue exploring</Eyebrow>
          <h2>Every view can lead to a better question.</h2>
        </div>
        <Link className="button button-dark" to="/projects">
          Back to projects <ArrowIcon />
        </Link>
      </section>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="inner-page">
      <section className="contact-page page-wrap">
        <div className="contact-main">
          <Eyebrow>
            <span className="eyebrow-dot" />
            Contact
          </Eyebrow>
          <h1>
            Have a question?
            <br />
            <em>I’m listening.</em>
          </h1>
          <p>
            For reporting, research, data storytelling, or a thoughtful
            conversation, reach out by email or phone.
          </p>
          <a
            className="button button-dark"
            href="mailto:ndifrekeenefiok27@gmail.com"
          >
            Send an email <ArrowIcon diagonal />
          </a>
          <a
            className="contact-email"
            href="mailto:ndifrekeenefiok27@gmail.com"
          >
            ndifrekeenefiok27@gmail.com
          </a>
          <div aria-label="Contact and professional profiles" className="contact-links">
            <a href={whatsappUrl} rel="noopener" target="_blank">
              WhatsApp · 07033346833 <ArrowIcon diagonal />
            </a>
            <a href={linkedInUrl} rel="noopener" target="_blank">
              LinkedIn profile <ArrowIcon diagonal />
            </a>
            <a href={githubUrl} rel="noopener noreferrer" target="_blank">
              GitHub profile <ArrowIcon diagonal />
            </a>
          </div>
        </div>
        <aside className="contact-aside">
          <div className="contact-aside-mark">NE</div>
          <Eyebrow>Find me in</Eyebrow>
          <h2>Uyo, Nigeria</h2>
          <p>Akwa Ibom State</p>
          <div className="contact-divider" />
          <Eyebrow>Call</Eyebrow>
          <a href="tel:+2347033346833">+234 703 334 6833</a>
          <a href="tel:+2349060559585">+234 906 055 9585</a>
        </aside>
      </section>
    </div>
  );
}

function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", category: "", summary: "", link: "" });
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadProjects = () => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => {});
  };

  useEffect(() => {
    if (loggedIn) loadProjects();
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <section className="page-wrap" style={{ maxWidth: 480, margin: "4rem auto" }}>
        <Eyebrow>Admin access</Eyebrow>
        <h1>Sign in to add projects</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (password === ADMIN_PASSWORD) {
              setLoggedIn(true);
              setError("");
            } else {
              setError("Incorrect password.");
            }
          }}
        >
          <input
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Admin password"
            style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem" }}
            type="password"
            value={password}
          />
          {error && <p style={{ color: "crimson" }}>{error}</p>}
          <button className="button button-dark" type="submit">Enter</button>
        </form>
      </section>
    );
  }

  const submitProject = async (event) => {
    event.preventDefault();
    if (!form.title || !image) {
      setMessage("A title and an image are both required.");
      return;
    }
    setSaving(true);
    setMessage("");
    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    body.append("image", image);

    try {
      const res = await fetch("/api/projects", {
        headers: { Authorization: `Bearer ${ADMIN_PASSWORD}` },
        method: "POST",
        body,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not save the project.");
      }
      setForm({ title: "", category: "", summary: "", link: "" });
      setImage(null);
      setMessage("Project added — it now appears in Recent projects on the Projects page.");
      loadProjects();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (id) => {
    const res = await fetch(`/api/projects/${id}`, {
      headers: { Authorization: `Bearer ${ADMIN_PASSWORD}` },
      method: "DELETE",
    });
    if (res.ok) loadProjects();
  };

  const fieldStyle = { width: "100%", padding: "0.75rem", marginBottom: "1rem" };

  return (
    <section className="page-wrap" style={{ maxWidth: 640, margin: "3rem auto" }}>
      <Eyebrow>Admin · Recent projects</Eyebrow>
      <h1>Add a recent project</h1>
      <p>Fill in the details and upload an image. It appears immediately in the Projects section.</p>
      <form onSubmit={submitProject}>
        <input
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          placeholder="Project title (required)"
          style={fieldStyle}
          value={form.title}
        />
        <input
          onChange={(event) => setForm({ ...form, category: event.target.value })}
          placeholder="Category, e.g. Power BI · Dashboard"
          style={fieldStyle}
          value={form.category}
        />
        <textarea
          onChange={(event) => setForm({ ...form, summary: event.target.value })}
          placeholder="Short summary"
          rows={3}
          style={fieldStyle}
          value={form.summary}
        />
        <input
          onChange={(event) => setForm({ ...form, link: event.target.value })}
          placeholder="Optional link"
          style={fieldStyle}
          value={form.link}
        />
        <input
          accept="image/*"
          capture="environment"
          onChange={(event) => setImage(event.target.files[0] || null)}
          style={{ marginBottom: "1rem" }}
          type="file"
        />
        {message && <p>{message}</p>}
        <button className="button button-dark" disabled={saving} type="submit">
          {saving ? "Saving…" : "Add project"}
        </button>
      </form>

      <h2 style={{ marginTop: "2.5rem" }}>Existing recent projects ({projects.length})</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {projects.map((project) => (
          <li
            key={project.id}
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <img
              alt=""
              height={48}
              src={project.image}
              style={{
                objectFit: "cover",
                borderRadius: 4,
                maxWidth: 64,
                height: "auto",
              }}
              width={64}
            />
            <strong style={{ flex: "1 1 120px", wordBreak: "break-word" }}>
              {project.title}
            </strong>
            <button
              className="text-link"
              onClick={() => deleteProject(project.id)}
              type="button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="not-found page-wrap">
      <Eyebrow>404 · Page not found</Eyebrow>
      <h1>
        That story
        <br />
        <em>isn’t here.</em>
      </h1>
      <Link className="button button-dark" to="/">
        Back to home <ArrowIcon />
      </Link>
      <Link
        className="button button-outline"
        style={{ marginLeft: "0.75rem" }}
        to="/admin"
      >
        Admin <ArrowIcon diagonal />
      </Link>
    </section>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route element={<HomePage />} index />
          <Route element={<AboutPage />} path="about" />
          <Route element={<ProjectsPage />} path="projects" />
          <Route
            element={<ProjectDetailPage />}
            path="projects/superstore-financial-performance"
          />
          <Route
            element={<EvidenceProjectPage />}
            path="projects/evidence/:evidenceId"
          />
          <Route element={<ContactPage />} path="contact" />
          <Route element={<AdminPage />} path="admin" />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </Routes>
    </>
  );
}
