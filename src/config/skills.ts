import type { SkillCategoryConfig, SkillItem } from "@/config/types";

export const skillsSectionConfig = {
  title: "Stack",
  categories: [
    { id: "language", label: "Language" },
    { id: "frontend", label: "Frontend & Mobile" },
    { id: "backend", label: "Backend & Data" },
    { id: "workflow-ai", label: "Workflow & AI" },
  ] as SkillCategoryConfig[],
};

export const skillsConfig: SkillItem[] = [
  // Language
  {
    id: "typescript",
    name: "TypeScript",
    icon: "typescript",
    category: "language",
    order: 1,
    enabled: true,
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "javascript",
    category: "language",
    order: 2,
    enabled: true,
  },
  {
    id: "python",
    name: "Python",
    icon: "ai-sdk",
    category: "language",
    order: 3,
    enabled: true,
  },
  {
    id: "dart",
    name: "Dart",
    icon: "tanstack",
    category: "language",
    order: 4,
    enabled: true,
  },

  // Frontend & Mobile
  {
    id: "nextjs",
    name: "Next.js",
    icon: "nextjs",
    category: "frontend",
    order: 5,
    enabled: true,
  },
  {
    id: "react",
    name: "React",
    icon: "react",
    category: "frontend",
    order: 6,
    enabled: true,
  },
  {
    id: "react-native",
    name: "React Native",
    icon: "react",
    category: "frontend",
    order: 7,
    enabled: true,
  },
  {
    id: "flutter",
    name: "Flutter",
    icon: "tanstack",
    category: "frontend",
    order: 8,
    enabled: true,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: "tailwind",
    category: "frontend",
    order: 9,
    enabled: true,
  },
  {
    id: "shadcn",
    name: "shadcn/ui",
    icon: "shadcn",
    category: "frontend",
    order: 10,
    enabled: true,
  },

  // Backend & Data
  {
    id: "nodejs",
    name: "Node.js",
    icon: "trpc",
    category: "backend",
    order: 11,
    enabled: true,
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    icon: "prisma",
    category: "backend",
    order: 12,
    enabled: true,
  },
  {
    id: "supabase",
    name: "Supabase",
    icon: "better-auth",
    category: "backend",
    order: 13,
    enabled: true,
  },

  // Workflow & AI
  {
    id: "cursor",
    name: "Cursor",
    icon: "cursor",
    category: "workflow-ai",
    order: 14,
    enabled: true,
  },
  {
    id: "ai-sdk",
    name: "AI SDK",
    icon: "ai-sdk",
    category: "workflow-ai",
    order: 15,
    enabled: true,
  },
  {
    id: "claude",
    name: "Claude / LLMs",
    icon: "claude",
    category: "workflow-ai",
    order: 16,
    enabled: true,
  },
];
