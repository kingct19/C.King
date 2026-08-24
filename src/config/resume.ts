import { SOZO } from "@/config/site";

export const RESUME_SUMMARY =
  "Software engineer in Kansas City, Missouri with a B.S. and M.S. in Computer Science (AI concentration). I founded Sozo Tech Enterprise and lead product, architecture, and a team of 3 — shipping The Sozo CRM to production and building AnglerIQ, an AI-powered mobile fish finder. Full-stack across React, Next.js, React Native, and PostgreSQL, with computer vision and agentic engineering in the day-to-day. Before Sozo I owned technology at Elevate Solar, including the public site and an internal facial-recognition tool.";

export const RESUME_EXPERIENCE = [
  {
    id: "sozo-founder",
    title: "Founder & Lead Software Engineer",
    company: SOZO.name,
    href: SOZO.url,
    period: { start: "01.2025" },
    type: "Full-time",
    bullets: [
      "Founded an investor-backed software company; own product, architecture, and engineering across web and mobile.",
      "Shipped The Sozo CRM from a blank repo to production at thesozocrm.com — dashboards, records, auth, APIs, and PostgreSQL on Next.js and TypeScript.",
      "Leading AnglerIQ, an AI-native fish finder: React Native architecture, computer vision, and location-aware features built for field use.",
      "Run a team of 3 developers — roadmap, sprint planning, code review, and releases — while taking on client web and mobile builds.",
    ],
    skills: [
      "TypeScript",
      "Next.js",
      "React Native",
      "PostgreSQL",
      "AI/ML",
      "Team Leadership",
    ],
  },
  {
    id: "solar-head",
    title: "Head of Technology",
    company: "Elevate Solar",
    href: "https://www.elevate-solar.com",
    period: { start: "01.2024", end: "12.2024" },
    type: "Full-time",
    bullets: [
      "Owned technology for a solar company while finishing a B.S. in Computer Science — site, internal tools, and infrastructure.",
      "Designed, built, and launched elevate-solar.com as a conversion-focused marketing site for local solar sales.",
      "Built an internal facial-recognition application with computer vision for company operations.",
      "Set up and maintained the company's software tooling, hosting, and delivery pipeline.",
    ],
    skills: ["Next.js", "TypeScript", "Computer Vision", "Technical Leadership"],
  },
] as const;

export const RESUME_EDUCATION = [
  {
    id: "edu-ms",
    title: "M.S. Computer Science — AI Concentration",
    school: "Texas A&M University–Commerce",
    period: { start: "08.2025", end: "05.2026" },
    bullets: [
      "Graduate coursework in artificial intelligence, machine learning, and intelligent systems.",
      "Applying AI concepts to capstone and product-oriented research alongside shipped products at Sozo.",
    ],
  },
  {
    id: "edu-bs",
    title: "B.S. Computer Science — AI Concentration",
    school: "Texas A&M University–Commerce",
    period: { start: "08.2021", end: "05.2025" },
    bullets: [
      "AI-focused undergraduate curriculum completed while competing as a Division I student-athlete (sprints and horizontal jumps).",
      "Southland Conference Spring Commissioner's Honor Roll as a Computer Science major.",
    ],
  },
] as const;

export const RESUME_PROJECTS = [
  {
    name: "AnglerIQ",
    period: "2025 — present",
    caseStudy: "/projects/angleriq",
    summary:
      "AI-first mobile fish finder — on-device intelligence and location-aware features that help anglers read fish patterns in the field.",
    bullets: [
      "Leading product direction and mobile architecture for an AI-native outdoor app on React Native and TypeScript.",
      "Computer vision and location features designed for real use on the water, not a demo environment.",
      "Coordinating a cross-functional team through design, build, and release.",
    ],
    tags: ["React Native", "TypeScript", "Computer Vision", "AI/ML", "Mobile"],
  },
  {
    name: "The Sozo CRM",
    period: "2024 — present",
    href: SOZO.crmUrl,
    caseStudy: "/projects/the-sozo-crm",
    summary:
      "Sozo Tech Enterprise's first product — a full-stack CRM shipped from zero to a live SaaS at thesozocrm.com.",
    bullets: [
      "Owned architecture, build, and launch: Next.js, TypeScript, PostgreSQL, auth, and deployment.",
      "Sales and client workflows — dashboards, records, and follow-up — rather than a generic admin shell.",
      "Became the foundation for Sozo's later products and client software.",
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "SaaS", "CRM"],
  },
  {
    name: "Family Tracking & Management App",
    period: "2024 — 2025",
    href: "https://github.com/kingct19/Family-Tracking-and-Management-App",
    caseStudy: "/projects/family-tracking",
    summary:
      "Full-stack family locator and safety platform — real-time location, tasks, rewards, and messaging.",
    bullets: [
      "Role-based access so the right people see the right location and task data.",
      "Landing experience plus a mobile-responsive product UI built for everyday family use.",
      "React frontend with a Node.js and PostgreSQL backend.",
    ],
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    name: "ETAMU All-in-One",
    period: "Campus app",
    href: "https://github.com/kingct19/ETAMU-All-in-One",
    caseStudy: "/projects/etamu-all-in-one",
    summary:
      "Cross-platform campus app for Texas A&M University–Commerce — student resources and workflows in one Flutter app.",
    bullets: [
      "Single Flutter/Dart codebase shipping to iOS and Android.",
      "Centralized campus tools aimed at everyday student workflows.",
      "Capstone-scale delivery: 91+ commits, demo video, and notebook in the repo.",
    ],
    tags: ["Flutter", "Dart", "iOS", "Android"],
  },
  {
    name: "elevate-solar.com",
    period: "2024",
    href: "https://www.elevate-solar.com",
    caseStudy: "/projects/elevate-solar",
    summary:
      "Marketing and lead-generation site for Elevate Solar, built as Head of Technology.",
    bullets: [
      "Designed and launched the public site — clear story, fast load, mobile-ready.",
      "Sales-oriented structure and calls to action for local solar conversations.",
      "Delivered next to internal tools and a computer-vision facial-recognition app.",
    ],
    tags: ["Next.js", "TypeScript", "Web"],
  },
] as const;
