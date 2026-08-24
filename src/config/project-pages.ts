import { SOZO } from "@/config/site";

export type ProjectFeature = {
  title: string;
  description: string;
  /** lucide icon name used by the project page renderer */
  icon: "rocket" | "code" | "smartphone" | "users" | "chart" | "globe" | "shield" | "sparkles";
  /** Optional image for the sticky panel; falls back to project preview */
  image?: string;
};

export type ProjectPage = {
  slug: string;
  title: string;
  period: string;
  summary: string;
  href?: string;
  previewImage?: string;
  tags: string[];
  heading: string;
  subheading: string;
  features: ProjectFeature[];
};

export const PROJECT_PAGES: ProjectPage[] = [
  {
    slug: "angleriq",
    title: "AnglerIQ",
    period: "2025 — present",
    summary:
      "AI-first mobile fish finder — helping anglers locate and understand fish patterns with on-device intelligence and real-time insights.",
    previewImage: "/images/angleriq-preview.png",
    tags: ["React Native", "AI/ML", "Computer Vision", "TypeScript", "Mobile"],
    heading: "AnglerIQ",
    subheading:
      "An AI-native outdoor app that turns field conditions into clear fishing insight — built for real use on the water.",
    features: [
      {
        icon: "smartphone",
        title: "Built for the field",
        description:
          "Mobile-first architecture tuned for outdoor use — fast, focused, and ready when conditions change.",
        image: "/images/angleriq-preview.png",
      },
      {
        icon: "sparkles",
        title: "On-device intelligence",
        description:
          "Computer vision and location-aware features that help anglers understand fish patterns without leaving the shoreline.",
        image: "/images/angleriq-preview.png",
      },
      {
        icon: "users",
        title: "Product + team leadership",
        description:
          "Direction, architecture, and delivery across a cross-functional team — from design through release.",
        image: "/images/angleriq-preview.png",
      },
    ],
  },
  {
    slug: "the-sozo-crm",
    title: "The Sozo CRM",
    period: "2024 — present",
    summary:
      "Customer relationship platform built at Sozo Tech Enterprise — the company's first product, shipped from zero to production.",
    href: SOZO.crmUrl,
    previewImage: "/images/the-sozo-crm-preview.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "CRM", "SaaS"],
    heading: "The Sozo CRM",
    subheading:
      "A full-stack CRM designed for modern sales and client workflows — from blank repo to production at thesozocrm.com.",
    features: [
      {
        icon: "rocket",
        title: "Zero to production",
        description:
          "Shipped The Sozo CRM as Sozo Tech Enterprise's first product — architecture, build, and launch owned end to end.",
        image: "/images/the-sozo-crm-preview.png",
      },
      {
        icon: "users",
        title: "Sales and client workflows",
        description:
          "Dashboards, records, and flows built for how teams actually sell and follow up — not a generic admin shell.",
        image: "/images/the-sozo-crm-preview.png",
      },
      {
        icon: "code",
        title: "Foundation for the stack",
        description:
          "Next.js, TypeScript, and PostgreSQL as the base for Sozo's client and product ecosystem going forward.",
        image: "/images/the-sozo-crm-preview.png",
      },
    ],
  },
  {
    slug: "elevate-solar",
    title: "elevate-solar.com",
    period: "2024",
    summary:
      "Marketing and lead-generation website for Elevate Solar — the solar company where I served as Head of Technology.",
    href: "https://www.elevate-solar.com",
    previewImage: "/images/elevate-solar-preview.png",
    tags: ["Next.js", "Web Development", "Solar", "TypeScript"],
    heading: "elevate-solar.com",
    subheading:
      "A conversion-focused marketing site built to turn local interest into solar sales conversations.",
    features: [
      {
        icon: "globe",
        title: "Public brand presence",
        description:
          "Designed and launched the company website as Head of Technology — clear story, fast load, mobile-ready.",
        image: "/images/elevate-solar-preview.png",
      },
      {
        icon: "chart",
        title: "Built to generate leads",
        description:
          "Sales-oriented structure and calls to action aimed at turning visitors into conversations for the local solar team.",
        image: "/images/elevate-solar-preview.png",
      },
      {
        icon: "code",
        title: "Part of a wider tech role",
        description:
          "Delivered alongside internal tools and AI initiatives — the site was one piece of owning Elevate Solar's technology.",
        image: "/images/elevate-solar-preview.png",
      },
    ],
  },
  {
    slug: "family-tracking",
    title: "Family Tracking & Management App",
    period: "2024 — 2025",
    summary:
      "Full-stack family locator and safety platform — real-time location, tasks, rewards, and messaging to keep loved ones connected.",
    href: "https://github.com/kingct19/Family-Tracking-and-Management-App",
    previewImage: "/images/family-tracking-preview.png",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "Mobile"],
    heading: "Family Tracking App",
    subheading:
      "A full-stack safety and coordination platform — location, tasks, rewards, and messaging for everyday family life.",
    features: [
      {
        icon: "globe",
        title: "Landing + product surface",
        description:
          "HaloHub-style marketing experience paired with the coordination features families need day to day.",
        image: "/images/family-tracking-preview.png",
      },
      {
        icon: "shield",
        title: "Safety and access control",
        description:
          "Role-based access with real-time location and task management so the right people see the right information.",
        image: "/images/family-tracking-preview.png",
      },
      {
        icon: "smartphone",
        title: "Built for everyday use",
        description:
          "Mobile-responsive UI designed for parents and families — clear, quick, and usable without training.",
        image: "/images/family-tracking-preview.png",
      },
    ],
  },
  {
    slug: "etamu-all-in-one",
    title: "ETAMU All-in-One",
    period: "Campus app",
    summary:
      "All-in-one mobile app for Texas A&M University–Commerce — campus resources, tools, and student workflows in one Flutter app.",
    href: "https://github.com/kingct19/ETAMU-All-in-One",
    previewImage: "/images/etamu-all-in-one-preview.png",
    tags: ["Flutter", "Dart", "Mobile"],
    heading: "ETAMU All-in-One",
    subheading:
      "Campus resources and student workflows in a single cross-platform Flutter app for the ETAMU community.",
    features: [
      {
        icon: "smartphone",
        title: "Cross-platform mobile",
        description:
          "Built with Flutter and Dart so students get one experience on iOS and Android.",
        image: "/images/etamu-all-in-one-preview.png",
      },
      {
        icon: "users",
        title: "Student-facing features",
        description:
          "Centralized campus tools and resources aimed at everyday student workflows.",
        image: "/images/etamu-all-in-one-preview.png",
      },
      {
        icon: "code",
        title: "Capstone-scale delivery",
        description:
          "91+ commits with demo video and notebook in the repo — real shipping practice, not a throwaway prototype.",
        image: "/images/etamu-all-in-one-preview.png",
      },
    ],
  },
  {
    slug: "chandlerking-dev",
    title: "chandlerking.dev",
    period: "Portfolio",
    summary:
      "This portfolio — a fast, accessible single-page site with live GitHub project sync and contribution graph.",
    href: "https://chandlerking.dev",
    previewImage: "/images/chandler-king-headshot.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    heading: "chandlerking.dev",
    subheading:
      "A fast, accessible personal site with live GitHub sync — the same codebase you're looking at now.",
    features: [
      {
        icon: "globe",
        title: "App Router + ISR",
        description:
          "Next.js App Router with ISR-cached GitHub data so projects stay fresh without a heavy CMS.",
      },
      {
        icon: "sparkles",
        title: "Brand-aligned system",
        description:
          "Light and dark themes, typography, and motion tuned to a clean personal brand — not a generic template.",
      },
      {
        icon: "code",
        title: "Curated + live pins",
        description:
          "Pinned project curation enriched with live GitHub metadata when available.",
      },
    ],
  },
];

export function getProjectPage(slug: string): ProjectPage | undefined {
  return PROJECT_PAGES.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECT_PAGES.map((project) => project.slug);
}

/** Map homepage project titles to detail page slugs. */
export const PROJECT_TITLE_TO_SLUG: Record<string, string> = {
  AnglerIQ: "angleriq",
  "The Sozo CRM": "the-sozo-crm",
  "elevate-solar.com": "elevate-solar",
  "Family Tracking & Management App": "family-tracking",
  "ETAMU All-in-One": "etamu-all-in-one",
  "chandlerking.dev": "chandlerking-dev",
};

export function getProjectPageHref(title: string): string | undefined {
  const slug = PROJECT_TITLE_TO_SLUG[title];
  return slug ? `/projects/${slug}` : undefined;
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Rough publish dates for case study bylines. */
const PROJECT_DATES: Record<string, string> = {
  angleriq: "2025-06-01",
  "the-sozo-crm": "2024-11-01",
  "elevate-solar": "2024-06-01",
  "family-tracking": "2025-02-01",
  "etamu-all-in-one": "2024-05-01",
  "chandlerking-dev": "2025-08-01",
};

/** Build markdown + TOC for the blog-style case study layout. */
export function getProjectBlogContent(project: ProjectPage): {
  content: string;
  toc: { title: string; href: string }[];
  date: string;
} {
  const toc: { title: string; href: string }[] = [
    { title: "Overview", href: "#overview" },
  ];

  const sections: string[] = [
    `## Overview\n\n${project.subheading}\n\n${project.summary}`,
  ];

  for (const feature of project.features) {
    toc.push({
      title: feature.title,
      href: `#${slugifyHeading(feature.title)}`,
    });

    sections.push(`## ${feature.title}\n\n${feature.description}`);
  }

  toc.push({ title: "Stack", href: "#stack" });
  sections.push(
    `## Stack\n\n${project.tags.map((tag) => `- ${tag}`).join("\n")}`
  );

  if (project.href) {
    toc.push({ title: "Links", href: "#links" });
    sections.push(
      `## Links\n\n- [Visit ${project.title}](${project.href})\n- [Book a scoping call](https://calendly.com/chandler-thesozotech/sozo-tech)`
    );
  }

  return {
    content: sections.join("\n\n"),
    toc,
    date: PROJECT_DATES[project.slug] ?? "2025-01-01",
  };
}
