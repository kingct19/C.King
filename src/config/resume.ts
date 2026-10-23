import { SOZO } from "@/config/site";

export const RESUME_HEADLINE = "Forward Deployed Engineer · Software Engineer & Founder";

export const RESUME_SUMMARY =
  "Forward Deployed Engineer and founder in Kansas City, Missouri with a B.S. and M.S. in Computer Science (AI concentration). Strong technical aptitude and problem-solving ability: I work directly with clients, translate ambiguous business problems into solution design, and own technical delivery from discovery through prototype, pilot, and deployment. Hands-on with Python, JavaScript, TypeScript, SQL, APIs, npm, Docker, Linux, CI/CD, and databases. I use LLMs and AI-assisted development for coding, debugging, troubleshooting, research, technical documentation, and automation. Shipped The Sozo CRM and AnglerIQ; comfortable with consulting, solution engineering, product engineering, presentations, and client walkthroughs.";

export const RESUME_EXPERIENCE = [
  {
    id: "sozo-founder",
    title: "Founder & Lead Software Engineer",
    company: SOZO.name,
    href: SOZO.url,
    location: "Kansas City, Missouri, USA",
    period: { start: "01.2026" },
    type: "Full-time",
    bullets: [
      "Own consulting-style discovery and solution engineering with clients: map business systems, workflows, and operating constraints, then turn them into solution design, implementation plans, and technical delivery tasks.",
      "Shipped The Sozo CRM — a customer-facing business system — from a blank repo to production (thesozocrm.com): dashboards, analytics, auth, REST APIs, integrations, PostgreSQL, MongoDB, TypeScript, JavaScript, npm-based tooling, Next.js, Docker, Linux environments, and CI/CD (GitHub Actions / Vercel) with build systems and release readiness.",
      "Lead product engineering on AnglerIQ, an AI-native mobile product: React Native, computer vision, APIs, data flows, and LLM-powered agentic workflows; prototype demos, proof-of-concepts, and automation for field use.",
      "Use LLMs daily to accelerate coding, debugging, research, workflow design, and solution prototyping; write technical documentation, process maps, presentations, and walkthrough materials for clients and the internal team.",
      "Troubleshoot issues across applications, APIs, data flows, integrations, containers, prompts, and user workflows; apply security basics and credential handling for production-readiness.",
      "Run a team of 3 developers — roadmap, sprint planning, code review, deployment coordination, testing, and artifact handling — while shipping 2 production products and client automation.",
    ],
    skills: [
      "LLMs",
      "Solution design",
      "TypeScript",
      "Python",
      "Docker",
      "CI/CD",
      "APIs",
    ],
  },
  {
    id: "solar-head",
    title: "Head of Technology",
    company: "Elevate Solar",
    href: "https://www.elevate-solar.com",
    location: "United States",
    period: { start: "01.2025", end: "01.2026" },
    type: "Full-time",
    bullets: [
      "Full-time technical delivery for a solar business: worked with operators to understand goals, pain points, and business systems, then built working software instead of slideware.",
      "Designed, built, and launched elevate-solar.com as an internal-tools-adjacent, conversion-focused site — presentations of the offer, analytics-ready structure, and automation for lead capture.",
      "Built an internal facial-recognition application with computer vision; documented the solution design, process maps, and implementation notes for non-technical staff.",
      "Owned Linux / Docker-friendly tooling, CI/CD-style release processes, and troubleshooting across the site, internal tools, integrations, and hosting; applied security basics for credentials and production-readiness.",
    ],
    skills: [
      "Internal tools",
      "Automation",
      "Troubleshooting",
      "Technical documentation",
      "Next.js",
    ],
  },
] as const;

export const RESUME_EDUCATION = [
  {
    id: "edu-ms",
    title: "M.S. Computer Science — AI Concentration",
    school: "Texas A&M University–Commerce",
    period: { start: "01.2024", end: "05.2026" },
    bullets: [
      "Graduate research in artificial intelligence, machine learning, and intelligent systems; Jupyter notebooks, data exploration, analytics, and LLM-powered experiments.",
      "Apply research to product engineering: retrieval workflows, embeddings, and applied AI prototypes alongside shipped Sozo products.",
    ],
  },
  {
    id: "edu-bs",
    title: "B.S. Computer Science — AI Concentration",
    school: "Texas A&M University–Commerce",
    period: { start: "08.2019", end: "12.2023" },
    bullets: [
      "AI-focused undergraduate curriculum (Python, JavaScript, SQL, algorithms) completed while competing as a Division I student-athlete — ownership, reliability, and learning speed under pressure.",
      "Southland Conference Spring Commissioner's Honor Roll; capstone-scale delivery including the ETAMU All-in-One campus app (91+ commits, demo, and notebook).",
    ],
  },
] as const;

export const RESUME_PROJECTS = [
  {
    name: "AnglerIQ",
    period: "2026 — present",
    href: "https://www.angleriqapp.com",
    caseStudy: "/projects/angleriq",
    summary:
      "Your AI Co-Angler — AI-ranked fishing zones, bite scores, tournaments, species rankings, and a private catch log.",
    bullets: [
      "Solution design and technical delivery for an AI-native outdoor app: React Native, TypeScript, Claude AI, APIs, and location intelligence.",
      "Prototype and ship LLM-powered zone rankings, bite forecasts, and tournament leaderboards with private user catch coordinates.",
    ],
    tags: ["Claude AI", "React Native", "TypeScript", "Next.js", "Mobile"],
  },
  {
    name: "Studio Sozo",
    period: "2026 — present",
    href: "https://studiosozo.vercel.app",
    caseStudy: "/projects/studio-sozo",
    summary:
      "Custom software studio platform building 100% client-owned web apps, bespoke CRMs, mobile apps, and AI workflow automations.",
    bullets: [
      "Full-stack platform and client delivery engine for custom CRMs, Stripe/QuickBooks/Twilio webhook integrations, and AI automation pipelines.",
      "Delivered regional platforms including Home Ranger Services (homerangerservices.com), Splash & Dash (splashanddashrents.com), and Serene Dreams.",
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "AI Automation", "Webhooks"],
  },
  {
    name: "The Sozo CRM",
    period: "2025 — present",
    href: SOZO.crmUrl,
    caseStudy: "/projects/the-sozo-crm",
    summary:
      "Full-stack solar CRM and business system shipped from zero to production — dashboards, analytics, APIs, and sales pipeline automation.",
    bullets: [
      "Product engineering end to end: Next.js, TypeScript, PostgreSQL, REST APIs, role-based access control, and CI/CD on Vercel and GitHub Actions.",
      "Process maps and technical documentation for sales and installer workflows from lead intake through close.",
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "CRM", "CI/CD"],
  },
  {
    name: "elevate-solar.com",
    period: "2025 — 2026",
    href: "https://www.elevate-solar.com",
    caseStudy: "/projects/elevate-solar",
    summary:
      "Lead-generation site and internal-tools work for Elevate Solar — analytics, automation, and computer-vision internal tooling.",
    bullets: [
      "Owned digital transformation as Head of Technology: public lead-gen platform, internal tools, and a computer-vision facial recognition app.",
    ],
    tags: ["Next.js", "TypeScript", "Computer Vision", "Internal tools"],
  },
] as const;

/** Resume-only stack — includes Jobscan phrases that match real work or active learning. */
export const RESUME_STACK: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "Dart"],
  },
  {
    label: "Frontend & tooling",
    items: ["React", "Next.js", "React Native", "npm", "Flutter", "Tailwind CSS"],
  },
  {
    label: "Backend, data & APIs",
    items: ["Node.js", "APIs", "PostgreSQL", "MongoDB", "SQL", "Firebase", "Supabase"],
  },
  {
    label: "AI, LLMs & automation",
    items: [
      "LLMs",
      "AI agents",
      "Automation",
      "Jupyter",
      "Computer Vision",
      "Cursor",
    ],
  },
  {
    label: "Delivery & environments",
    items: [
      "Docker",
      "Linux",
      "CI/CD",
      "Build systems",
      "GitHub Actions",
      "Vercel",
      "Security basics",
    ],
  },
  {
    label: "Learning next",
    items: [
      "Rust",
      "WASM",
      "Redis",
      "Qdrant",
      "Neo4j",
      "TerminusDB",
      "RAG systems",
      "Embeddings",
      "Vector databases",
      "Graph databases",
    ],
  },
];
