"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Atom,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  ChevronRight,
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
  Search,
  Sparkles,
  TerminalSquare,
  Waves,
  X
} from "lucide-react";

type Metric = {
  label: string;
  value: string;
};

type QuickLookItem = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  summary: string;
  details: string[];
  tags: string[];
  relatedTerms?: string[];
  metrics?: Metric[];
  action?: {
    label: string;
    href: string;
  };
  Icon: LucideIcon;
};

type ProjectItem = QuickLookItem & {
  domain: string;
};

type ExperienceItem = QuickLookItem & {
  role: string;
  org: string;
  duration: string;
  location: string;
  focus: string;
  credential?: string;
};

type EducationItem = QuickLookItem & {
  institute: string;
  year: string;
  score: string;
  marker: string;
};

type Skill = {
  name: string;
  terms?: string[];
};

type SkillGroup = {
  title: string;
  Icon: LucideIcon;
  skills: Skill[];
};

type GlossaryTerm = {
  key: string;
  term: string;
  summary: string;
  details: string[];
  related: string[];
  Icon: LucideIcon;
};

const navItems = [
  { label: "About", id: "about" },
  { label: "Education", id: "education" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" }
];

const researchModes: QuickLookItem[] = [
  {
    id: "mode-neuroimaging",
    eyebrow: "Research Signal",
    title: "Neuroimaging",
    subtitle: "EEG / fMRI",
    summary:
      "A recurring focus across Swarnim's research experience: understanding signals from the brain and building tools around complex physiological data.",
    details: [
      "Connected to the IIT Roorkee attention-state work, where EEG signals were processed for predictive modeling.",
      "Also connects to the Amity University internship on cortical signaling during retinal degeneration."
    ],
    tags: ["EEG", "fMRI", "Signal processing"],
    relatedTerms: ["eeg"],
    Icon: Waves
  },
  {
    id: "mode-generative-ai",
    eyebrow: "Research Signal",
    title: "Generative AI",
    subtitle: "LLM frameworks",
    summary:
      "A practical engineering layer in the portfolio, spanning study-material generation, reasoning models, and LLM-driven workflows.",
    details: [
      "Used Python-based LLM frameworks with Gemini reasoning models and OpenAI o1-mini during the MythyaVerse internship.",
      "Focused on generating age-appropriate study materials, questions, common doubts, and teacher presentations."
    ],
    tags: ["LLM", "Python", "Prompt engineering"],
    relatedTerms: ["llm"],
    Icon: Cpu
  },
  {
    id: "mode-optical-systems",
    eyebrow: "Research Signal",
    title: "Optical Systems",
    subtitle: "OCT + Spectroscopy",
    summary:
      "The optics side of the portfolio, covering OCT automation, spectrometer control, and spectroscopy-based characterization.",
    details: [
      "Connected to the IISc internship automating a Cobra 1600 OCT spectrometer for live scans and B-scan acquisition.",
      "Also connected to the ZnO nanoparticle project using FTIR and UV-Spectroscopy characterization."
    ],
    tags: ["OCT", "Spectroscopy", "Hardware integration"],
    relatedTerms: ["oct", "ftir"],
    Icon: Radar
  }
];

const aboutPillars: QuickLookItem[] = [
  {
    id: "pillar-frontier-science",
    eyebrow: "Research Profile",
    title: "Frontier science",
    summary:
      "Research problems where scientific curiosity, careful experimentation, and engineering open new ways to understand complex systems.",
    details: [
      "This theme appears in neuroscience, optical systems, nanoscience, and machine learning work.",
      "The portfolio positions Swarnim as a student who can move between scientific questions and practical software systems."
    ],
    tags: ["Scientific curiosity", "Experimentation", "Complex systems"],
    relatedTerms: ["eeg", "oct"],
    Icon: Microscope
  },
  {
    id: "pillar-scientific-computing",
    eyebrow: "Research Profile",
    title: "Scientific computing",
    summary:
      "Software that supports discovery: data pipelines, automation tools, signal processing workflows, and research-grade interfaces.",
    details: [
      "This theme connects directly to OCT automation, EEG signal processing, OCR tooling, and data processing experience.",
      "It frames software as an instrument for research rather than only as an application layer."
    ],
    tags: ["Automation", "Data pipelines", "Research interfaces"],
    relatedTerms: ["oct", "camera-link", "ocr"],
    Icon: Cpu
  },
  {
    id: "pillar-llms",
    eyebrow: "Research Profile",
    title: "LLMs for research",
    summary:
      "LLMs and generative AI as practical systems for reasoning, learning, analysis, and accelerating scientific workflows.",
    details: [
      "This theme is grounded in the MythyaVerse internship and the portfolio's generative AI skills.",
      "The emphasis is on applied workflows: content generation, reasoning-model evaluation, and structured educational outputs."
    ],
    tags: ["LLM frameworks", "Reasoning", "Learning systems"],
    relatedTerms: ["llm"],
    Icon: Brain
  },
  {
    id: "pillar-impact",
    eyebrow: "Research Profile",
    title: "Real-world impact",
    summary:
      "A preference for work that connects mathematical analysis and scientific thought with useful solutions for meaningful real-world problems.",
    details: [
      "The portfolio's projects span deployable tools, research automation, and technical analysis.",
      "This theme helps recruiters and research collaborators understand the common thread across varied domains."
    ],
    tags: ["Applied research", "Mathematical analysis", "Useful systems"],
    relatedTerms: ["ssim", "psnr"],
    Icon: Radar
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

const education: EducationItem[] = [
  {
    id: "education-undergraduate",
    eyebrow: "Academic Track",
    title: "Undergraduate (IT & MI)",
    institute: "Cluster Innovation Centre, University of Delhi",
    year: "Expected 2026",
    score: "CGPA: 8/10",
    marker: "IT + MI",
    summary:
      "Fourth year undergraduate work in Information Technology and Mathematical Innovation at Cluster Innovation Centre, University of Delhi.",
    details: [
      "The degree context supports the portfolio's mix of software engineering, mathematics, research, and scientific computing.",
      "The current academic status is also highlighted in the hero and contact sections."
    ],
    tags: ["Information Technology", "Mathematical Innovation", "University of Delhi"],
    relatedTerms: ["llm", "oct", "eeg"],
    Icon: GraduationCap
  },
  {
    id: "education-hsc",
    eyebrow: "Academic Track",
    title: "Intermediate (HSC)",
    institute: "Akash Public School",
    year: "2022",
    score: "Percentage: 77.4/100",
    marker: "HSC",
    summary: "Intermediate education completed at Akash Public School in 2022.",
    details: [
      "Listed as part of the academic path leading into the current undergraduate program.",
      "Presented for quick credential scanning in the education section."
    ],
    tags: ["Intermediate", "Akash Public School", "2022"],
    Icon: GraduationCap
  },
  {
    id: "education-ssc",
    eyebrow: "Academic Track",
    title: "Matriculation (SSC)",
    institute: "Oxford Senior Secondary School",
    year: "2020",
    score: "Percentage: 93/100",
    marker: "SSC",
    summary: "Matriculation completed at Oxford Senior Secondary School in 2020.",
    details: [
      "Part of the academic foundation shown in the portfolio.",
      "The education cards remain concise on-page and open richer detail in Quick Look."
    ],
    tags: ["Matriculation", "Oxford Senior Secondary School", "2020"],
    Icon: GraduationCap
  }
];

const projects: ProjectItem[] = [
  {
    id: "project-steganography",
    eyebrow: "Selected Build",
    title: "Image Steganography",
    domain: "Cryptography + Imaging",
    summary:
      "Hybrid decoding for hidden messages in encoded images using LSB and SSIS algorithms.",
    details: [
      "Developed a hybrid decoding method for image steganography using LSB and SSIS algorithms.",
      "Built familiarity with image processing, cryptography, steganalysis, and quality metrics such as PSNR and SSIM.",
      "The project successfully extracted hidden messages from encoded images."
    ],
    tags: ["Cryptography", "Image processing", "Steganalysis"],
    relatedTerms: ["lsb", "ssis", "psnr", "ssim"],
    metrics: [
      { label: "Domain", value: "Imaging" },
      { label: "Methods", value: "LSB + SSIS" },
      { label: "Metrics", value: "PSNR / SSIM" }
    ],
    Icon: ScanSearch
  },
  {
    id: "project-ocr",
    eyebrow: "Selected Build",
    title: "Multilingual Optical Character Recognition",
    domain: "OCR + Language Systems",
    summary:
      "A locally hosted Streamlit OCR app for multiple languages with formatted output and word highlighting.",
    details: [
      "Developed and hosted a local Streamlit app that performs OCR in multiple languages including English, Hindi, and Tamil.",
      "The app returns formatted text as output.",
      "It can find and highlight a word of interest in the original input file."
    ],
    tags: ["OCR", "Streamlit", "Multilingual"],
    relatedTerms: ["ocr"],
    metrics: [
      { label: "Interface", value: "Streamlit" },
      { label: "Languages", value: "English / Hindi / Tamil" },
      { label: "Feature", value: "Word highlighting" }
    ],
    Icon: Eye
  },
  {
    id: "project-zno",
    eyebrow: "Selected Build",
    title: "Green Synthesis of Zinc Oxide Nanoparticles",
    domain: "Nanoscience + Spectroscopy",
    summary:
      "Green synthesis, characterization, and interaction studies of ZnO nanoparticles and CT-DNA.",
    details: [
      "Learned green synthesis, characterization, and interaction studies of ZnO nanoparticles and CT-DNA.",
      "Used physiochemical techniques for interaction studies.",
      "Used FTIR and UV-Spectroscopy characterization techniques."
    ],
    tags: ["Nanoscience", "ZnO nanoparticles", "Spectroscopy"],
    relatedTerms: ["ftir", "ct-dna"],
    metrics: [
      { label: "Material", value: "ZnO NP" },
      { label: "Interaction", value: "CT-DNA" },
      { label: "Methods", value: "FTIR / UV" }
    ],
    Icon: Atom
  }
];

const experiences: ExperienceItem[] = [
  {
    id: "experience-rimo",
    eyebrow: "Experience",
    role: "Software Engineer",
    title: "Software Engineer",
    org: "Rimo LLC. - Part-time",
    duration: "Dec 2025 - 1 mo",
    location: "Shibuya-ku, Tokyo, Japan",
    focus: "Engineering",
    summary: "Software Engineer Internship at Rimo LLC.",
    details: [
      "Listed as a software engineering internship at Rimo LLC.",
      "The experience is associated with engineering, OpenAI API work, and additional skills."
    ],
    tags: ["Engineering", "OpenAI API", "Software"],
    relatedTerms: ["llm"],
    metrics: [
      { label: "Mode", value: "Part-time" },
      { label: "Location", value: "Tokyo, Japan" },
      { label: "Duration", value: "1 mo" }
    ],
    Icon: BriefcaseBusiness
  },
  {
    id: "experience-iisc",
    eyebrow: "Experience",
    role: "Research And Development Intern",
    title: "Research And Development Intern",
    org: "Indian Institute of Science (IISc) - Full-time",
    duration: "Jun 2025 - Aug 2025 - 3 mos",
    location: "Bengaluru, Karnataka, India - On-site",
    focus: "Automation of OCT system",
    summary:
      "Automation of the Cobra 1600 OCT spectrometer for live scans, B-scan acquisition, visualization, and hardware-software communication.",
    details: [
      "Developed Python-, C++-, and MATLAB-based scripts to automate the Cobra 1600 OCT spectrometer for live scans and B-scan acquisition.",
      "Designed a GUI to visualize spectrograms, axial scans, and intensity profiles.",
      "Integrated Camera Link hardware-software communication for smoother control.",
      "Coordinated with vendors, automated data pipelines with real-time validation, and applied optics and spectroscopy principles to improve imaging accuracy."
    ],
    tags: ["OCT automation", "Python", "C++", "MATLAB"],
    relatedTerms: ["oct", "camera-link"],
    metrics: [
      { label: "Institution", value: "IISc" },
      { label: "System", value: "Cobra 1600 OCT" },
      { label: "Duration", value: "3 mos" }
    ],
    Icon: BriefcaseBusiness
  },
  {
    id: "experience-mythyaverse",
    eyebrow: "Experience",
    role: "AI engineer intern",
    title: "AI engineer intern",
    org: "MythyaVerse - Internship",
    duration: "Mar 2025 - Apr 2025 - 2 mos",
    location: "Delhi, India - Remote",
    focus: "LLM content systems",
    summary:
      "AI application engineering for education workflows using Python-based LLM frameworks and reasoning models.",
    details: [
      "Supported edtech consultancy for Extramarks.",
      "Used Python-based LLM frameworks, Gemini reasoning models, and OpenAI o1-mini to generate age-appropriate study materials.",
      "Produced topics, questions, common doubts, and creative presentations for students and teachers across CBSE and ICSE contexts."
    ],
    tags: ["LLM frameworks", "Python", "EdTech"],
    relatedTerms: ["llm"],
    metrics: [
      { label: "Mode", value: "Remote" },
      { label: "Audience", value: "Classes 6-12" },
      { label: "Duration", value: "2 mos" }
    ],
    Icon: BriefcaseBusiness
  },
  {
    id: "experience-iitr",
    eyebrow: "Experience",
    role: "Cognitive Neuroscience and Machine Learning Internship",
    title: "Cognitive Neuroscience and Machine Learning Internship",
    org: "Indian Institute of Technology, Roorkee - Internship",
    duration: "Dec 2024 - Feb 2025 - 3 mos",
    location: "New Delhi, Delhi, India - Remote",
    focus: "EEG attention classification",
    credential: "SwarnimIITCertificate.pdf",
    summary:
      "Remote research internship using machine learning to classify attention states during meditation from EEG signals.",
    details: [
      "Worked remotely with Parimal Lab, IIT Roorkee.",
      "Designed and implemented a machine learning model to analyze EEG signals and classify attention states during meditation.",
      "The process involved processing a large EEG dataset through artifact removal, extracting relevant features, and applying predictive modeling techniques."
    ],
    tags: ["EEG", "Machine learning", "Feature extraction"],
    relatedTerms: ["eeg"],
    metrics: [
      { label: "Institution", value: "IIT Roorkee" },
      { label: "Signal", value: "EEG" },
      { label: "Duration", value: "3 mos" }
    ],
    Icon: BriefcaseBusiness
  },
  {
    id: "experience-amity",
    eyebrow: "Experience",
    role: "Summer Intern : Neuroscience and Neurophysiology",
    title: "Summer Intern: Neuroscience and Neurophysiology",
    org: "Amity University, Noida - Internship",
    duration: "Jun 2024 - Aug 2024 - 3 mos",
    location: "Noida, Uttar Pradesh, India - On-site",
    focus: "Cortical signaling",
    credential: "Internship_Certificate.pdf",
    summary:
      "SERB-DST funded internship at AINN focused on cortical signaling during retinal degeneration and implications for vision restoration.",
    details: [
      "Completed a SERB-DST funded internship at AINN.",
      "Focused on investigating physiological alterations in cortical signaling during retinal degeneration and implications for vision restoration.",
      "Used EEG and advanced signal processing techniques to analyze cortical signaling."
    ],
    tags: ["Neuroscience", "EEG", "Signal processing"],
    relatedTerms: ["eeg"],
    metrics: [
      { label: "Institution", value: "Amity University" },
      { label: "Focus", value: "Cortical signaling" },
      { label: "Duration", value: "3 mos" }
    ],
    Icon: BriefcaseBusiness
  }
];

const skillGroups: SkillGroup[] = [
  {
    title: "Programming Languages",
    Icon: TerminalSquare,
    skills: [
      { name: "C/C++" },
      { name: "Python" },
      { name: "MATLAB" },
      { name: "Java" },
      { name: "R (Statistical Computing)" },
      { name: "MySQL" }
    ]
  },
  {
    title: "Core Skills",
    Icon: Brain,
    skills: [
      { name: "Machine Learning / Deep Learning" },
      { name: "Software Automation" },
      { name: "Neuroimaging (EEG, fMRI)", terms: ["eeg"] },
      { name: "Generative AI (LLM frameworks and inference)", terms: ["llm"] },
      { name: "Prompt Engineering and NLP", terms: ["llm"] },
      { name: "Multilingual OCR Implementation", terms: ["ocr"] }
    ]
  },
  {
    title: "Others",
    Icon: Microscope,
    skills: [
      { name: "Neuroscience (Cognitive)", terms: ["eeg"] },
      { name: "Optical Coherence Tomography", terms: ["oct"] },
      { name: "Data Processing and Analysis" },
      { name: "Software-Hardware Integration", terms: ["camera-link"] }
    ]
  },
  {
    title: "Soft Skills",
    Icon: Sparkles,
    skills: [
      { name: "Research Skills" },
      { name: "Presentation" },
      { name: "Communication" },
      { name: "Leadership" },
      { name: "Teamwork" },
      { name: "Reverse Engineering" },
      { name: "Workflow Optimization" }
    ]
  },
  {
    title: "Tools/Platforms",
    Icon: Database,
    skills: [
      { name: "MATLAB" },
      { name: "Cursor" },
      { name: "Tera Term" },
      { name: "GitHub" },
      { name: "Windows / Linux" }
    ]
  }
];

const glossary: GlossaryTerm[] = [
  {
    key: "oct",
    term: "OCT",
    summary:
      "Optical Coherence Tomography, an imaging technique used to capture depth-resolved optical scans.",
    details: [
      "In this portfolio, OCT appears in the IISc work automating a Cobra 1600 OCT spectrometer.",
      "The related workflow included live scans, B-scan acquisition, spectrogram visualization, and intensity profile views."
    ],
    related: ["IISc", "Spectroscopy", "Automation"],
    Icon: Radar
  },
  {
    key: "eeg",
    term: "EEG",
    summary:
      "Electroencephalography, a method for recording electrical activity from the brain.",
    details: [
      "EEG appears in the IIT Roorkee internship for attention-state classification during meditation.",
      "It also appears in the Amity University internship focused on cortical signaling and retinal degeneration."
    ],
    related: ["Neuroimaging", "Signal processing", "Machine learning"],
    Icon: Waves
  },
  {
    key: "lsb",
    term: "LSB",
    summary:
      "Least Significant Bit, a common image steganography technique for hiding data in pixel-level information.",
    details: [
      "The image steganography project used LSB as part of a hybrid decoding method.",
      "It is connected to hidden message extraction, image processing, and cryptography."
    ],
    related: ["Steganography", "Cryptography", "Image processing"],
    Icon: ScanSearch
  },
  {
    key: "ssis",
    term: "SSIS",
    summary:
      "A steganography-related algorithm referenced in the image decoding project.",
    details: [
      "The portfolio describes SSIS alongside LSB as part of a hybrid decoding method.",
      "It is presented in the context of extracting hidden messages from encoded images."
    ],
    related: ["Steganography", "LSB", "Image decoding"],
    Icon: ScanSearch
  },
  {
    key: "ssim",
    term: "SSIM",
    summary:
      "Structural Similarity Index Measure, a metric used to compare image similarity and quality.",
    details: [
      "SSIM appears as a steganalysis metric in the image steganography project.",
      "It is paired with PSNR in the portfolio's description of image-processing evaluation."
    ],
    related: ["Image quality", "Steganalysis", "PSNR"],
    Icon: Eye
  },
  {
    key: "psnr",
    term: "PSNR",
    summary:
      "Peak Signal-to-Noise Ratio, an image quality metric used in image processing and analysis.",
    details: [
      "PSNR appears in the image steganography project as one of the steganalysis metrics.",
      "It helps frame the project as both decoding work and evaluation work."
    ],
    related: ["Image quality", "SSIM", "Steganalysis"],
    Icon: Eye
  },
  {
    key: "ftir",
    term: "FTIR",
    summary:
      "Fourier Transform Infrared Spectroscopy, a characterization technique used in material analysis.",
    details: [
      "FTIR appears in the ZnO nanoparticle project.",
      "The project used FTIR and UV-Spectroscopy for characterization."
    ],
    related: ["Spectroscopy", "ZnO nanoparticles", "Characterization"],
    Icon: Atom
  },
  {
    key: "llm",
    term: "LLM",
    summary:
      "Large Language Model, a generative AI model used for language, reasoning, and structured content workflows.",
    details: [
      "LLMs appear in the MythyaVerse internship and the portfolio's core skills.",
      "The work involved Python-based LLM frameworks, Gemini reasoning models, OpenAI o1-mini, and educational content generation."
    ],
    related: ["Generative AI", "Prompt engineering", "Python"],
    Icon: Brain
  },
  {
    key: "camera-link",
    term: "Camera Link",
    summary:
      "A hardware-software communication interface referenced in the OCT automation work.",
    details: [
      "The IISc internship included Camera Link integration for smoother hardware-software control.",
      "It appears in the context of spectrometer automation and live scan acquisition."
    ],
    related: ["OCT", "Hardware integration", "Automation"],
    Icon: CircuitBoard
  },
  {
    key: "ct-dna",
    term: "CT-DNA",
    summary:
      "Calf thymus DNA, referenced in the ZnO nanoparticle interaction study.",
    details: [
      "The ZnO nanoparticle project studied interactions involving ZnO nanoparticles and CT-DNA.",
      "It is connected to the nanoscience and spectroscopy side of the portfolio."
    ],
    related: ["ZnO nanoparticles", "Spectroscopy", "Interaction studies"],
    Icon: Atom
  },
  {
    key: "ocr",
    term: "OCR",
    summary:
      "Optical Character Recognition, software that turns image-based text into machine-readable text.",
    details: [
      "The multilingual OCR project used a local Streamlit app to process languages including English, Hindi, and Tamil.",
      "The project also included formatted text output and word highlighting in the original input file."
    ],
    related: ["Language systems", "Streamlit", "Text extraction"],
    Icon: BookOpen
  }
];

const glossaryByKey = new Map(glossary.map((term) => [term.key, term]));

function termToQuickLook(term: GlossaryTerm): QuickLookItem {
  return {
    id: `lookup-${term.key}`,
    eyebrow: "Quick Lookup",
    title: term.term,
    subtitle: "Curated local explanation",
    summary: term.summary,
    details: term.details,
    tags: term.related,
    Icon: term.Icon
  };
}

export function PortfolioExperience() {
  const shellRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProject, setSelectedProject] = useState(0);
  const [quickLook, setQuickLook] = useState<QuickLookItem | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isQuickLookOpen = quickLook !== null;

  const closeQuickLook = useCallback(() => {
    setQuickLook(null);
  }, []);

  const openQuickLook = useCallback(
    (item: QuickLookItem) => {
      if (!quickLook && document.activeElement instanceof HTMLElement) {
        lastFocusedElement.current = document.activeElement;
      }
      setQuickLook(item);
    },
    [quickLook]
  );

  const openGlossaryTerm = useCallback(
    (key: string) => {
      const term = glossaryByKey.get(key);

      if (term) {
        openQuickLook(termToQuickLook(term));
      }
    },
    [openQuickLook]
  );

  const openTag = useCallback(
    (tag: string) => {
      const mappedTerm =
        tag.includes("LLM")
          ? "llm"
          : tag.includes("Neuro")
            ? "eeg"
            : tag.includes("Optical")
              ? "oct"
              : undefined;

      if (mappedTerm) {
        openGlossaryTerm(mappedTerm);
        return;
      }

      openQuickLook({
        id: `focus-${tag.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        eyebrow: "Research Focus",
        title: tag,
        summary: `${tag} is one of the focus areas used to frame Swarnim's portfolio.`,
        details: [
          "It appears in the research profile as a recurring theme across projects, experience, and skills.",
          "The site uses these focus tags as compact orientation points for recruiters and research collaborators."
        ],
        tags: ["Research profile", "Portfolio theme"],
        Icon: Sparkles
      });
    },
    [openGlossaryTerm, openQuickLook]
  );

  const openSkill = useCallback(
    (skill: Skill, group: SkillGroup) => {
      openQuickLook({
        id: `skill-${group.title}-${skill.name}`,
        eyebrow: group.title,
        title: skill.name,
        subtitle: "Working stack",
        summary: `${skill.name} is listed in Swarnim's ${group.title.toLowerCase()} skill group.`,
        details: [
          "This item is part of the current portfolio skills inventory.",
          "It connects to the broader mix of research, automation, data analysis, and software engineering shown across the portfolio."
        ],
        tags: [group.title, "Skill"],
        relatedTerms: skill.terms,
        Icon: group.Icon
      });
    },
    [openQuickLook]
  );

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

    document.querySelectorAll<HTMLElement>("section[id]").forEach((section) => observer.observe(section));
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  useEffect(() => {
    if (!isQuickLookOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const focusTimer = window.setTimeout(() => dialogRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeQuickLook();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;
      const focusable = dialog?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );

      if (!dialog || !focusable?.length) {
        event.preventDefault();
        dialog?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      lastFocusedElement.current?.focus();
    };
  }, [closeQuickLook, isQuickLookOpen]);

  const selected = projects[selectedProject] ?? projects[0];
  const SelectedIcon = selected.Icon;
  const revealProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.16 },
        transition: { duration: 0.55 }
      };

  return (
    <main ref={shellRef} className="portfolio-shell">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="pointer-spotlight" aria-hidden="true" />

      <nav className="nav-shell" aria-label="Primary navigation">
        <div className="nav-inner">
          <a href="#hero" className="brand-mark" aria-label="Swarnim Sharma home">
            <span>SS</span>
            <strong>Swarnim Sharma</strong>
          </a>

          <div className="nav-links">
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

      <section id="hero" className="hero-section">
        <motion.div
          className="hero-copy"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <p className="eyebrow hero-eyebrow">
            <CircuitBoard size={15} />
            B.Tech Information Technology & Mathematical Innovation
          </p>

          <h1>Swarnim Sharma</h1>
          <p className="hero-subtitle">Fourth Year at Cluster Innovation Centre, University of Delhi</p>

          <div className="hero-actions">
            <a href="#projects" className="primary-action">
              View research work
              <ArrowUpRight size={18} />
            </a>
            <a href="mailto:swarnim175@cic.du.ac.in" className="secondary-action">
              <Mail size={18} />
              swarnim175@cic.du.ac.in
            </a>
          </div>

          <div className="signal-grid" aria-label="Research signals">
            {researchModes.map((mode) => {
              const Icon = mode.Icon;

              return (
                <motion.button
                  type="button"
                  key={mode.id}
                  className="signal-tile"
                  onClick={() => openQuickLook(mode)}
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                >
                  <Icon size={18} />
                  <span>{mode.title}</span>
                  <strong>{mode.subtitle}</strong>
                  <ChevronRight size={17} aria-hidden="true" />
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="portrait-column"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22, scale: 0.98 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
        >
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

            <button
              type="button"
              className="portrait-caption"
              onClick={() => openQuickLook(education[0])}
            >
              <span>Current Status</span>
              <strong>Fourth Year at Cluster Innovation Centre, University of Delhi</strong>
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </section>

      <motion.section id="about" className="section-shell" {...revealProps}>
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
              <button type="button" key={tag} onClick={() => openTag(tag)}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="lookup-band">
          <div>
            <p>Quick Lookup</p>
            <h3>Local glossary</h3>
          </div>
          <div className="lookup-chips">
            {glossary.slice(0, 9).map((term) => (
              <button type="button" key={term.key} onClick={() => openGlossaryTerm(term.key)}>
                <Search size={14} />
                {term.term}
              </button>
            ))}
          </div>
        </div>

        <div className="about-pillar-grid">
          {aboutPillars.map((pillar) => {
            const Icon = pillar.Icon;

            return (
              <motion.button
                type="button"
                className="glass-card about-pillar-card"
                key={pillar.id}
                onClick={() => openQuickLook(pillar)}
                whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
              >
                <Icon size={22} />
                <h3>{pillar.title}</h3>
                <p>{pillar.summary}</p>
                <span className="card-affordance">
                  Details
                  <ChevronRight size={16} />
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      <motion.section id="education" className="section-shell" {...revealProps}>
        <div className="section-heading">
          <p>Academic Track</p>
          <h2>Education</h2>
        </div>

        <div className="education-grid">
          {education.map((item, index) => (
            <motion.button
              type="button"
              className="glass-card education-card"
              key={item.id}
              onClick={() => openQuickLook(item)}
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
            >
              <div className="card-number">0{index + 1}</div>
              <GraduationCap size={24} />
              <span className="mini-tag">{item.marker}</span>
              <h3>{item.title}</h3>
              <p>{item.institute}</p>
              <div className="card-meta">
                <span>{item.year}</span>
                <span>{item.score}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.section>

      <motion.section id="experience" className="section-shell" {...revealProps}>
        <div className="section-heading">
          <p>Applied Research</p>
          <h2>Experience</h2>
        </div>

        <div className="timeline">
          {experiences.map((experience, index) => (
            <article className="timeline-item" key={experience.id}>
              <div className="timeline-pin">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <motion.button
                type="button"
                className="glass-card experience-card"
                onClick={() => openQuickLook(experience)}
                whileHover={shouldReduceMotion ? undefined : { x: 5 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
              >
                <div className="experience-topline">
                  <BriefcaseBusiness size={22} />
                  <span>{experience.duration}</span>
                </div>
                <h3>{experience.role}</h3>
                <p className="org">{experience.org}</p>
                <p className="location">{experience.location}</p>
                <span className="focus-tag">{experience.focus}</span>
                <p className="details">{experience.summary}</p>
                <div className="experience-links">
                  {experience.credential ? <span>{experience.credential}</span> : null}
                  <span>{experience.tags.join(", ")}</span>
                </div>
              </motion.button>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section id="projects" className="section-shell" {...revealProps}>
        <div className="section-heading">
          <p>Selected Builds</p>
          <h2>Projects</h2>
        </div>

        <div className="project-lab">
          <div className="project-switcher" role="tablist" aria-label="Project selector">
            {projects.map((project, index) => {
              const Icon = project.Icon;

              return (
                <button
                  type="button"
                  key={project.id}
                  className={`project-tab ${selectedProject === index ? "is-selected" : ""}`}
                  onClick={() => setSelectedProject(index)}
                  role="tab"
                  aria-selected={selectedProject === index}
                  aria-controls="project-detail"
                  id={`project-tab-${project.id}`}
                >
                  <Icon size={20} />
                  <span>{project.title}</span>
                </button>
              );
            })}
          </div>

          <motion.button
            type="button"
            className="project-detail"
            id="project-detail"
            role="tabpanel"
            aria-labelledby={`project-tab-${selected.id}`}
            onClick={() => openQuickLook(selected)}
            key={selected.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="project-orbit" aria-hidden="true">
              <SelectedIcon size={52} />
            </div>
            <span className="mini-tag">{selected.domain}</span>
            <h3>{selected.title}</h3>
            <p>{selected.summary}</p>
            <div className="detail-metrics">
              {selected.metrics?.map((metric) => (
                <span key={metric.label}>
                  <small>{metric.label}</small>
                  <strong>{metric.value}</strong>
                </span>
              ))}
            </div>
          </motion.button>
        </div>
      </motion.section>

      <motion.section id="skills" className="section-shell" {...revealProps}>
        <div className="section-heading">
          <p>Working Stack</p>
          <h2>Skills</h2>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => {
            const Icon = group.Icon;

            return (
              <article className="glass-card skill-card" key={group.title}>
                <div className="skill-card-head">
                  <Icon size={22} />
                  <h3>{group.title}</h3>
                </div>
                <div className="skill-list">
                  {group.skills.map((skill) => (
                    <button type="button" key={skill.name} onClick={() => openSkill(skill, group)}>
                      {skill.name}
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </motion.section>

      <motion.section id="contact" className="section-shell contact-section" {...revealProps}>
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
      </motion.section>

      <footer className="site-footer">
        <span>Swarnim Sharma</span>
        <span>Research + technical portfolio</span>
      </footer>

      <AnimatePresence>
        {quickLook ? (
          <motion.div
            className="quicklook-layer"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="quicklook-backdrop"
              type="button"
              aria-label="Close Quick Look backdrop"
              onClick={closeQuickLook}
            />
            <motion.aside
              ref={dialogRef}
              className="quicklook-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="quicklook-title"
              tabIndex={-1}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="quicklook-head">
                <div className="quicklook-icon">
                  <quickLook.Icon size={24} />
                </div>
                <button type="button" className="quicklook-close" onClick={closeQuickLook} aria-label="Close Quick Look">
                  <X size={18} />
                </button>
              </div>

              <p className="quicklook-eyebrow">{quickLook.eyebrow}</p>
              <h2 id="quicklook-title">{quickLook.title}</h2>
              {quickLook.subtitle ? <p className="quicklook-subtitle">{quickLook.subtitle}</p> : null}
              <p className="quicklook-summary">{quickLook.summary}</p>

              {quickLook.metrics?.length ? (
                <div className="quicklook-metrics">
                  {quickLook.metrics.map((metric) => (
                    <span key={metric.label}>
                      <small>{metric.label}</small>
                      <strong>{metric.value}</strong>
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="quicklook-details">
                {quickLook.details.map((detail) => (
                  <p key={detail}>{detail}</p>
                ))}
              </div>

              <div className="quicklook-tags">
                {quickLook.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              {quickLook.relatedTerms?.length ? (
                <div className="quicklook-related">
                  <p>Related lookup</p>
                  <div>
                    {quickLook.relatedTerms.map((termKey) => {
                      const term = glossaryByKey.get(termKey);

                      if (!term) {
                        return null;
                      }

                      return (
                        <button type="button" key={term.key} onClick={() => openGlossaryTerm(term.key)}>
                          <Search size={14} />
                          {term.term}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {quickLook.action ? (
                <a className="quicklook-action" href={quickLook.action.href}>
                  {quickLook.action.label}
                  <ArrowUpRight size={16} />
                </a>
              ) : null}
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
