export type ProjectFeature = {
  title: string;
  description: string;
  icon: "rocket" | "code" | "smartphone" | "users" | "chart" | "globe" | "shield" | "sparkles";
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
    period: "2026",
    summary:
      "Your AI Co-Angler — tournaments, species rankings, AI-mapped fishing zones, bite scores, regulations, and a private catch log.",
    href: "https://www.angleriqapp.com",
    previewImage: "/images/projects/angleriq.webp",
    tags: ["React Native", "Claude AI", "Next.js", "TypeScript", "Mobile"],
    heading: "AnglerIQ",
    subheading:
      "Open a lake and AnglerIQ maps the water by species, ranks starting zones, and keeps your exact catch coordinates private.",
    features: [
      {
        icon: "sparkles",
        title: "AI-Ranked Fishing Zones",
        description:
          "Powered by Claude, AnglerIQ ranks starting zones on the water you opened and calculates bite scores from weather, barometric pressure, and time of day.",
        image: "/images/projects/angleriq.webp",
      },
      {
        icon: "shield",
        title: "Private Catch Log & Smart Competitions",
        description:
          "Enter tournaments with the Species IQ points system while keeping your exact fishing coordinates 100% private.",
        image: "/images/projects/angleriq.webp",
      },
    ],
  },
  {
    slug: "studio-sozo",
    title: "Studio Sozo",
    period: "2026",
    summary:
      "Custom software development, bespoke CRMs, mobile applications, and AI workflow automation that clients own 100% outright.",
    href: "https://studiosozo.vercel.app",
    previewImage: "/images/projects/studio-sozo.webp",
    tags: ["Next.js", "TypeScript", "AI Automation", "PostgreSQL", "CRM"],
    heading: "Studio Sozo",
    subheading:
      "Bespoke software platforms built around real business operations — zero per-seat SaaS rent and full source-code ownership.",
    features: [
      {
        icon: "code",
        title: "Custom Software & CRM Systems",
        description:
          "Role-based workspaces, live quote builders, dispatch boards, and executive P&L dashboards tailored to how teams actually operate.",
        image: "/images/projects/studio-sozo.webp",
      },
      {
        icon: "sparkles",
        title: "AI & Systems Integration",
        description:
          "Two-way webhooks and durable queues connecting Stripe, QuickBooks, Twilio SMS, and AI pipelines into one real-time source of truth.",
        image: "/images/projects/studio-sozo.webp",
      },
    ],
  },
  {
    slug: "the-sozo-crm",
    title: "The Sozo CRM",
    period: "2025",
    summary:
      "Solar CRM software for installers and sales teams — shipped from zero to production at thesozocrm.com.",
    href: "https://www.thesozocrm.com",
    previewImage: "/images/projects/the-sozo-crm.webp",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "CRM", "SaaS"],
    heading: "The Sozo CRM",
    subheading:
      "A full-stack CRM designed for solar sales pipelines, field teams, and client workflows.",
    features: [
      {
        icon: "rocket",
        title: "Zero to Production",
        description:
          "Architected, built, and launched end-to-end as Sozo's flagship SaaS product.",
        image: "/images/projects/the-sozo-crm.webp",
      },
      {
        icon: "users",
        title: "Sales & Installer Workflows",
        description:
          "Lead intake, pipeline tracking, and team dashboards built specifically for high-velocity sales and installation teams.",
        image: "/images/projects/the-sozo-crm.webp",
      },
    ],
  },
  {
    slug: "home-ranger",
    title: "Home Ranger Services",
    period: "2026",
    summary:
      "Residential and light-commercial HVAC platform serving Dallas–Fort Worth and Greater Austin.",
    href: "https://homerangerservices.com",
    previewImage: "/images/projects/home-ranger.webp",
    tags: ["Next.js", "TypeScript", "Local SEO", "Tailwind CSS"],
    heading: "Home Ranger Services",
    subheading:
      "Heating, cooling, and indoor air quality platform built for homeowners and commercial teams across Dallas and Austin.",
    features: [
      {
        icon: "globe",
        title: "Multi-Metro Service Routing",
        description:
          "Dedicated city service pages and interactive coverage across Dallas–Fort Worth and Greater Austin.",
        image: "/images/projects/home-ranger.webp",
      },
      {
        icon: "chart",
        title: "Conversion-Focused Scheduling",
        description:
          "Clear maintenance tiers, transparent service steps, and frictionless lead capture.",
        image: "/images/projects/home-ranger.webp",
      },
    ],
  },
  {
    slug: "splash-and-dash",
    title: "Splash & Dash Rentals",
    period: "2026",
    summary:
      "Premium Yamaha JetBlaster DLX jet ski rental and lake-delivery booking site for Austin's five Highland Lakes.",
    href: "https://splashanddashrents.com",
    previewImage: "/images/projects/splash-and-dash.webp",
    tags: ["Next.js", "TypeScript", "Booking", "Tailwind CSS"],
    heading: "Splash & Dash Rentals",
    subheading:
      "Jet ski rentals delivered directly to Lake LBJ, Inks Lake, Lake Buchanan, Lake Travis, and Lake Austin.",
    features: [
      {
        icon: "globe",
        title: "Five Highland Lakes Coverage",
        description:
          "Interactive ramp pickup and drop-off guides for Lake LBJ, Inks Lake, Lake Buchanan, Lake Travis, and Lake Austin.",
        image: "/images/projects/splash-and-dash.webp",
      },
      {
        icon: "rocket",
        title: "Tiered Ride Booking",
        description:
          "Streamlined 3, 4, 6, and 8-hour booking flows with digital waiver integration.",
        image: "/images/projects/splash-and-dash.webp",
      },
    ],
  },
  {
    slug: "serene-dreams",
    title: "Serene Dreams",
    period: "2025",
    summary:
      "Custom streetwear and apparel e-commerce storefront built for high-impact product drops.",
    href: "https://serenedreams.vercel.app",
    previewImage: "/images/projects/serene-dreams.webp",
    tags: ["Next.js", "TypeScript", "E-Commerce", "Tailwind CSS"],
    heading: "Serene Dreams",
    subheading:
      "Minimalist, fast-loading apparel storefront and lookbook experience.",
    features: [
      {
        icon: "globe",
        title: "Brand-First Storefront",
        description:
          "Custom product showcase and checkout experience tailored to streetwear releases.",
        image: "/images/projects/serene-dreams.webp",
      },
    ],
  },
  {
    slug: "elevate-solar",
    title: "Elevate Solar",
    period: "2025",
    summary:
      "Marketing and lead-generation platform for Elevate Solar — built while serving as Head of Technology.",
    href: "https://www.elevate-solar.com",
    previewImage: "/images/projects/elevate-solar.webp",
    tags: ["Next.js", "Web Development", "Solar", "TypeScript"],
    heading: "elevate-solar.com",
    subheading:
      "A conversion-focused solar platform built to turn homeowner interest into qualified consultations.",
    features: [
      {
        icon: "chart",
        title: "Built to Generate Leads",
        description:
          "Fast, mobile-ready solar education and consultation funnel delivered alongside internal AI and operations tooling.",
        image: "/images/projects/elevate-solar.webp",
      },
    ],
  },
  {
    slug: "family-tracking",
    title: "Family Tracking App (School Project)",
    period: "2024 · School Project",
    summary:
      "University project: full-stack family locator and safety platform with real-time location, tasks, rewards, and messaging.",
    href: "https://github.com/kingct19/Family-Tracking-and-Management-App",
    previewImage: "/images/projects/family-tracking.webp",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "School Project"],
    heading: "Family Tracking App",
    subheading:
      "A full-stack safety and coordination platform built as a university software engineering project.",
    features: [
      {
        icon: "shield",
        title: "Role-Based Family Coordination",
        description:
          "Real-time location sharing, task management, and reward workflows with role-based permissions.",
        image: "/images/projects/family-tracking.webp",
      },
    ],
  },
  {
    slug: "etamu-all-in-one",
    title: "ETAMU All-in-One (School Project)",
    period: "2024 · School Project",
    summary:
      "University capstone project: cross-platform Flutter mobile app for Texas A&M University–Commerce.",
    href: "https://github.com/kingct19/ETAMU-All-in-One",
    previewImage: "/images/projects/etamu-all-in-one.webp",
    tags: ["Flutter", "Dart", "Mobile", "School Project"],
    heading: "ETAMU All-in-One",
    subheading:
      "Campus resources and student workflows unified in a single cross-platform Flutter app.",
    features: [
      {
        icon: "smartphone",
        title: "Cross-Platform Mobile Capstone",
        description:
          "Built with Flutter and Dart across 91+ commits for iOS and Android.",
        image: "/images/projects/etamu-all-in-one.webp",
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

export const PROJECT_TITLE_TO_SLUG: Record<string, string> = {
  AnglerIQ: "angleriq",
  "Studio Sozo": "studio-sozo",
  "The Sozo CRM": "the-sozo-crm",
  "Home Ranger Services": "home-ranger",
  "Splash & Dash Rentals": "splash-and-dash",
  "Serene Dreams": "serene-dreams",
  "Elevate Solar": "elevate-solar",
  "Family Tracking & Management App": "family-tracking",
  "ETAMU All-in-One": "etamu-all-in-one",
};

export function getProjectPageHref(title: string): string | undefined {
  const slug = PROJECT_TITLE_TO_SLUG[title];
  return slug ? `/projects/${slug}` : undefined;
}
