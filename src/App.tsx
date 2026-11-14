import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

type Page =
  | "home"
  | "projects"
  | "about"
  | "health"
  | "logistic"
  | "claims"
  | "ticketing"
  | "sensor"
  | "leasing";

const assets = "/assets";

type GazeDirection =
  | "front"
  | "up"
  | "up-right"
  | "right"
  | "down-right"
  | "down"
  | "down-left"
  | "left"
  | "up-left";

const gazeStates: Record<
  GazeDirection,
  {
    color: string;
    size: number;
  }
> = {
  front: {
    color: "#ebf1ff",
    size: 753.77,
  },
  up: {
    color: "#eafae5",
    size: 350,
  },
  "up-right": {
    color: "#f7e9fc",
    size: 350,
  },
  right: {
    color: "#fcfae9",
    size: 450,
  },
  "down-right": {
    color: "#d5f4f8",
    size: 600,
  },
  down: {
    color: "#fce9e9",
    size: 350,
  },
  "down-left": {
    color: "#dee3ff",
    size: 350,
  },
  left: {
    color: "#fcf0e9",
    size: 350,
  },
  "up-left": {
    color: "#e9fcf6",
    size: 350,
  },
};

function getGazeDirection(x: number, y: number): GazeDirection {
  const distance = Math.hypot(x, y);
  if (distance < 0.16) return "front";

  const sector = Math.round(Math.atan2(y, x) / (Math.PI / 4));
  const directions: Record<number, GazeDirection> = {
    [-4]: "left",
    [-3]: "up-left",
    [-2]: "up",
    [-1]: "up-right",
    0: "right",
    1: "down-right",
    2: "down",
    3: "down-left",
    4: "left",
  };

  return directions[sector];
}

const projects = [
  {
    title: "Logistic planning app",
    image: "aca0e.png",
    homeImage: "81734.png",
    tone: "blue",
    tags: ["Strategy", "Design", "Research"],
    page: "logistic" as Page,
  },
  {
    title: "Claims management app",
    image: "64f85.png",
    homeImage: "d8dfc.png",
    tone: "green",
    tags: ["Strategy", "Research"],
    page: "claims" as Page,
  },
  {
    title: "AI-assisted ticketing workflow",
    image: "963a8.png",
    homeImage: "e851e.png",
    tone: "cyan",
    tags: ["Strategy", "Design", "Design system"],
    page: "ticketing" as Page,
  },
  {
    title: "AI-Powered Health Experience",
    image: "38dd1.png",
    homeImage: "161ef.png",
    tone: "lavender",
    tags: ["Strategy", "Design", "Research"],
    page: "health" as Page,
  },
  {
    title: "Sensor management",
    image: "254da.png",
    homeImage: "eedbc.png",
    tone: "peach",
    tags: ["Strategy", "Design", "Research"],
    page: "sensor" as Page,
  },
  {
    title: "Automotive Leasing Portal",
    image: "84785.png",
    homeImage: "d8078.png",
    tone: "yellow",
    tags: ["Design system", "Design", "Research"],
    page: "leasing" as Page,
  },
];

const homeProjects = [projects[0], projects[1], projects[3], projects[2], projects[5], projects[4]];

function Action({
  children,
  className = "",
  onClick,
  label,
}: {
  children: ReactNode;
  className?: string;
  onClick: () => void;
  label?: string;
}) {
  const activate = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <span
      aria-label={label}
      className={`action ${className}`}
      onClick={onClick}
      onKeyDown={activate}
      role="button"
      tabIndex={0}
    >
      {children}
    </span>
  );
}

function Header({ navigate }: { navigate: (page: Page) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  const goTo = (page: Page) => {
    setMenuOpen(false);
    navigate(page);
  };
  const goToContact = () => {
    setMenuOpen(false);
    scrollToContact();
  };

  return (
    <>
      <div className="header-spacer" aria-hidden="true" />
      <div className="site-header">
        <Action className="brand" onClick={() => goTo("home")} label="Go to home page">
          <img src={`${assets}/16171.svg`} alt="" />
          <span>Karolina Nowacka</span>
        </Action>
        <div className="nav-links" aria-label="Main navigation">
          <Action onClick={() => goTo("projects")}>Projects</Action>
          <span className="nav-dot" />
          <Action onClick={() => goTo("about")}>About</Action>
          <span className="nav-dot" />
          <Action onClick={goToContact}>Contact</Action>
        </div>
        <Action className="download" onClick={() => window.print()} label="Download my CV">
          <span>Download my CV</span>
          <img src={`${assets}/68116.svg`} alt="" />
        </Action>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <img src={`${assets}/8efed.svg`} alt="" />
        </button>
        {menuOpen && (
          <div className="mobile-menu" id="mobile-menu">
            <button type="button" onClick={() => goTo("projects")}>
              Projects
            </button>
            <button type="button" onClick={() => goTo("about")}>
              About
            </button>
            <button type="button" onClick={goToContact}>
              Contact
            </button>
            <button type="button" onClick={() => window.print()}>
              Download my CV
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function Footer() {
  return (
    <div className="contact" id="contact">
      <div className="contact-copy">
        <p className="display-two">Let’s work together</p>
        <div>
          <p className="body muted">Drop me an email</p>
          <p className="heading-six">karolina.nowacka.design@gmail.com</p>
        </div>
      </div>
      <div className="socials">
        <span>
          <img src={`${assets}/a666c.svg`} alt="" />
          Behance
        </span>
        <span>
          <img src={`${assets}/7c620.svg`} alt="" />
          Linkedin
        </span>
        <span>
          <img src={`${assets}/18394.svg`} alt="" />
          Dribbble
        </span>
      </div>
    </div>
  );
}

function Eyes() {
  return (
    <div className="eyes" aria-hidden="true">
      <span className="eyeball">
        <span className="pupil">
          <span className="eye-highlight" />
        </span>
      </span>
      <span className="eyeball">
        <span className="pupil">
          <span className="eye-highlight" />
        </span>
      </span>
    </div>
  );
}

function Home({ navigate }: { navigate: (page: Page) => void }) {
  const heroRef = useRef<HTMLElement>(null);
  const [gazeDirection, setGazeDirection] = useState<GazeDirection>("front");
  const gazeDirectionRef = useRef<GazeDirection>("front");
  const eyeTargetRef = useRef({ x: 0, y: 0 });
  const eyePositionRef = useRef({ x: 0, y: 0 });
  const eyeAnimationRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);

  const animateEyes = (time: number) => {
    const hero = heroRef.current;
    if (!hero) {
      eyeAnimationRef.current = null;
      return;
    }

    const elapsed = Math.min(time - (lastFrameRef.current ?? time), 64);
    const smoothing = 1 - Math.exp(-elapsed / 85);
    const current = eyePositionRef.current;
    const target = eyeTargetRef.current;

    current.x += (target.x - current.x) * smoothing;
    current.y += (target.y - current.y) * smoothing;
    hero.style.setProperty("--eye-shift-x", `${current.x.toFixed(3)}px`);
    hero.style.setProperty("--eye-shift-y", `${current.y.toFixed(3)}px`);
    lastFrameRef.current = time;

    if (Math.hypot(target.x - current.x, target.y - current.y) > 0.01) {
      eyeAnimationRef.current = requestAnimationFrame(animateEyes);
    } else {
      current.x = target.x;
      current.y = target.y;
      hero.style.setProperty("--eye-shift-x", `${current.x}px`);
      hero.style.setProperty("--eye-shift-y", `${current.y}px`);
      eyeAnimationRef.current = null;
      lastFrameRef.current = null;
    }
  };

  const startEyeAnimation = () => {
    if (eyeAnimationRef.current === null) {
      lastFrameRef.current = null;
      eyeAnimationRef.current = requestAnimationFrame(animateEyes);
    }
  };

  useEffect(
    () => () => {
      if (eyeAnimationRef.current !== null) cancelAnimationFrame(eyeAnimationRef.current);
    },
    [],
  );

  const positionGaze = (event: PointerEvent<HTMLElement>) => {
    if (
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const hero = heroRef.current;
    if (!hero) return;

    const bounds = hero.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left;
    const pointerY = event.clientY - bounds.top;
    const normalizedX = (pointerX - bounds.width / 2) / (bounds.width / 2);
    const normalizedY = (pointerY - bounds.height / 2) / (bounds.height / 2);
    const direction = getGazeDirection(normalizedX, normalizedY);
    const distance = Math.hypot(normalizedX, normalizedY);
    const strength = Math.min(distance / 0.55, 1);
    const unitX = distance > 0.001 ? normalizedX / distance : 0;
    const unitY = distance > 0.001 ? normalizedY / distance : 0;
    const size = Math.min(gazeStates[direction].size, bounds.width * 0.94);
    const height = size * (720 / 753.77);
    const x = Math.max(size / 2, Math.min(bounds.width - size / 2, pointerX));
    const y = Math.max(height / 2, Math.min(bounds.height - height / 2, pointerY));

    eyeTargetRef.current = {
      x: unitX * 5 * strength,
      y: unitY * 11 * strength,
    };
    startEyeAnimation();
    hero.style.setProperty("--gaze-x", `${x}px`);
    hero.style.setProperty("--gaze-y", `${y}px`);
    hero.style.setProperty("--gaze-size", `${size}px`);

    if (direction !== gazeDirectionRef.current) {
      gazeDirectionRef.current = direction;
      setGazeDirection(direction);
    }
  };

  const resetGaze = () => {
    const hero = heroRef.current;
    if (!hero) return;

    hero.style.removeProperty("--gaze-x");
    hero.style.removeProperty("--gaze-y");
    hero.style.removeProperty("--gaze-size");
    eyeTargetRef.current = { x: 0, y: 0 };
    startEyeAnimation();
    gazeDirectionRef.current = "front";
    setGazeDirection("front");
  };

  const gazeState = gazeStates[gazeDirection];

  return (
    <main className="page home-page">
      <section
        className="hero"
        ref={heroRef}
        onPointerMove={positionGaze}
        onPointerLeave={resetGaze}
      >
        <div
          className="gaze gaze-home"
          aria-hidden="true"
          style={{ "--gaze-color": gazeState.color } as CSSProperties}
        >
          <span className="gaze-lobe" />
          <span className="gaze-lobe" />
        </div>
        <Header navigate={navigate} />
        <div className="hero-copy">
          <p className="display-one hero-title">A focused gaze on complex enterprise UX</p>
          <Eyes />
          <div className="body muted">
            <p>Karolina Nowacka</p>
            <p>Senior Product Designer</p>
          </div>
        </div>
        <Action
          className="small-action"
          onClick={() =>
            document.getElementById("selected-work")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          See my work <img src={`${assets}/4af18.svg`} alt="" />
        </Action>
      </section>
      <section id="selected-work" className="home-projects">
        {homeProjects.map((project) => (
          <Action
            key={project.title}
            className={`home-project tone-${project.tone}`}
            onClick={() => navigate(project.page ?? "projects")}
            label={`View ${project.title}`}
          >
            <img
              src={`${assets}/${project.homeImage}`}
              alt={`${project.title} interface preview`}
            />
            <span className="heading-six">{project.title}</span>
          </Action>
        ))}
      </section>
      <Footer />
    </main>
  );
}

function ProjectCard({
  project,
  navigate,
  caseStudyLink = false,
}: {
  project: (typeof projects)[number];
  navigate: (page: Page) => void;
  caseStudyLink?: boolean;
}) {
  return (
    <Action
      className={`project-card${caseStudyLink ? " case-project-card" : ""}`}
      onClick={() => navigate(project.page ?? "projects")}
      label={`View ${project.title}`}
    >
      <span className={`project-image tone-${project.tone}`}>
        <img src={`${assets}/${project.image}`} alt={`${project.title} interface preview`} />
      </span>
      <span className="project-meta">
        <span className="heading-six">{project.title}</span>
        {caseStudyLink ? (
          <span className="case-card-link">
            Read case study
            <img src={`${assets}/a05c1.svg`} alt="" />
          </span>
        ) : (
          <span className="tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </span>
        )}
      </span>
    </Action>
  );
}

function Projects({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <main className="page standard-page">
      <div className="page-inner">
        <Header navigate={navigate} />
        <section className="projects-section">
          <p className="display-one">Selected projects</p>
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} navigate={navigate} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}

const skills = [
  [
    "Strategy & User research",
    "In depth interviews, Workshops, Surveys, Usability testing, User behaviours tracking. User flow, User journeys, Information architecture, User personas",
  ],
  ["UI Designs", "Mockups, Interactive prototypes, Design system libraries, Webflow development"],
  [
    "Good practices",
    "User-centric design, WCAG guidelines, Usability heuristics, Agile, Team work, Frontend frameworks",
  ],
  [
    "Software",
    "Figma, Adobe Photoshop, Adobe Illustrator, Adobe After Effects, Hotjar, Dovetail, Webflow, Jira, Confulence, Miro, Mural, Mixpanel (basics), Google Analytics (basics),",
  ],
];

const experience = [
  ["Senior Product Designer - GlobalLogic", "2026 - present"],
  ["Product & Services Designer - Capgemini", "2023 - 2026"],
  ["User Experience Designer - Takto Finanse", "2022 - 2023"],
  ["User Experience Designer - UX House", "2021 - 2022"],
  ["Freelance Graphic Designer", "2021"],
];

function DetailList({ items }: { items: string[][] }) {
  return (
    <div className="detail-list">
      {items.map(([title, copy]) => (
        <div className="detail-item" key={title}>
          <p className="heading-six">{title}</p>
          <p className="body">{copy}</p>
        </div>
      ))}
    </div>
  );
}

function About({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <main className="page standard-page about-page">
      <div className="page-inner">
        <Header navigate={navigate} />
        <div className="about-content">
          <section className="about-hero">
            <img className="portrait" src={`${assets}/6ff96.png`} alt="Karolina Nowacka" />
            <div className="about-intro">
              <p className="display-one">About me</p>
              <div className="body">
                <p>
                  Product Designer specializing in complex, data-driven Enterprise products and
                  scalable platforms. I bridge design with business strategy, translating intricate
                  workflows and business logic into intuitive, high-impact user experiences.
                </p>
                <p>
                  Collaborating closely with cross-functional teams in Agile environments, I focus
                  on system scalability, accessibility (WCAG), and clear product documentation to
                  accelerate delivery and drive business outcomes.
                </p>
              </div>
            </div>
          </section>
          <div className="about-details">
            <img className="gaze gaze-about" src={`${assets}/eaaac.svg`} alt="" />
            <section className="detail-section">
              <p className="heading-three">Skills</p>
              <DetailList items={skills} />
            </section>
            <section className="detail-section">
              <p className="heading-three">Expierence</p>
              <div className="detail-list">
                {experience.map(([title, copy]) => (
                  <div className="detail-item" key={title}>
                    <p className="heading-six">{title}</p>
                    <p className="body">{copy}</p>
                  </div>
                ))}
                <div className="detail-item">
                  <p className="heading-six">Education</p>
                  <p className="body-large">
                    Product design, Visual communication design
                    <br />
                    Academy of Fine Arts &amp; Design in Wroclaw
                  </p>
                  <p className="body">2017 - 2022</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

const journey = [
  [
    "01 Connect devices",
    "The user connects their health devices, such as a smartwatch or smart ring, to the application.",
  ],
  [
    "02 Provide basic information",
    "The user provides basic information such as age, sex and lifestyle behaviours, including smoking or alcohol consumption.",
  ],
  [
    "03 Analyse health data",
    "The system processes the available health information collected from connected devices and other sources.",
  ],
  [
    "04 Generate a health overview",
    "The application presents a simplified overview of the user's key health indicators.",
  ],
  [
    "05 AI highlights potential areas of attention",
    "AI analyses the available information and highlights patterns or areas that may require further investigation.",
  ],
  [
    "06 Doctor explores the results",
    "Doctors can uncover patient health insights faster by focusing on highlighted areas first, with a well-prepared summary consolidated in one place.",
  ],
];

const aiSupport = [
  [
    "Potential risk & pattern detection",
    "AI analyses the available data and highlights potential areas of concern or patterns that may deserve further attention. Instead of presenting the user with large amounts of raw data, the experience focuses attention on the information that may be most relevant.",
  ],
  [
    "Voice interaction",
    "The user has access to a voice-based AI assistant throughout the experience. They can ask questions about their health data and explore specific areas in a more natural way.",
  ],
  [
    "Contextual questions",
    "At different stages of the experience, the interface suggests questions the user could ask the AI. This helps users understand how they can interact with the assistant without having to formulate every question themselves.",
  ],
  [
    "AI recommendations",
    "The AI can also surface potential recommendations based on the available data. These recommendations are intended as topics for discussion with a doctor, rather than medical instructions or diagnoses.",
  ],
];

const visualStyle = [
  [
    "Visual direction",
    "Because we were designing for a transparent OLED display, we wanted the interface to feel immersive and futuristic while still maintaining a professional healthcare character. We decided to explore a subtle sci-fi-inspired visual language that could communicate advanced technology without making the product feel overly complex.",
  ],
  [
    "Human visualisation",
    "One of the challenges was creating a visual representation of the patient. We wanted to use a human figure as a central visual element, but a realistic representation could introduce unnecessary assumptions about age, gender, body shape and physical appearance. We therefore explored a more abstract and universal human representation.",
  ],
  [
    "Colour & depth",
    "We used dark blue tones, shadows and layered surfaces to create depth and reinforce the characteristics of the transparent OLED display. The interface relied on bright typography against darker surfaces to maintain readability and create a strong visual hierarchy.",
  ],
  [
    "Storytelling",
    "The prototype was not only an exploration of a healthcare product. It was also intended to demonstrate the company's AI capabilities to potential customers. Because of this, storytelling became an important part of the design.",
  ],
];

function CaseText({ title, items, lead }: { title: string; items: string[][]; lead?: string }) {
  return (
    <section className="case-text">
      <p className="heading-four">{title}</p>
      {lead && <p className="body-large">{lead}</p>}
      {items.map(([heading, copy]) => (
        <div className="case-copy" key={heading}>
          <p className="body-large">{heading}</p>
          <p className="body muted">{copy}</p>
        </div>
      ))}
    </section>
  );
}

function CaseMedia({ image, caption }: { image: string; caption: string }) {
  return (
    <figure className="case-media">
      <img src={`${assets}/${image}`} alt={caption} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function HealthCase({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <main className="page case-page">
      <div className="case-header">
        <Header navigate={navigate} />
        <div className="case-title-row">
          <p className="heading-three case-title">AI-Powered Health Experience</p>
        </div>
      </div>
      <CaseMedia image="38dd1.png" caption="App design for OLED screen" />
      <div className="case-body">
        <section className="overview">
          <p className="heading-four">Project overview</p>
          <div>
            <p className="body-large">Industry</p>
            <p className="body muted">Healthcare</p>
          </div>
          <div>
            <p className="body-large">Context</p>
            <p className="body muted">
              The prototype was created as a business and innovation concept to demonstrate how the
              company’s AI capabilities could be applied to the healthcare market and presented to
              potential customers during a trade event.
            </p>
          </div>
          <div>
            <p className="body-large">My responsibilities</p>
            <p className="body muted">
              As a Product Designer I was responsible for shaping the product experience from the
              initial idea to the final presentation.
            </p>
            <ul className="body muted">
              <li>Defined the core user flow</li>
              <li>Developed the product concept and communicated its customer value</li>
              <li>Defined the UI language and visual direction</li>
              <li>
                Collaborated with stakeholders, developers, data scientists and graphic designers
              </li>
              <li>Designed the AI features and interactions</li>
              <li>Developed the storytelling for the final presentation</li>
            </ul>
          </div>
          <div>
            <p className="body-large">Team</p>
            <p className="body muted">
              Product Designers · Graphic designers · Frontend Developers · Backend Developers ·
              Data Scientists · Project Manager
            </p>
          </div>
        </section>

        <section className="case-text">
          <p className="heading-four">The idea</p>
          <p className="body muted">
            We wanted to explore how data from connected health devices could be combined into one
            experience and used to create a more complete overview of a patient’s health. The
            concept allows users to connect devices such as smart rings and smartwatches and provide
            basic information about themselves, including age, gender and lifestyle behaviours. The
            system then analyses the available data and creates a general health overview.
          </p>
          <p className="body muted">
            During a doctor’s appointment, the doctor can explore this information and use it as an
            additional source of context when discussing the patient’s health and deciding whether
            further investigation may be needed.
          </p>
        </section>
        <CaseMedia image="f5cdf.png" caption="Trade show presentation" />

        <section className="case-text">
          <p className="heading-four">User journey</p>
          <div className="journey">
            {journey.map(([title, copy], index) => (
              <div key={title}>
                <div className="journey-step">
                  <p className="body-large">{title}</p>
                  <p className="body muted">{copy}</p>
                </div>
                {index < journey.length - 1 && <span className="journey-arrow">↓</span>}
              </div>
            ))}
          </div>
        </section>
        <CaseMedia image="26a41.png" caption="Main views from user flow" />
        <CaseText
          title="AI support"
          lead="AI was designed as an assistant for understanding health data, rather than as an autonomous diagnostic system."
          items={aiSupport}
        />
        <CaseMedia image="458fe.png" caption="AI support features" />
        <CaseText title="Visual style" items={visualStyle} />
        <CaseMedia image="a7d98.png" caption="Trade show presentation" />
        <CaseText
          title="The challenge"
          items={[
            [
              "Experimental technology",
              "Designing an application for a large transparent OLED display was a new experience for our team. We had to explore how to work with a much larger screen, transparency, depth and visibility while keeping the information understandable.",
            ],
            [
              "Limited time",
              "The project was developed under a very tight deadline because we needed to deliver the prototype for a trade-show presentation. We had to quickly align on the concept, define the most important features and communicate the idea effectively.",
            ],
            [
              "New multidisciplinary team",
              "The work brought together product designers, developers, data scientists and graphic designers around a new technology and a shared product story.",
            ],
          ]}
        />
      </div>

      <section className="other-projects">
        <p className="heading-three">Other projects</p>
        <div className="projects-grid">
          <ProjectCard project={projects[0]} navigate={navigate} caseStudyLink />
          <ProjectCard project={projects[2]} navigate={navigate} caseStudyLink />
        </div>
      </section>
      <Footer />
    </main>
  );
}

type CaseStudy = {
  title: string;
  projectIndex: number;
  heroImage?: string;
  caption: string;
  overview: Array<[string, string]>;
  sections: Array<{
    title: string;
    lead?: string;
    items: Array<[string, string]>;
  }>;
  gallery: Array<[string, string]>;
  otherProjects: [number, number];
};

const caseStudies: Record<"logistic" | "claims" | "ticketing" | "sensor" | "leasing", CaseStudy> = {
  logistic: {
    title: "Logistic planning app",
    projectIndex: 0,
    caption: "Logistics planning dashboard",
    overview: [
      [
        "About the app",
        "A logistics and sales planning application designed from scratch for internal company users. It helps logistics and sales specialists plan and forecast the movement of goods between stores and warehouses internationally.",
      ],
      [
        "My responsibilities",
        "Product & Services Designer responsible for user and business needs, collaborating with product owners, software engineers, data specialists and UX designers.",
      ],
      [
        "Outcome",
        "The app standardizes processes across countries and replaces multiple Excel files with one shared planning environment. Historical data supports forecasting, improving speed, efficiency and accuracy.",
      ],
      [
        "Team",
        "Product Designers · Frontend Developers · Backend Developers · Data Scientists · Project Manager",
      ],
    ],
    sections: [
      {
        title: "My Approach",
        lead: "We followed a user-centered, iterative design process, working closely with clients, users and developers.",
        items: [
          [
            "Research",
            "I conducted 2 workshops and 30 user interviews to identify pain points, then validated designs through 20 usability testing sessions.",
          ],
          [
            "Design",
            "I mapped core workflows and edge cases in Miro, then iterated from initial sketches to high-fidelity Figma prototypes.",
          ],
        ],
      },
      {
        title: "Business and Users",
        lead: "Logistics planners work under time pressure and with incomplete data. Errors can prevent customers from buying goods and reduce business efficiency.",
        items: [
          [
            "Personas",
            "The three main groups are sales planners, fulfilment planners and capacity planners. Together they manage pricing, product movement, warehouse capacity and delivery.",
          ],
          [
            "Pain points",
            "All three groups relied on many systems and Excel files, creating manual work, inconsistent formats and no single reliable source of truth.",
          ],
        ],
      },
      {
        title: "Solution",
        lead: "A common planning flow integrates Sales, Fulfillment and Capacity planning in one application.",
        items: [
          [
            "One source of truth",
            "Planning data and forecasting are consolidated, with real-time visibility for every team.",
          ],
          [
            "Features design",
            "Flexible dashboards, filters, editable charts and tables support planning, comparison and progress tracking.",
          ],
          [
            "Collaboration",
            "Version tracking, role-based access, summaries, changelogs and notifications keep teams aligned.",
          ],
        ],
      },
      {
        title: "Successes",
        items: [
          [
            "Unified planning",
            "The final product connected sales, fulfillment and capacity data in one system and unified the global planning process.",
          ],
          [
            "Measurable improvement",
            "More than 20 Excel files were replaced, manual data-copying errors were removed and planner satisfaction increased.",
          ],
        ],
      },
    ],
    gallery: [
      ["7f58c.png", "Sales planner persona"],
      ["8c13c.png", "Fulfilment planner persona"],
      ["65e05.png", "Capacity planner persona"],
      ["173ae.png", "Simplified process journey"],
      ["f6c85.png", "Simplified view of dashboard creation"],
      ["3b217.png", "Different data visualisation possibilities"],
      ["c7c8e.png", "Planning view using chart and input fields"],
      ["81215.png", "Planning view using inline table editing"],
      ["7304a.png", "View of different user plans"],
    ],
    otherProjects: [3, 1],
  },
  claims: {
    title: "Claims management app",
    projectIndex: 1,
    caption: "App view after redesign",
    overview: [
      [
        "About the App",
        "The app enables employees to submit monthly claims which, once approved, contribute to their salary increase. It is used by most employees in the company.",
      ],
      [
        "Challenge",
        "The existing app had become inefficient and crashed frequently, making a new application and a redesigned solution necessary.",
      ],
      [
        "My responsibilities",
        "Product & Services Designer supporting the design and development team and introducing good research practices.",
      ],
      [
        "Outcome",
        "Clearer flows and improved interactions help employees work faster and with less frustration.",
      ],
    ],
    sections: [
      {
        title: "UX process",
        lead: "The process combined discovery, design and delivery.",
        items: [
          [
            "Research activities",
            "The research plan included a heuristic audit, 15 interviews, 10 user tests and a SUS survey across the key user groups.",
          ],
          [
            "Business aspect",
            "The redesign focused on payroll accuracy, employee satisfaction, operational efficiency and trust in internal systems.",
          ],
        ],
      },
      {
        title: "Key flows",
        items: [
          [
            "Main business flow",
            "The end-to-end flow covers admins, new joiners, regular employees and approvers, making each role and handoff visible.",
          ],
          [
            "Discovered pain points",
            "Testing exposed unclear naming, low contrast, ineffective navigation, poor performance, missing guidance and a lack of system feedback.",
          ],
        ],
      },
      {
        title: "Design improvements",
        lead: "A new design system and more intuitive flows improved hierarchy, visual clarity, naming and system feedback.",
        items: [
          [
            "Portal analytics",
            "Errors and click counts were measured to identify bottlenecks and reduce the number of steps for submission and approval.",
          ],
          [
            "Next Steps",
            "After rollout, another research round will measure usability and user satisfaction after implementation.",
          ],
        ],
      },
    ],
    gallery: [
      ["a9cad.png", "Regular employee persona"],
      ["39c72.png", "Approver persona"],
      ["10146.png", "Main business flow"],
      ["c5ee3.png", "Regular employee flow"],
      ["9d36d.png", "Design changes for claim list view"],
      ["69b65.png", "Design changes for claim creation"],
    ],
    otherProjects: [0, 4],
  },
  ticketing: {
    title: "AI-assisted ticketing workflow",
    projectIndex: 2,
    caption: "AI-assisted ticketing system",
    overview: [
      ["About the App", "Internal enterprise ticketing system."],
      [
        "Context",
        "The team explored how AI could reduce repetitive work for ticket solvers and help them process requests and find relevant solutions faster.",
      ],
      [
        "My responsibilities",
        "I interviewed ticket solvers, mapped the existing process, identified AI opportunities with the team and designed concepts for the supported workflow.",
      ],
      [
        "Team",
        "Product Designers · Frontend Developers · Backend Developers · Data Scientists · Project Manager",
      ],
    ],
    sections: [
      {
        title: "Flow redesign",
        items: [
          [
            "Understanding the current workflow",
            "Ticket solvers manually copied employee emails into tickets, investigated each issue and searched internal knowledge articles for a solution.",
          ],
          [
            "Planning new flow goals",
            "The new flow extracts and structures request information, surfaces relevant internal knowledge and keeps the final decision with the human.",
          ],
        ],
      },
      {
        title: "Where AI helps",
        items: [
          [
            "01 Preparing the ticket",
            "Relevant information is extracted from the email and used to create and pre-fill the ticket automatically.",
          ],
          [
            "02 Summarizing the issue",
            "AI organizes the request into a structured summary so the reported problem is easier to understand.",
          ],
          [
            "03 Finding a solution",
            "Suggested solutions are grounded in the internal knowledge base and can be reviewed before selection.",
          ],
          [
            "AI assistant",
            "Ticket solvers can ask questions and retrieve relevant internal knowledge without manually searching the knowledge base.",
          ],
        ],
      },
      {
        title: "Key design principles",
        items: [
          [
            "Human in control",
            "AI supports the ticket solver but does not make the final decision.",
          ],
          ["Easy to verify", "Generated information is easy to review and correct."],
          ["Transparent recommendations", "Users can understand where recommendations come from."],
          [
            "Use existing knowledge",
            "Recommendations are based on the company’s internal knowledge articles.",
          ],
        ],
      },
    ],
    gallery: [
      ["946a9.png", "Ticket solver persona"],
      ["963a8.png", "Ticket list view"],
      ["c5f1b.png", "Details of selected ticket"],
      ["bd7ae.png", "Solution selection for the ticket"],
      ["162ff.png", "Difference between AI and human decision"],
      ["9bd24.png", "AI assistant"],
    ],
    otherProjects: [0, 1],
  },
  sensor: {
    title: "Sensor management app",
    projectIndex: 4,
    heroImage: "43561.png",
    caption: "App view after redesign",
    overview: [
      [
        "About the App",
        "A native Windows application for laboratory specialists managing measurement sensors across pharmaceutical and production environments.",
      ],
      [
        "Challenge",
        "Translate complex scientific and technical data into clear interfaces for monitoring sensor health and making informed decisions.",
      ],
      [
        "My responsibilities",
        "Senior Product Designer responsible for features, high-fidelity mockups, design-system development, workshops, documentation and frontend alignment.",
      ],
      [
        "Team",
        "UX/UI Designer · Frontend Developers · Backend Developers · QA Engineers · Business Analyst · Project Manager",
      ],
    ],
    sections: [
      {
        title: "Key challenges",
        items: [
          [
            "Complex domain knowledge",
            "The work required understanding specialist terminology, laboratory measurements, sensor lifecycles and diagnostic data.",
          ],
          [
            "Inconsistent design system",
            "Disconnected components and incomplete documentation had to be aligned with Angular Material and Kendo UI implementation constraints.",
          ],
        ],
      },
      {
        title: "Improving the design system",
        lead: "The first priority was creating a reliable foundation for future design and development.",
        items: [
          [
            "Structure",
            "Figma files, components and design tokens were reorganised, standardized and documented.",
          ],
          [
            "Implementation alignment",
            "Close collaboration with frontend developers reduced inconsistencies and unnecessary development work.",
          ],
        ],
      },
      {
        title: "Designing the Sensor Diagnostics module",
        items: [
          [
            "Sensor health status",
            "A high-level overview helps specialists identify potential issues without analysing every parameter.",
          ],
          [
            "Sensor lifetime",
            "Lifecycle views show current lifetime, estimated remaining days and replacement planning.",
          ],
          [
            "Calibration statistics",
            "Historical data and trends surface possible health-limit violations.",
          ],
        ],
      },
      {
        title: "Outcomes and impact",
        items: [
          [
            "Reusable foundation",
            "The work established a structured design system, aligned components with development and improved documentation.",
          ],
          [
            "Clear specialist interfaces",
            "Complex scientific data was translated into clear, reusable interface patterns.",
          ],
        ],
      },
    ],
    gallery: [
      ["031b5.png", "Table with sensors overview"],
      ["8396d.png", "Sensor details"],
      ["b0e6b.png", "Sensor load"],
      ["47666.png", "Calibration statistics"],
    ],
    otherProjects: [0, 3],
  },
  leasing: {
    title: "Redefining an Automotive Leasing Portal",
    projectIndex: 5,
    caption: "Automotive leasing customer portal",
    overview: [
      [
        "About the App",
        "Financial services portal for customers who own or lease a vehicle, supporting payments, contracts, documents and communication.",
      ],
      [
        "Goal",
        "Redefine the portal’s value and purpose and help the product team define a new vision statement.",
      ],
      [
        "My responsibilities",
        "Product Designer working across stakeholder interviews, data analysis, heuristic evaluation, journey analysis, workshop facilitation, UX strategy and UI concepts.",
      ],
    ],
    sections: [
      {
        title: "Project workflow",
        lead: "The project moved from client interviews and data analysis through heuristic evaluation, insight synthesis, a vision workshop and solution visualisation.",
        items: [
          [
            "Key insights",
            "Customers did not actively choose the portal, had little reason to return, and often contacted support because statuses and next steps were unclear.",
          ],
          [
            "Opportunity",
            "The end of a contract offered a key moment to provide proactive guidance and support retention.",
          ],
        ],
      },
      {
        title: "Workshops",
        items: [
          [
            "Methodology",
            "How-might-we statements, a shared vision statement and a future timeline helped stakeholders align around product direction.",
          ],
          [
            "Outcome",
            "The new direction emphasized a clear starting point, transparent processes, guided journeys, self-service and proactive communication.",
          ],
        ],
      },
      {
        title: "Proposed experience",
        items: [
          [
            "Homepage",
            "Customers can immediately understand contracts, payments, account benefits and next steps.",
          ],
          [
            "Documents",
            "Filters, proposed AI-powered search and in-page previews make files easier to find.",
          ],
          [
            "Support & communication",
            "A centralized history and notification hub helps customers resolve issues faster.",
          ],
        ],
      },
      {
        title: "Reflection and challenges",
        items: [
          [
            "Digital ecosystem",
            "Clarifying the portal’s role within a larger set of apps and touchpoints was as important as improving its UI.",
          ],
          [
            "Multiple markets",
            "One experience had to accommodate different legal requirements across countries.",
          ],
          [
            "No design system access",
            "The mockups focused on communicating UX structure and interactions rather than production-ready visual design.",
          ],
        ],
      },
    ],
    gallery: [
      ["8151d.png", "Overview and contact details concepts"],
      ["7b856.png", "Documents and personal data concepts"],
      ["54822.png", "Payments and support concepts"],
    ],
    otherProjects: [1, 3],
  },
};

function ProjectCase({ study, navigate }: { study: CaseStudy; navigate: (page: Page) => void }) {
  const project = projects[study.projectIndex];

  return (
    <main className="page case-page">
      <div className="case-header">
        <Header navigate={navigate} />
        <div className="case-title-row">
          <p className="heading-three case-title">{study.title}</p>
        </div>
      </div>
      <CaseMedia image={study.heroImage ?? project.image} caption={study.caption} />
      <div className="case-body">
        <section className="overview">
          <p className="heading-four">Project overview</p>
          {study.overview.map(([heading, copy]) => (
            <div key={heading}>
              <p className="body-large">{heading}</p>
              <p className="body muted">{copy}</p>
            </div>
          ))}
          <p className="case-note">
            This project is covered by a non-disclosure agreement (NDA); names, data and
            descriptions in visualizations have been modified.
          </p>
        </section>

        {study.sections.map((section, index) => {
          const image = study.gallery[index];
          return (
            <div className="case-group" key={section.title}>
              <CaseText title={section.title} lead={section.lead} items={section.items} />
              {image && <CaseMedia image={image[0]} caption={image[1]} />}
            </div>
          );
        })}

        {study.gallery.slice(study.sections.length).map(([image, caption]) => (
          <CaseMedia key={image} image={image} caption={caption} />
        ))}
      </div>
      <section className="other-projects">
        <p className="heading-three">Other projects</p>
        <div className="projects-grid">
          {study.otherProjects.map((index) => (
            <ProjectCard
              key={projects[index].title}
              project={projects[index]}
              navigate={navigate}
              caseStudyLink
            />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const navigate = (nextPage: Page) => {
    if (nextPage === "home" && page === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setPage(nextPage);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  if (page === "projects") return <Projects navigate={navigate} />;
  if (page === "about") return <About navigate={navigate} />;
  if (page === "health") return <HealthCase navigate={navigate} />;
  if (
    page === "logistic" ||
    page === "claims" ||
    page === "ticketing" ||
    page === "sensor" ||
    page === "leasing"
  ) {
    return <ProjectCase study={caseStudies[page]} navigate={navigate} />;
  }
  return <Home navigate={navigate} />;
}
