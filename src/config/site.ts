import type { ExperienceItemType } from "@/components/work-experience";

/**
 * All site content lives here — edit this file to update the page
 * without touching the section components.
 */

export const SOZO = {
  name: "Sozo Tech Enterprise",
  url: "https://www.thesozocrm.com",
  crmUrl: "https://www.thesozocrm.com",
} as const;

export const SITE = {
  name: "Chandler King",
  initials: "CK",
  wordmark: "C.KING",
  url: "https://chandlerking.dev",
  domain: "chandlerking.dev",
  tagline:
    "I build AI-powered mobile & SaaS products, ship with agentic engineering workflows, and lead dev teams from zero to production.",
  flipTitles: [
    "Founder @ Sozo Tech Enterprise",
    "Agentic Engineer",
    "Head of Technology",
    "AI & Mobile Product Builder",
  ],
  avatar: "/images/6B860135-AA52-4B11-B8AA-EFE96BE31E45_1_105_c.jpeg",
  github: {
    username: "kingct19",
    repo: "C.King",
  },
};

export const OVERVIEW = {
  rows: [
    {
      icon: "briefcase",
      label: "Founder & Head of Technology @",
      link: { text: SOZO.name, href: SOZO.url },
    },
    {
      icon: "rocket",
      label: "Now building",
      link: { text: "AnglerIQ", href: "#projects" },
    },
  ],
  location: "Dallas, Texas, USA",
  timeZone: "America/Chicago",
  email: "chandler@thesozotech.com",
  phone: "+1 (903) 424-4805",
  website: "chandlerking.dev",
  pronouns: "he/him",
};

export type AvailabilityStatus = "open" | "selective" | "busy";

export const AVAILABILITY: { status: AvailabilityStatus; label: string } = {
  status: "open",
  label: "Open to partnerships & leadership roles",
};

export const RESUME = {
  href: "/Chandler-King-Resume.pdf",
  filename: "Chandler-King-Resume.pdf",
  label: "Resume",
};

export const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/kingct19" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/chandler-king-052861240" },
  { name: "Instagram", href: "https://www.instagram.com/chandler.t.king/" },
  { name: "Mail", href: "mailto:chandler@thesozotech.com" },
] as const;

export const ABOUT_BULLETS = [
  "I'm Chandler King — founder of Sozo Tech Enterprise, where I build AI-powered software products and lead a team of developers from idea to launch.",
  "I work as an agentic engineer — using AI agents, automation, and modern tooling to ship faster without sacrificing architecture or code quality.",
  "I earned my B.S. and M.S. in Computer Science with an AI focus, combining academic depth with hands-on product execution.",
  "Before Sozo, I spent a year as Head of Technology at Elevate Solar — where I built their website and an AI facial recognition application.",
  "Today I'm shipping The Sozo CRM and AnglerIQ, an AI-first mobile fish finder, while managing delivery across a growing dev team.",
];

export const STACK: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Dart"],
  },
  {
    label: "Frontend & Mobile",
    items: ["React", "Next.js", "React Native", "Flutter", "Tailwind CSS", "shadcn/ui"],
  },
  {
    label: "Backend & Database",
    items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Firebase", "Supabase"],
  },
  {
    label: "AI & Agentic Engineering",
    items: [
      "Agentic Workflows",
      "LLM Integration",
      "Machine Learning",
      "Computer Vision",
      "Cursor",
      "MCP",
    ],
  },
  {
    label: "Tools & DevOps",
    items: ["Git", "Docker", "Vercel", "GitHub Actions", "Figma"],
  },
];

export type ProjectItem = {
  title: string;
  period: string;
  description?: string;
  bullets?: string[];
  tags?: string[];
  href?: string;
  previewImage?: string;
  isExpanded?: boolean;
};

/** GitHub repo pin — metadata is enriched from the API at build time. */
export type PinnedGitHubProject = {
  source: "github";
  repo: string;
  isExpanded?: boolean;
};

/** Non-GitHub project — all fields are authored here. */
export type PinnedCustomProject = {
  source: "custom";
} & ProjectItem;

export type PinnedProject = PinnedGitHubProject | PinnedCustomProject;

/**
 * Projects section order and content. GitHub pins are enriched live;
 * custom pins are shown as-is. Reorder or edit this list anytime.
 */
export const PINNED_PROJECTS: PinnedProject[] = [
  {
    source: "custom",
    title: "AnglerIQ",
    period: "2025 — present",
    description:
      "AI-first mobile fish finder — helping anglers locate and understand fish patterns with on-device intelligence and real-time insights.",
    bullets: [
      "Leading product direction and mobile architecture for an AI-native outdoor app",
      "Coordinating a cross-functional dev team through design, build, and release",
      "Computer vision and location-aware features tuned for field use",
    ],
    tags: ["React Native", "AI/ML", "Computer Vision", "TypeScript", "Mobile"],
    href: SOZO.url,
    previewImage: "/images/angleriq-preview.png",
    isExpanded: true,
  },
  {
    source: "custom",
    title: "The Sozo CRM",
    period: "2024 — present",
    description:
      "Customer relationship platform built at Sozo Tech Enterprise — the product that launched the company after securing investor backing.",
    bullets: [
      "Full-stack CRM designed for modern sales and client workflows",
      "Shipped from zero to production at www.thesozocrm.com",
      "Foundation for Sozo Tech Enterprise's client and product ecosystem",
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "CRM", "SaaS"],
    href: SOZO.crmUrl,
    previewImage: "/images/the-sozo-crm-preview.png",
  },
  {
    source: "custom",
    title: "elevate-solar.com",
    period: "2024",
    description:
      "Marketing and lead-generation website for Elevate Solar — the solar company where I served as Head of Technology.",
    bullets: [
      "Designed and built the public-facing site at www.elevate-solar.com",
      "Supported solar sales and brand presence with a fast, conversion-focused web experience",
      "Owned technical delivery alongside internal tools and AI initiatives",
    ],
    tags: ["Next.js", "Web Development", "Solar", "TypeScript"],
    href: "https://www.elevate-solar.com",
    previewImage: "/images/elevate-solar-preview.png",
  },
  {
    source: "custom",
    title: "Family Tracking & Management App",
    period: "2024 — 2025",
    description:
      "Full-stack family locator and safety platform — real-time location, tasks, rewards, and messaging to keep loved ones connected.",
    bullets: [
      "Built HaloHub-style landing experience and family coordination features",
      "Role-based access with real-time location and task management",
      "Mobile-responsive UI designed for everyday family use",
    ],
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "Mobile"],
    href: "https://github.com/kingct19/Family-Tracking-and-Management-App",
    previewImage: "/images/family-tracking-preview.png",
  },
  { source: "github", repo: "ETAMU-All-in-One" },
  { source: "github", repo: "C.King" },
];

/**
 * Per-repo overrides for GitHub pins. Keyed by repo name; any
 * ProjectItem field can be overridden (title, description, bullets, etc.).
 */
export const PROJECT_OVERRIDES: Record<string, Partial<ProjectItem>> = {
  "C.King": {
    title: "chandlerking.dev",
    description:
      "This portfolio — a fast, accessible single-page site with live GitHub project sync and contribution graph.",
    bullets: [
      "Next.js App Router with ISR-cached GitHub data",
      "Brand-aligned design system with light/dark themes",
      "Pinned project curation with API metadata enrichment",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  "ETAMU-All-in-One": {
    title: "ETAMU All-in-One",
    description:
      "All-in-one mobile app for Texas A&M University–Commerce — campus resources, tools, and student workflows in one Flutter app.",
    bullets: [
      "Cross-platform mobile app built with Flutter and Dart",
      "Centralized student-facing features for the ETAMU community",
      "91+ commits; includes demo video and capstone notebook in the repo",
    ],
    tags: ["Flutter", "Dart", "Mobile", "iOS", "Android"],
    href: "https://github.com/kingct19/ETAMU-All-in-One",
    previewImage: "/images/etamu-all-in-one-preview.png",
  },
};

export const EXPERIENCES: ExperienceItemType[] = [
  {
    id: "sozo-tech",
    companyName: SOZO.name,
    companyWebsite: SOZO.url,
    isCurrentEmployer: true,
    positions: [
      {
        id: "sozo-founder",
        title: "Founder & Head of Technology",
        employmentPeriod: { start: "01.2025" },
        employmentType: "Full-time",
        description:
          "- Founded Sozo Tech Enterprise after securing investment from two backers.\n- Lead product, architecture, and engineering across CRM and mobile initiatives.\n- Apply agentic engineering workflows to accelerate delivery across a team of 3+ developers.",
        skills: [
          "Leadership",
          "Product Strategy",
          "Agentic Engineering",
          "TypeScript",
          "React Native",
          "AI/ML",
          "Project Management",
        ],
        isExpanded: true,
      },
      {
        id: "sozo-products",
        title: "Lead Developer & Project Manager",
        employmentPeriod: { start: "01.2025" },
        employmentType: "Full-time",
        description:
          "- Shipped The Sozo CRM (thesozocrm.com) from concept to production.\n- Currently building AnglerIQ — an AI-first fish finder mobile application.\n- Own roadmap, technical decisions, and cross-team coordination.",
        skills: ["Next.js", "React Native", "PostgreSQL", "Computer Vision", "Agile"],
      },
    ],
  },
  {
    id: "solar",
    companyName: "Elevate Solar",
    companyWebsite: "https://www.elevate-solar.com",
    positions: [
      {
        id: "solar-head",
        title: "Head of Technology",
        employmentPeriod: { start: "01.2024", end: "12.2024" },
        employmentType: "Full-time",
        description:
          "- Led all technology strategy, infrastructure, and software for a solar energy company.\n- Built and launched www.elevate-solar.com — the company's public website.\n- Developed an AI facial recognition application for operational use.\n- Experience directly informed the investor pitch and launch of Sozo Tech Enterprise.",
        skills: [
          "Technical Leadership",
          "System Architecture",
          "Full-Stack Development",
          "Computer Vision",
          "Team Building",
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "education",
    companyName: "Texas A&M University–Commerce",
    companyWebsite: "https://www.tamuc.edu",
    positions: [
      {
        id: "edu-ms",
        title: "M.S. Computer Science — AI Concentration",
        employmentPeriod: { start: "08.2025", end: "05.2026" },
        employmentType: "Education",
        description:
          "- Graduate coursework focused on artificial intelligence, machine learning, and intelligent systems.\n- Applied AI concepts to capstone and product-oriented research.",
        skills: ["Artificial Intelligence", "Machine Learning", "Research"],
      },
      {
        id: "edu-bs",
        title: "B.S. Computer Science — AI Concentration · Student-Athlete",
        employmentPeriod: { start: "08.2021", end: "05.2025" },
        employmentType: "Education",
        description:
          "- Undergraduate CS degree with an AI-focused curriculum.\n- Competed as a collegiate student-athlete while maintaining academic honors.",
        skills: ["Computer Science", "Algorithms", "Leadership", "Time Management"],
      },
    ],
  },
];

export const CONTACT = {
  email: OVERVIEW.email,
  phone: OVERVIEW.phone,
  hire: {
    headline: "Hire me",
    description:
      "Looking for a technical leader who ships with modern AI workflows? I'm open to senior engineering, Head of Technology, and founding-team roles.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/chandler-king-052861240" },
      { label: "GitHub", href: "https://github.com/kingct19" },
    ],
  },
  partner: {
    headline: "Partner with Sozo",
    description:
      "Need a product built — web, mobile, or AI? Sozo Tech Enterprise takes ideas from scope to production with a team that delivers.",
    primaryCta: { label: "Explore The Sozo CRM", href: SOZO.crmUrl },
    secondaryCta: { label: "AnglerIQ", href: "#projects" },
  },
};

export const WORK_WITH_SOZO = {
  description:
    "Sozo Tech Enterprise builds custom software for clients while shipping our own products — The Sozo CRM and AnglerIQ. Backed by two investors. Led by a hands-on founder who still writes code and runs delivery.",
  metrics: [
    { label: "Developers led", value: "3+" },
    { label: "Products shipped", value: "5+" },
    { label: "Investors", value: "2" },
  ],
  services: [
    {
      icon: "code",
      title: "Web & SaaS Development",
      description:
        "Full-stack platforms like The Sozo CRM — dashboards, APIs, auth, and deployment pipelines built to scale.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Vercel"],
    },
    {
      icon: "smartphone",
      title: "Mobile & AI Products",
      description:
        "Native-feel mobile apps with AI at the core. AnglerIQ combines computer vision and location intelligence for real-world use.",
      tags: ["React Native", "AI/ML", "Computer Vision"],
    },
    {
      icon: "briefcase",
      title: "Technical Leadership & PM",
      description:
        "Team management, sprint planning, architecture decisions, and client communication — I lead the build, not just the code.",
      tags: ["Agile", "Product Strategy", "Team Leadership"],
    },
  ],
  cta: { label: "Visit thesozocrm.com", href: SOZO.crmUrl },
};

export const FOOTER = {
  craftedBy: { text: "Chandler King", href: "https://github.com/kingct19" },
  builtWith: [
    { text: "Next.js", href: "https://nextjs.org" },
    { text: "Tailwind CSS", href: "https://tailwindcss.com" },
    { text: "shadcn/ui", href: "https://ui.shadcn.com" },
  ],
  infrastructure: { text: "Vercel", href: "https://vercel.com" },
  sourceCode: {
    text: "View source",
    href: "https://github.com/kingct19/C.King",
  },
};
