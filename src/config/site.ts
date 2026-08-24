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
  email: "chandler@thesozotech.com",
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
  { name: "Mail", href: "mailto:chandler@thesozotech.com" },
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
    previewImage: "/images/angleriq-preview.png",
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
        title: "Founder & Lead Software Engineer",
        employmentPeriod: { start: "01.2025" },
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
        employmentPeriod: { start: "01.2024", end: "12.2024" },
        employmentType: "Full-time",
        description:
          "- Owned technology for a solar energy company while completing my B.S. in Computer Science.\n- Designed, built, and launched the company website (elevate-solar.com) to support sales and lead generation.\n- Built an internal facial recognition application using computer vision.\n- Managed the company's software tooling and infrastructure.",
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

export const CALENDLY_URL = "https://calendly.com/chandler-thesozotech/sozo-tech";

export const SERVICES_PAGE = {
  meta: {
    title: "Services",
    description:
      "Sozo Tech builds websites and apps for Kansas City businesses and startups. Launch sites, growth builds, and MVP sprints — book a free 30-minute scoping call.",
  },
  hero: {
    headline: "Websites and apps that bring Kansas City businesses customers",
    subhead:
      "Plain-English builds for local owners and founders — from a launch-ready site to a first product customers can use.",
    cta: { label: "Book a free 30-minute scoping call", href: CALENDLY_URL },
  },
  offers: [
    {
      title: "Launch Site",
      price: "from $3,500",
      audience: "For small businesses",
      points: [
        "5-page mobile-first site",
        "Contact or booking ready",
        "Local SEO basics",
        "About 2-week delivery",
      ],
    },
    {
      title: "Growth Build",
      price: "from $8,500",
      audience: "For established businesses",
      points: [
        "Custom site or web app",
        "Integrations (CRM, payments, scheduling)",
        "Analytics so you can see what's working",
      ],
    },
    {
      title: "MVP Sprint",
      price: "from $20,000",
      audience: "For startups",
      points: [
        "Clickable product in 4–6 weeks",
        "Web or mobile",
        "AI features where they add real value",
      ],
    },
  ],
  carePlan: {
    title: "Care Plan",
    price: "$150–400/mo",
    description:
      "Hosting, updates, small edits, and a short monthly report so your site or app stays current without you chasing a developer.",
  },
  caseStudies: [
    {
      title: "elevate-solar.com",
      framing: "Built to generate leads for a local business",
      summary:
        "Marketing site for Elevate Solar — fast, clear, and aimed at turning visitors into sales conversations.",
      href: "https://www.elevate-solar.com",
    },
    {
      title: "The Sozo CRM",
      framing: "We ship real products, not just sites",
      summary:
        "Customer relationship platform built from zero to production — the kind of product work we bring to founders and growing teams.",
      href: SOZO.crmUrl,
    },
  ],
  faq: [
    {
      q: "How long does a project take?",
      a: "Launch Site is typically about two weeks. Growth Builds vary with scope. MVP Sprints land a usable product in four to six weeks.",
    },
    {
      q: "What's the process?",
      a: "We start with a free 30-minute scoping call, agree on goals and budget, then design, build, review together, and launch.",
    },
    {
      q: "What do you need from me?",
      a: "Your goals, brand basics (logo and colors if you have them), content or rough notes, and examples of sites or apps you like. We'll fill gaps together.",
    },
    {
      q: "How does payment work?",
      a: "Typically a deposit to start, then the balance at launch. Care Plan is billed monthly. We'll confirm terms in writing before work begins.",
    },
  ],
  closingCta: {
    headline: "Ready to talk through your project?",
    subhead: "Book a free 30-minute scoping call — no pitch deck required.",
    cta: { label: "Book a free 30-minute scoping call", href: CALENDLY_URL },
  },
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
