import type { Metadata } from "next";

import { EXPERIENCES, OVERVIEW, SITE, STACK } from "@/config/site";

import { PrintToolbar } from "./print-toolbar";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${SITE.name} — Software Engineer in Kansas City, MO.`,
};

const SUMMARY =
  "Software engineer with a B.S. and M.S. in Computer Science (AI concentration) and hands-on experience shipping web and mobile products to production. Founded and lead engineering at Sozo Tech Enterprise, where I built The Sozo CRM (Next.js, TypeScript, PostgreSQL) and AnglerIQ, an AI-powered mobile app (React Native, computer vision), while managing a team of 3 developers.";

const RESUME_PROJECTS = [
  {
    name: "AnglerIQ",
    detail:
      "AI-powered mobile fish finder using computer vision and location-aware features. React Native, TypeScript, AI/ML.",
  },
  {
    name: "The Sozo CRM",
    detail:
      "Full-stack customer relationship platform shipped from zero to production at thesozocrm.com. Next.js, TypeScript, PostgreSQL.",
  },
  {
    name: "ETAMU All-in-One",
    detail:
      "Cross-platform campus mobile app for Texas A&M University–Commerce. Flutter, Dart, iOS, Android.",
  },
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Formats "01.2025" as "Jan 2025"; missing end date becomes "Present". */
function formatPeriod(start: string, end?: string): string {
  const format = (value: string) => {
    const [month, year] = value.split(".");
    return `${MONTHS[Number(month) - 1]} ${year}`;
  };
  return `${format(start)} – ${end ? format(end) : "Present"}`;
}

function descriptionToBullets(description?: string): string[] {
  if (!description) return [];
  return description
    .split("\n")
    .map((line) => line.replace(/^-\s*/, "").trim())
    .filter(Boolean);
}

const workExperiences = EXPERIENCES.filter((experience) => experience.id !== "education");
const education = EXPERIENCES.find((experience) => experience.id === "education");

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 print:bg-white">
      <PrintToolbar />

      <article className="mx-auto w-full max-w-[8.5in] bg-white px-8 py-10 shadow-sm sm:px-12 print:max-w-none print:px-0 print:py-0 print:shadow-none">
        <header className="mb-6 print:mb-3">
          <h1 className="text-3xl font-semibold tracking-tight print:text-2xl">{SITE.name}</h1>
          <p className="mt-1 text-lg text-zinc-700 print:text-base">Software Engineer</p>
          <p className="mt-2 text-sm print:text-xs text-zinc-600">
            {OVERVIEW.location} · {OVERVIEW.email} · {OVERVIEW.phone} · {OVERVIEW.website} ·
            github.com/{SITE.github.username}
          </p>
        </header>

        <section className="mb-6 print:mb-3">
          <h2 className="mb-2 border-b border-zinc-300 pb-1 text-sm print:text-xs font-semibold tracking-wide uppercase">
            Summary
          </h2>
          <p className="text-sm print:text-xs leading-relaxed print:leading-snug">{SUMMARY}</p>
        </section>

        <section className="mb-6 print:mb-3">
          <h2 className="mb-2 border-b border-zinc-300 pb-1 text-sm print:text-xs font-semibold tracking-wide uppercase">
            Experience
          </h2>
          <div className="flex flex-col gap-4 print:gap-2.5">
            {workExperiences.map((experience) =>
              experience.positions.map((position) => (
                <div key={position.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-sm print:text-xs font-semibold">
                      {position.title} — {experience.companyName}
                    </h3>
                    <p className="text-sm print:text-xs text-zinc-600">
                      {formatPeriod(
                        position.employmentPeriod.start,
                        position.employmentPeriod.end
                      )}
                    </p>
                  </div>
                  <ul className="mt-1.5 list-disc pl-5 text-sm print:text-xs leading-relaxed print:leading-snug">
                    {descriptionToBullets(position.description).map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="mb-6 print:mb-3">
          <h2 className="mb-2 border-b border-zinc-300 pb-1 text-sm print:text-xs font-semibold tracking-wide uppercase">
            Education
          </h2>
          <div className="flex flex-col gap-2">
            {education?.positions.map((position) => (
              <div
                key={position.id}
                className="flex flex-wrap items-baseline justify-between gap-x-4"
              >
                <h3 className="text-sm print:text-xs font-semibold">
                  {position.title.replace(" · Student-Athlete", "")} — {education.companyName}
                </h3>
                <p className="text-sm print:text-xs text-zinc-600">
                  {formatPeriod(position.employmentPeriod.start, position.employmentPeriod.end)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6 print:mb-3">
          <h2 className="mb-2 border-b border-zinc-300 pb-1 text-sm print:text-xs font-semibold tracking-wide uppercase">
            Skills
          </h2>
          <ul className="flex flex-col gap-1 text-sm print:text-xs leading-relaxed print:leading-snug">
            {STACK.map((group) => (
              <li key={group.label}>
                <span className="font-semibold">{`${group.label}: `}</span>
                {group.items.join(", ")}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-2 border-b border-zinc-300 pb-1 text-sm print:text-xs font-semibold tracking-wide uppercase">
            Projects
          </h2>
          <ul className="flex flex-col gap-1.5 text-sm print:text-xs leading-relaxed print:leading-snug">
            {RESUME_PROJECTS.map((project) => (
              <li key={project.name}>
                <span className="font-semibold">{`${project.name}. `}</span>
                {project.detail}
              </li>
            ))}
          </ul>
        </section>
      </article>

      <div className="h-10 print:hidden" />
    </div>
  );
}
