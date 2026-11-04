import type { ExperienceItemType } from "@/components/work-experience";
import { socialsConfig } from "@/config/socials";
import type { AboutGreetings, AboutItem, FooterConfig, PortfolioConfig } from "@/config/types";

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
    "Software engineer building AI-powered web and mobile products with React, React Native, and TypeScript — from architecture to production.",
  flipTitles: [
    "Software Engineer",
    "Full-Stack Engineer",
    "Founder @ Sozo Tech Enterprise",
    "Mobile & AI Product Builder",
  ],
  avatar: "/images/chandler-king-headshot.jpg",
  github: {
    username: "kingct19",
    repo: "C.King",
  },
};

export const OVERVIEW = {
  rows: [
    {
      icon: "briefcase",
      label: "Founder & Lead Software Engineer @",
      link: { text: SOZO.name, href: SOZO.url },
    },
    {
      icon: "rocket",
      label: "Now building",
      link: { text: "AnglerIQ", href: "#projects" },
    },
  ],
  location: "Kansas City, Missouri, USA",
  timeZone: "America/Chicago",
  email: "chandler@studiosozo.dev",
  phone: "+1 (903) 424-4805",
  website: "chandlerking.dev",
  pronouns: "he/him",
};

export type AvailabilityStatus = "open" | "selective" | "busy";

export const AVAILABILITY: { status: AvailabilityStatus; label: string } = {
  status: "open",
  label: "Open to software engineering roles",
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
  { name: "Mail", href: "mailto:chandler@studiosozo.dev" },
] as const;

export const ABOUT_BULLETS = [
  "I'm Chandler King — a software engineer in Kansas City, MO with a B.S. and M.S. in Computer Science (AI concentration) from Texas A&M University–Commerce.",
  "I work full-stack: React and Next.js on the web, React Native and Flutter on mobile, Node.js and PostgreSQL on the backend.",
  "I founded Sozo Tech Enterprise, where I lead a small dev team and have shipped two products to production: The Sozo CRM and AnglerIQ, an AI-powered mobile fish finder.",
  "I use AI-assisted development workflows — Cursor, LLM integration, and agent tooling — to move faster without sacrificing architecture or code quality.",
  "Before Sozo, I led technology at Elevate Solar, where I built and launched the company website and an internal facial recognition application.",
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

export type PinnedGitHubProject = {
  source: "github";
  repo: string;
  isExpanded?: boolean;
};

export type PinnedCustomProject = {
  source: "custom";
} & ProjectItem;

export type PinnedProject = PinnedGitHubProject | PinnedCustomProject;

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
    previewImage: "/rixel.png",
    isExpanded: true,
  },
  {
    source: "custom",
    title: "The Sozo CRM",
    period: "2024 — present",
    description:
      "Customer relationship platform built at Sozo Tech Enterprise — the company's first product, shipped from zero to production.",
    bullets: [
      "Full-stack CRM designed for modern sales and client workflows",
      "Shipped from zero to production at www.thesozocrm.com",
      "Foundation for Sozo Tech Enterprise's client and product ecosystem",
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "CRM", "SaaS"],
    href: SOZO.crmUrl,
    previewImage: "/gridly.png",
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
    previewImage: "/root.png",
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
    previewImage: "/zeno.png",
  },
  { source: "github", repo: "ETAMU-All-in-One" },
  { source: "github", repo: "C.King" },
];

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
    previewImage: "/aura.png",
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
        title: "Founder & Lead Software Engineer",
        employmentPeriod: { start: "01.2026" },
        employmentType: "Full-time",
        description:
          "- Founded an investor-backed software company; lead product, architecture, and engineering across web and mobile.\n- Shipped The Sozo CRM (thesozocrm.com) from concept to production with Next.js, TypeScript, and PostgreSQL.\n- Building AnglerIQ, an AI-powered fish finder mobile app, with React Native and computer vision.\n- Manage a team of 3 developers — roadmap, sprint planning, code review, and releases.",
        skills: [
          "TypeScript",
          "Next.js",
          "React Native",
          "PostgreSQL",
          "AI/ML",
          "Team Leadership",
          "Product Strategy",
        ],
        isExpanded: true,
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
        employmentPeriod: { start: "01.2025", end: "01.2026" },
        employmentType: "Full-time",
        description:
          "- Owned technology for a solar energy company while completing my M.S. in Computer Science.\n- Designed, built, and launched the company website (elevate-solar.com) to support sales and lead generation.\n- Built an internal facial recognition application using computer vision.\n- Managed the company's software tooling and infrastructure.",
        skills: [
          "Full-Stack Development",
          "Next.js",
          "TypeScript",
          "Computer Vision",
          "Technical Leadership",
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
        employmentPeriod: { start: "01.2024", end: "05.2026" },
        employmentType: "Education",
        description:
          "- Graduate coursework focused on artificial intelligence, machine learning, and intelligent systems.\n- Applied AI concepts to capstone and product-oriented research.",
        skills: ["Artificial Intelligence", "Machine Learning", "Research"],
      },
      {
        id: "edu-bs",
        title: "B.S. Computer Science — AI Concentration · Student-Athlete",
        employmentPeriod: { start: "08.2019", end: "12.2023" },
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
      "I'm looking for a full-time software engineering role — full-stack, mobile, or AI-focused. I bring end-to-end production experience and the ownership mindset of a founder.",
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
    "Sozo Tech Enterprise is the investor-backed software company I founded — we ship our own products, The Sozo CRM and AnglerIQ, and build custom software for clients. Here's the kind of work I do there day to day.",
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
      title: "Technical Leadership",
      description:
        "Team management, sprint planning, architecture decisions, and client communication — I lead the build, not just the code.",
      tags: ["Agile", "Product Strategy", "Team Leadership"],
    },
  ],
  cta: { label: "Visit thesozocrm.com", href: SOZO.crmUrl },
};

export const CALENDLY_URL = "https://calendar.app.google/nqkE4R2mjum2PSPP9";

export const SERVICES_PAGE = {
  meta: {
    title: "Studio Sozo · Services",
    description:
      "I run Studio Sozo — a software studio that designs and builds custom software, CRMs, web & mobile apps, and AI automations that businesses own 100% outright with zero per-seat SaaS tax.",
  },
  hero: {
    badge: "STUDIO SOZO",
    headline: "I run a software startup that helps businesses own their software outright.",
    subhead:
      "Most growing businesses aren't held back by effort — they're held back by disconnected tools and monthly SaaS rent. At Studio Sozo, we design and build unified software systems, custom CRMs, web & mobile apps, and AI automations tailored to how your team actually operates — with 100% code ownership and zero per-seat SaaS tax.",
    primaryCta: {
      label: "Explore Studio Sozo Services",
      href: "https://studiosozo.vercel.app/services",
    },
    secondaryCta: {
      label: "Book a 30-min scoping call",
      href: CALENDLY_URL,
    },
  },
  capabilities: [
    {
      code: "01",
      title: "Custom Software Development",
      description:
        "Proprietary software systems tailored to your exact workflows, pricing rules, and team permissions — no rigid templates or per-user licensing fees.",
    },
    {
      code: "02",
      title: "CRM & Business Systems",
      description:
        "Custom CRMs and operational back-offices connecting lead intake, quoting, dispatch, field execution, and customer communication in one pipeline.",
    },
    {
      code: "03",
      title: "AI & Workflow Automation",
      description:
        "Production-grade AI workflows and deterministic automations that read documents, qualify inbound leads, and trigger actions across your stack.",
    },
    {
      code: "04",
      title: "Web & Mobile Applications",
      description:
        "Fast, conversion-focused web platforms, booking engines, and iOS/Android field apps engineered for real-world reliability.",
    },
  ],
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

/* ---------------------------------------------------------------------------
   akoder.xyz / AdityaKodez Config Layer (Adapted for Chandler King)
--------------------------------------------------------------------------- */

export const aboutGreetings: AboutGreetings = {
  morning: "Good morning !",
  afternoon: "Good afternoon !",
  evening: "Good evening !",
};

export const aboutItems: AboutItem[] = [
  {
    id: "build",
    lead: "I'm Chandler King. I build full-stack web & mobile products",
    illustration: "browser",
    body: "from Kansas City, MO — holding a B.S. and M.S. in Computer Science (AI Concentration) from Texas A&M University–Commerce where I also competed as an NCAA track & field sprinter.",
  },
  {
    id: "share",
    lead: "I founded Sozo Tech Enterprise to ship real products",
    illustration: "notebook",
    body: "leading a dev team from architecture to production on The Sozo CRM (thesozocrm.com) and AnglerIQ, an AI-powered mobile fish finder.",
  },
  {
    id: "learn",
    lead: "Right now, I'm combining agentic AI workflows with solid engineering",
    illustration: "plane",
    body: "shipping with React, Next.js, React Native, Flutter, TypeScript, and PostgreSQL — and open to software engineering roles or product partnerships.",
  },
];

export const footerConfig: FooterConfig = {
  quote: "Carve that warmth into me.",
  attribution: "Vinland Saga",
  credit: "Crafted by Chandler King · Kansas City, MO",
  artwork: {
    src: "/images/footer-pine-forest.webp",
    width: 1264,
    height: 600,
  },
};

export const siteConfig: PortfolioConfig = {
  meta: {
    url: SITE.url,
    title: "Chandler King — Software Engineer & Founder in Kansas City",
    titleTemplate: "%s · Chandler King",
    shortTitle: "Chandler King",
    description:
      "Chandler King — Software Engineer & Founder in Kansas City. Full-stack and mobile development with React, Next.js, React Native, and TypeScript. Founder of Sozo Tech Enterprise, builder of The Sozo CRM and AnglerIQ.",
    keywords: [
      "Chandler King",
      "software engineer",
      "full-stack engineer",
      "mobile developer",
      "React",
      "Next.js",
      "React Native",
      "TypeScript",
      "AI engineer",
      "Kansas City",
      "Sozo Tech Enterprise",
    ],
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    classification: "Portfolio",
    category: "technology",
    locale: "en_US",
    ogImage: {
      url: SITE.avatar,
      width: 800,
      height: 800,
      alt: `${SITE.name} — Software Engineer & Founder`,
    },
    twitterCreator: "@chandlerking",
    icon: "/icon",
    appleIcon: "/apple-icon",
    googleVerification: "",
  },
  personal: {
    fullName: SITE.name,
    firstName: "Chandler",
    avatar: {
      src: "/images/chandler-walking-sticker.webp",
      alt: "Line-art sticker of Chandler walking with a coffee cup and backpack",
      fallback: SITE.initials,
    },
    location: {
      label: OVERVIEW.location,
      timeZone: OVERVIEW.timeZone,
    },
    githubUsername: SITE.github.username,
  },
  sectionOrder: [
    "projects",
    "socials",
    "skills",
    "about",
    "experience",
    "workflow",
    "github",
    "testimonials",
    "bookshelf",
  ],
  sectionFlags: {
    projects: true,
    socials: true,
    components: false,
    skills: true,
    about: true,
    experience: true,
    services: false,
    workflow: true,
    github: true,
    testimonials: true,
    bookshelf: true,
    bookmarks: false,
    certifications: false,
    sponsors: false,
    contact: false,
  },
  banner: {
    imageSrc: "/images/profile-banner-cutout.webp",
    imageAlt: "Paper cutouts of a keyboard, notebook, paper plane, and coffee cup",
    openSourceUrl: "https://github.com/kingct19/C.King",
    openSourceTooltip: "View portfolio source on GitHub",
    themeToggleLabel: "Toggle theme",
    themeShortcut: "D",
    themeTooltip: "Toggle theme",
    switchAudioSrc: "/switch.mp3",
  },
  about: {
    title: "Hello there !",
    body: aboutItems.map(({ lead, body }) => `${lead} ${body}`).join(" "),
  },
  services: {
    title: "What I build at Sozo Tech",
    items: [
      "Full-stack SaaS & CRM platforms with Next.js, TypeScript, PostgreSQL, and clean product architecture.",
      "AI-native mobile apps with React Native, Flutter, on-device computer vision, and location intelligence.",
      "Launch sites, growth builds, and 4–6 week MVP sprints for Kansas City founders and businesses.",
    ],
  },
  workflow: {
    title: "How I run a project",
    items: [
      {
        label: "Scope",
        description:
          "We start with a free 30-minute scoping call, agree on one core workflow, fixed deliverables, and clear milestones.",
        icon: "scope",
      },
      {
        label: "Communication",
        description:
          "Short async updates, working staging demos, and direct communication with me and the Sozo Tech engineering team.",
        icon: "communication",
      },
      {
        label: "Handoff & Scale",
        description:
          "Clean production code, deployment pipelines, and optional ongoing Care Plans after launch.",
        icon: "handoff",
      },
    ],
  },
  contact: {
    title: "Let's build something together",
    description:
      "Hiring a full-stack / mobile / AI engineer, or looking to partner with Sozo Tech Enterprise on a new build?",
    pricing: [
      {
        label: "Launch Site",
        value: "from $3,500",
        note: "5-page mobile-first site, contact/booking ready, ~2-week delivery.",
      },
      {
        label: "Growth Build",
        value: "from $8,500",
        note: "Custom web app with CRM, payments, scheduling, and analytics integrations.",
      },
      {
        label: "MVP Sprint",
        value: "from $20,000",
        note: "Clickable web or mobile product in 4–6 weeks with AI features.",
      },
    ],
    channels: socialsConfig,
  },
  bookmarks: {
    title: "Bookmarks",
    items: [],
  },
  certifications: {
    title: "Certificates",
    items: [],
  },
};
