"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Atom,
  Brain,
  BriefcaseBusiness,
  CircuitBoard,
  Cpu,
  Database,
  Eye,
  GraduationCap,
  Linkedin,
  Mail,
  Microscope,
  Phone,
  Radar,
  ScanSearch,
  Sparkles,
  TerminalSquare,
  Waves
} from "lucide-react";

const navItems = [
  { label: "About", id: "about" },
  { label: "Education", id: "education" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" }
];

const education = [
  {
    title: "Undergraduate (IT & MI)",
    institute: "Cluster Innovation Centre, University of Delhi",
    year: "Expected 2026",
    score: "CGPA: 8/10",
    marker: "IT + MI"
  },
  {
    title: "Intermediate (HSC)",
    institute: "Akash Public School",
    year: "2022",
    score: "Percentage: 77.4/100",
    marker: "HSC"
  },
  {
    title: "Matriculation (SSC)",
    institute: "Oxford Senior Secondary School",
    year: "2020",
    score: "Percentage: 93/100",
    marker: "SSC"
  }
];

const projects = [
  {
    title: "IMAGE STEGANOGRAPHY",
    domain: "Cryptography + Imaging",
    Icon: ScanSearch,
    description:
      "Developed a hybrid decoding method for image steganography using LSB and SSIS algorithms, gaining expertise in image processing, cryptography, and steganalysis metrics like PSNR and SSIM. Successfully extracted hidden messages from encoded images."
  },
  {
    title: "MULTILINGUAL OPTICAL CHARACTER RECOGNITION",
    domain: "OCR + Language Systems",
    Icon: Eye,
    description:
      "Developed and hosted (locally) a streamlit app that does OCR in multiple languages (English, Hindi, Tamil, etc.) and gives formatted text as output. It can also find and highlight any word of interest in the original input file."
  },
  {
    title: "GREEN SYNTHESIS OF ZINC OXIDE NANOPARTICLES",
    domain: "Nanoscience + Spectroscopy",
    Icon: Atom,
    description:
      "Learned green synthesis, characterization and interaction studies of ZnO NP’s and CT-DNA using physiochemical techniques. Used FTIR (Fourier Transform Infrared Spectroscopy) and UV-Spectroscopy characterization techniques."
  }
];

const experiences = [
  {
    role: "Software Engineer",
    org: "Rimo LLC. · Part-time",
    duration: "Dec 2025 · 1 mo",
    location: "Shibuya-ku, Tokyo, Japan",
    focus: "Engineering",
    skills: "Engineering, OpenAI API and +3 skills",
    details:
      "Software Engineer Internship at Rimo LLC"
  },
  {
    role: "Research And Development Intern",
    org: "Indian Institute of Science (IISc) · Full-time",
    duration: "Jun 2025 - Aug 2025 · 3 mos",
    location: "Bengaluru, Karnataka, India · On-site",
    focus: "Automation of OCT system",
    skills: "Google Gemini, Data Presentation and +11 skills",
    details:
      "Software Development and Research Summer Intern – Automation of OCT system (FLARe Lab, IISc Bangalore): I developed Python-, C++-, and MATLAB-based scripts to automate the Cobra 1600 OCT spectrometer for live scans and B-scan acquisition. I designed a GUI to visualize spectrograms, axial scans, and intensity profiles, and integrated Camera Link hardware–software communication for smooth control. I also coordinated with vendors, automated data pipelines with real-time validation, and applied optics and spectroscopy principles to improve imaging accuracy. [Jun–Aug, 2025]"
  },
  {
    role: "AI engineer intern",
    org: "MythyaVerse · Internship",
    duration: "Mar 2025 - Apr 2025 · 2 mos",
    location: "Delhi, India · Remote",
    focus: "LLM content systems",
    skills: "Large Language Models (LLM), Python (Programming Language) and +7 skills",
    details:
      "I worked as an AI application engineer in \"Mythyaverse\". Supported in edtech consultancy for \"Extramarks\". I used python based LLM frameworks (Gemini reasoning models and Open AI o1-mini) to procedurally generate age appropriate and fun study materials for students of CBSE and ICSE board, ranging from class 6 to 12 in both science and non science subjects for various topics, questions and common doubts. Also used/tested high compute reasoning models to design and generate creative presentations for teachers as per their requirements and requests for various in-classroom and out-classroom study topics."
  },
  {
    role: "Cognitive Neuroscience and Machine Learning Internship",
    org: "Indian Institute of Technology, Roorkee · Internship",
    duration: "Dec 2024 - Feb 2025 · 3 mos",
    location: "New Delhi, Delhi, India · Remote",
    focus: "EEG attention classification",
    credential: "SwarnimIITCertificate.pdf",
    skills: "Electrophysiology, Coding Experience and +14 skills",
    details:
      "Worked as a research intern remotely accessing their system in Parimal lab , IIT Roorkee . Designed and Implemented a ML model to analyse EEG signals to classify attention states during meditation. The process involved processing large EEG dataset through artifact removal, extracting relevant features and applying predictive modelling techniques."
  },
  {
    role: "Summer Intern : Neuroscience and Neurophysiology (AINN, Amity University, Noida)",
    org: "Amity University, Noida · Internship",
    duration: "Jun 2024 - Aug 2024 · 3 mos",
    location: "Noida, Uttar Pradesh, India · On-site",
    focus: "Cortical signaling",
    credential: "Internship_Certificate.pdf",
    skills: "Electrophysiology, Coding Experience and +10 skills",
    details:
      "Completed a SERB-DST funded internship at AINN, focusing on \"Investigating physiological alterations in cortical signaling during retinal degeneration: Implications for vision restoration.\" Utilized EEG and advanced signal processing techniques to analyze cortical signaling, contributing to cutting-edge research in retinal degeneration and vision restoration. This experience enhanced my skills in neuroscience and signal processing."
  }
];

const skillGroups = [
  {
    title: "Programming Languages",
    Icon: TerminalSquare,
    skills: ["C/C++", "Python", "MATLAB", "Java", "R (Statistical Computing)", "MySQL"]
  },
  {
    title: "Core Skills",
    Icon: Brain,
    skills: [
      "Machine Learning / Deep Learning",
      "Software Automation",
      "Neuroimaging (EEG, fMRI)",
      "Generative AI (LLM frameworks and inference)",
      "Prompt Engineering and NLP",
      "Multilingual OCR Implementation"
    ]
  },
  {
    title: "Others",
    Icon: Microscope,
    skills: [
      "Neuroscience (Cognitive)",
      "Optical Coherence Tomography",
      "Data Processing and Analysis",
      "Software-Hardware Integration"
    ]
  },
  {
    title: "Soft Skills",
    Icon: Sparkles,
    skills: [
      "Research Skills",
      "Presentation",
      "Communication",
      "Leadership",
      "Teamwork",
      "Reverse Engineering",
      "Workflow Optimization"
    ]
  },
  {
    title: "Tools/Platforms",
    Icon: Database,
    skills: ["MATLAB", "Cursor", "Tera Term", "GitHub", "Windows / Linux"]
  }
];

const researchModes = [
  { label: "Neuroimaging", value: "EEG / fMRI", Icon: Waves },
  { label: "Generative AI", value: "LLM frameworks", Icon: Cpu },
  { label: "Optical Systems", value: "OCT + Spectroscopy", Icon: Radar }
];

const aboutPillars = [
  {
    title: "Frontier science",
    Icon: Microscope,
    description:
      "Drawn to research problems where scientific curiosity, careful experimentation, and engineering can open new ways to understand complex systems."
  },
  {
    title: "Scientific computing",
    Icon: Cpu,
    description:
      "Interested in building software that supports discovery: data pipelines, automation tools, signal processing workflows, and research-grade interfaces."
  },
  {
    title: "LLMs for research",
    Icon: Brain,
    description:
      "Focused on using LLMs and generative AI as practical systems for reasoning, learning, analysis, and accelerating scientific workflows."
  },
  {
    title: "Real-world impact",
    Icon: Radar,
    description:
      "Motivated by work that connects mathematical analysis and scientific thought with useful solutions for meaningful real-world problems."
  }
];

const aboutTags = [
  "Research-driven engineering",
  "Mathematical analysis",
  "Scientific thought process",
  "Software automation",
  "LLM systems",
  "Neuroimaging",
  "Optical systems",
  "Real-world impact"
];

export function PortfolioExperience() {
  const shellRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProject, setSelectedProject] = useState(0);

  useEffect(() => {
    const shell = shellRef.current;

    const updatePointer = (event: PointerEvent) => {
      shell?.style.setProperty("--pointer-x", `${event.clientX}px`);
      shell?.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      shell?.style.setProperty("--scroll-progress", `${progress}`);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  const selected = projects[selectedProject];
  const SelectedIcon = selected.Icon;

  return (
    <main ref={shellRef} className="portfolio-shell min-h-screen overflow-x-hidden text-porcelain">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="pointer-spotlight" aria-hidden="true" />

      <nav className="fixed left-0 right-0 top-4 z-50 px-4">
        <div className="mx-auto flex max-w-7xl items-center gap-4 rounded-full border border-white/10 bg-cinder/70 px-4 py-3 shadow-[0_16px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl">
          <a href="#hero" className="group flex min-w-fit items-center gap-3" aria-label="Swarnim Sharma home">
            <span className="grid size-9 place-items-center rounded-full border border-mint/40 bg-mint/10 text-xs font-bold text-mint">
              SS
            </span>
            <span className="hidden text-sm font-semibold text-white sm:block">Swarnim Sharma</span>
          </a>

          <div className="no-scrollbar flex flex-1 items-center justify-end gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? "is-active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="hero" className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-5 pb-20 pt-28 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div className="hero-copy">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-copper/35 bg-copper/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-copper">
            <CircuitBoard size={15} />
            B.Tech Information Technology & Mathematical Innovation
          </p>

          <h1 className="max-w-4xl text-balance text-5xl font-black uppercase leading-[0.88] text-white sm:text-7xl lg:text-8xl xl:text-9xl">
            Swarnim Sharma
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-porcelain/72 md:text-xl">
            Fourth Year at Cluster Innovation Centre, University of Delhi
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="primary-action">
              View research work
              <ArrowUpRight size={18} />
            </a>
            <a href="mailto:swarnim175@cic.du.ac.in" className="secondary-action">
              <Mail size={18} />
              swarnim175@cic.du.ac.in
            </a>
          </div>

          <div className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
            {researchModes.map((mode) => (
              <div key={mode.label} className="signal-tile">
                <mode.Icon size={18} />
                <span>{mode.label}</span>
                <strong>{mode.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px] lg:ml-auto">
          <div className="portrait-stage">
            <div className="portrait-frame">
              <Image
                src="/images/swarnim-sharma-profile.jpeg"
                alt="Swarnim Sharma profile photo"
                fill
                priority
                sizes="(min-width: 1024px) 500px, 88vw"
                className="object-cover object-[52%_38%]"
              />
            </div>

            <div className="scan-ring scan-ring-one" aria-hidden="true" />
            <div className="scan-ring scan-ring-two" aria-hidden="true" />
            <div className="portrait-caption">
              <span>Current Status</span>
              <strong>Fourth Year at Cluster Innovation Centre, University of Delhi</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-shell">
        <div className="section-heading">
          <p>Research Profile</p>
          <h2>About</h2>
        </div>

        <div className="about-panel">
          <div className="about-copy">
            <p className="about-lead">
              I am a research-focused technology student interested in working at the frontier of science, where
              mathematical analysis, scientific thinking, and software engineering come together to solve real-world
              problems.
            </p>
            <p>
              My work spans neuroscience, machine learning, optical systems, automation, and generative AI. I enjoy
              building tools that help researchers process complex data, understand signals, automate experiments, and
              turn technical ideas into reliable systems.
            </p>
            <p>
              I want to use my experience with software development, LLM frameworks, data analysis, and scientific
              reasoning to contribute to ambitious research and engineering work that creates practical value.
            </p>
          </div>
          <div className="about-index" aria-label="Research focus index">
            {aboutTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="about-pillar-grid">
          {aboutPillars.map((pillar) => (
            <article className="glass-card about-pillar-card" key={pillar.title}>
              <pillar.Icon size={22} />
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="education" className="section-shell">
        <div className="section-heading">
          <p>Academic Track</p>
          <h2>Education</h2>
        </div>

        <div className="education-grid">
          {education.map((item, index) => (
            <article className="glass-card education-card" key={item.title}>
              <div className="card-number">0{index + 1}</div>
              <GraduationCap className="text-mint" size={24} />
              <span className="mini-tag">{item.marker}</span>
              <h3>{item.title}</h3>
              <p>{item.institute}</p>
              <div className="card-meta">
                <span>{item.year}</span>
                <span>{item.score}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="section-shell">
        <div className="section-heading">
          <p>Applied Research</p>
          <h2>Experience</h2>
        </div>

        <div className="timeline">
          {experiences.map((experience, index) => (
            <article className="timeline-item" key={experience.role}>
              <div className="timeline-pin">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="glass-card experience-card">
                <div className="experience-topline">
                  <BriefcaseBusiness size={22} />
                  <span>{experience.duration}</span>
                </div>
                <h3>{experience.role}</h3>
                <p className="org">{experience.org}</p>
                <p className="location">{experience.location}</p>
                <span className="focus-tag">{experience.focus}</span>
                <p className="details">{experience.details}</p>
                <div className="experience-links">
                  {experience.credential ? <span>{experience.credential}</span> : null}
                  <span>{experience.skills}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section-shell">
        <div className="section-heading">
          <p>Selected Builds</p>
          <h2>Projects</h2>
        </div>

        <div className="project-lab">
          <div className="project-switcher" role="tablist" aria-label="Project selector">
            {projects.map((project, index) => (
              <button
                type="button"
                key={project.title}
                className={`project-tab ${selectedProject === index ? "is-selected" : ""}`}
                onClick={() => setSelectedProject(index)}
                role="tab"
                aria-selected={selectedProject === index}
                aria-controls="project-detail"
              >
                <project.Icon size={20} />
                <span>{project.title}</span>
              </button>
            ))}
          </div>

          <article className="project-detail" id="project-detail" role="tabpanel">
            <div className="project-orbit" aria-hidden="true">
              <SelectedIcon size={56} />
            </div>
            <span className="mini-tag">{selected.domain}</span>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
          </article>
        </div>
      </section>

      <section id="skills" className="section-shell">
        <div className="section-heading">
          <p>Working Stack</p>
          <h2>Skills</h2>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="glass-card skill-card" key={group.title}>
              <div className="skill-card-head">
                <group.Icon size={22} />
                <h3>{group.title}</h3>
              </div>
              <div className="skill-list">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section-shell pb-12">
        <div className="contact-band">
          <div>
            <p className="contact-kicker">Contact</p>
            <h2>B.Tech Information Technology & Mathematical Innovation</h2>
          </div>

          <div className="contact-grid">
            <a href="mailto:swarnim175@cic.du.ac.in">
              <Mail size={20} />
              swarnim175@cic.du.ac.in
            </a>
            <a href="tel:8595600798">
              <Phone size={20} />
              8595600798
            </a>
            <a href="https://www.linkedin.com/in/swarnim-sharma-60333a238" target="_blank" rel="noreferrer">
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-porcelain/48 md:flex-row md:items-center md:justify-between lg:px-8">
        <span>© Swarnim Sharma</span>
        <span>Research + technical portfolio</span>
      </footer>
    </main>
  );
}
