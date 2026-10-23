import type { ExperienceItem } from "@/config/types";

export const experienceSectionConfig = {
  title: "Experience",
};

export const experienceConfig: ExperienceItem[] = [
  {
    id: "sozo-tech",
    role: "Founder & Lead Software Engineer",
    company: "Studio Sozo / Sozo Tech Enterprise",
    companyUrl: "https://www.studiosozo.dev",
    period: "2026 — Present",
    summary:
      "Founded an investor-backed software company leading product, architecture, and engineering across web, mobile, and AI.",
    highlights: [
      "Shipped The Sozo CRM (thesozocrm.com), Studio Sozo, Home Ranger Services, and Splash & Dash to production",
      "Building AnglerIQ (angleriqapp.com), an AI-powered fishing companion, with React Native and Claude AI",
      "Manage a team of 3 developers — roadmap, sprint planning, code review, and releases",
    ],
    skills: ["TypeScript", "Next.js", "React Native", "PostgreSQL", "AI/ML", "Team Leadership"],
    order: 1,
    enabled: true,
  },
  {
    id: "elevate-solar",
    role: "Head of Technology",
    company: "Elevate Solar",
    companyUrl: "https://www.elevate-solar.com",
    period: "2025 — 2026",
    summary:
      "Owned technology for a solar energy company while completing my M.S. in Computer Science.",
    highlights: [
      "Designed, built, and launched elevate-solar.com to support sales and lead generation",
      "Built an internal facial recognition application using computer vision",
      "Managed the company's software tooling and infrastructure",
    ],
    skills: ["Full-Stack Development", "Next.js", "TypeScript", "Computer Vision"],
    order: 2,
    enabled: true,
  },
  {
    id: "tamuc-education",
    role: "M.S. & B.S. Computer Science (AI Concentration) · NCAA Student-Athlete",
    company: "Texas A&M University–Commerce",
    companyUrl: "https://www.tamuc.edu",
    period: "2019 — 2026",
    summary:
      "Graduate and undergraduate Computer Science degrees with an Artificial Intelligence concentration while competing as a collegiate track & field athlete.",
    highlights: [
      "M.S. Computer Science — AI Concentration (2024 — 2026)",
      "B.S. Computer Science — AI Concentration · Collegiate Student-Athlete (2019 — 2023)",
    ],
    skills: ["Artificial Intelligence", "Machine Learning", "Algorithms", "Leadership"],
    order: 3,
    enabled: true,
  },
];
