import { useEffect, useState, type KeyboardEvent, type ReactNode } from "react";

type Page = "home" | "projects" | "about" | "health";

const assets = "/assets";

const projects = [
  {
    title: "Logistic planning app",
    image: "aca0e.png",
    homeImage: "4092f.png",
    tone: "blue",
    tags: ["Strategy", "Design", "Research"],
  },
  {
    title: "Claims management app",
    image: "64f85.png",
    homeImage: "d8dfc.png",
    tone: "green",
    tags: ["Strategy", "Research"],
  },
  {
    title: "AI-assisted ticketing workflow",
    image: "963a8.png",
    homeImage: "e851e.png",
    tone: "cyan",
    tags: ["Strategy", "Design", "Design system"],
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
  },
  {
    title: "Automotive Leasing Portal",
    image: "84785.png",
    homeImage: "d8078.png",
    tone: "yellow",
    tags: ["Design system", "Design", "Research"],
  },
];

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
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="site-header">
      <Action className="brand" onClick={() => navigate("home")} label="Go to home page">
        <img src={`${assets}/f24cc.svg`} alt="" />
        <span>Karolina Nowacka</span>
      </Action>
      <div className="nav-links" aria-label="Main navigation">
        <Action onClick={() => navigate("projects")}>Projects</Action>
        <span className="nav-dot" />
        <Action onClick={() => navigate("about")}>About</Action>
        <span className="nav-dot" />
        <Action onClick={scrollToContact}>Contact</Action>
      </div>
      <Action className="download" onClick={() => window.print()} label="Download my CV">
        <span>Download my CV</span>
        <img src={`${assets}/68116.svg`} alt="" />
      </Action>
    </div>
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
      <img className="eyes-base" src={`${assets}/1e29b.svg`} alt="" />
      <img className="eye-dot eye-dot-left" src={`${assets}/5dd24.svg`} alt="" />
      <img className="eye-dot eye-dot-right" src={`${assets}/647b8.svg`} alt="" />
    </div>
  );
}

function Home({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <main className="page home-page">
      <section className="hero">
        <img className="gaze gaze-home" src={`${assets}/12e24.svg`} alt="" />
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
        {projects.map((project) => (
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
}: {
  project: (typeof projects)[number];
  navigate: (page: Page) => void;
}) {
  return (
    <Action
      className="project-card"
      onClick={() => navigate(project.page ?? "projects")}
      label={`View ${project.title}`}
    >
      <span className={`project-image tone-${project.tone}`}>
        <img src={`${assets}/${project.image}`} alt={`${project.title} interface preview`} />
      </span>
      <span className="project-meta">
        <span className="heading-six">{project.title}</span>
        <span className="tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
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
        <p className="heading-three case-title">AI-Powered Health Experience</p>
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
          <ProjectCard project={projects[0]} navigate={navigate} />
          <ProjectCard project={projects[2]} navigate={navigate} />
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
  return <Home navigate={navigate} />;
}
