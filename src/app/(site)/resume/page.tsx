import type { Metadata } from "next";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { Footer } from "@/components/landing/footer";
import { SideNote } from "@/components/shared/side-note";
import {
  BriefcaseCutoutIcon,
  FishCutoutIcon,
  GraduationCapCutoutIcon,
  KeyOwnershipCutoutIcon,
  ProjectExplorerIcon,
  RolodexIcon,
  SolarSunCutoutIcon,
  StackPillsIcon,
  TrophyAthleteCutoutIcon,
} from "@/components/showcase/component-icons";
import {
  RESUME_EDUCATION,
  RESUME_EXPERIENCE,
  RESUME_HEADLINE,
  RESUME_PROJECTS,
  RESUME_STACK,
  RESUME_SUMMARY,
} from "@/config/resume";
import { AVAILABILITY, OVERVIEW, SITE, SOCIAL_LINKS } from "@/config/site";
import { cn } from "@/lib/utils";

import { PrintToolbar } from "./print-toolbar";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${SITE.name} — Software Engineer & Founder in Kansas City, MO.`,
};

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

function formatPeriod(start: string, end?: string): string {
  const format = (value: string) => {
    const [month, year] = value.split(".");
    return `${MONTHS[Number(month) - 1]} ${year}`;
  };
  return `${format(start)} — ${end ? format(end) : "Present"}`;
}

const linkedIn = SOCIAL_LINKS.find((link) => link.name === "LinkedIn");

const CONTACT_LINKS = [
  { label: OVERVIEW.email, href: `mailto:${OVERVIEW.email}` },
  { label: OVERVIEW.phone, href: "tel:+19034244805" },
  { label: "studiosozo.dev", href: "https://www.studiosozo.dev" },
  {
    label: `github.com/${SITE.github.username}`,
    href: `https://github.com/${SITE.github.username}`,
  },
  ...(linkedIn ? [{ label: "LinkedIn", href: linkedIn.href }] : []),
] as const;

const resumeProjectIconMap: Record<
  string,
  React.ComponentType<{ className?: string; size?: number }>
> = {
  AnglerIQ: FishCutoutIcon,
  "Studio Sozo": KeyOwnershipCutoutIcon,
  "The Sozo CRM": RolodexIcon,
  "elevate-solar.com": SolarSunCutoutIcon,
};

export default function ResumePage() {
  return (
    <>
      <div className="relative flex min-h-dvh flex-col gap-y-6 overflow-x-clip bg-background pt-14 pb-12 xl:overflow-x-visible print:pt-0 print:pb-0">
        {/* Header / Identity */}
        <section className="relative border-t border-dashed pt-6 print:border-0 print:pt-0">
          <div className="print:hidden">
            <SideNote side="left">{"CS + AI &\nD1 Track"}</SideNote>
          </div>

          <div className="px-6 print:px-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                {`// CURRICULUM VITAE`}
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-500/10 px-2 py-0.5 font-sans text-xs text-emerald-600 dark:text-emerald-400 print:hidden">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
                {AVAILABILITY.label}
              </span>
            </div>

            <h1 className="mt-2 font-serif text-3xl italic tracking-tight sm:text-4xl print:text-2xl">
              {SITE.name}
            </h1>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {RESUME_HEADLINE} · {OVERVIEW.location}
            </p>

            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
              {CONTACT_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4 print:hidden">
              <PrintToolbar />
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="border-t border-dashed pt-6 print:border-t print:pt-3">
          <h2 className="section-heading mb-3 print:border-0 print:bg-transparent print:px-0 print:py-1 print:text-sm print:uppercase">
            Summary
          </h2>
          <div className="px-6 print:px-0">
            <p className="text-sm leading-relaxed text-muted-foreground print:text-xs print:text-foreground">
              {RESUME_SUMMARY}
            </p>
          </div>
        </section>

        {/* Experience */}
        <section className="relative border-t border-dashed pt-6 print:border-t print:pt-3">
          <div className="print:hidden">
            <SideNote side="right">{"Founder &\nTech Lead"}</SideNote>
          </div>
          <h2 className="section-heading mb-4 print:border-0 print:bg-transparent print:px-0 print:py-1 print:text-sm print:uppercase">
            Experience
          </h2>
          <div className="space-y-4 px-6 print:space-y-3 print:px-0">
            {RESUME_EXPERIENCE.map((role) => (
              <article
                key={role.id}
                className="group border border-dashed bg-background/50 p-4 print:break-inside-avoid print:border-0 print:p-0"
              >
                <div className="flex items-start gap-3">
                  <BriefcaseCutoutIcon
                    size={34}
                    className="mt-0.5 shrink-0 micro-transition motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:-rotate-6 print:hidden"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-base font-semibold print:text-xs">
                        {role.title}
                      </h3>
                      <span className="font-mono text-xs text-muted-foreground">
                        {formatPeriod(
                          role.period.start,
                          "end" in role.period ? role.period.end : undefined,
                        )}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground print:text-xs">
                      <a
                        href={role.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 hover:text-primary"
                      >
                        {role.company}
                        <ArrowUpRightIcon className="size-3 print:hidden" />
                      </a>
                      <span className="font-mono text-xs text-muted-foreground/70">
                        {` · ${role.type} · ${role.location}`}
                      </span>
                    </p>
                    <ul className="mt-2.5 list-disc space-y-1.5 pl-4 text-sm text-muted-foreground print:mt-1 print:space-y-0.5 print:text-xs print:text-foreground">
                      {role.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-1.5 print:hidden">
                      {role.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-dashed px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="relative border-t border-dashed pt-6 print:border-t print:pt-3">
          <h2 className="section-heading mb-4 print:border-0 print:bg-transparent print:px-0 print:py-1 print:text-sm print:uppercase">
            Education
          </h2>
          <div className="space-y-3 px-6 print:space-y-2 print:px-0">
            {RESUME_EDUCATION.map((item, idx) => {
              const EduIcon = idx === 0 ? GraduationCapCutoutIcon : TrophyAthleteCutoutIcon;
              return (
                <article
                  key={item.id}
                  className="group border border-dashed bg-background/50 p-4 print:break-inside-avoid print:border-0 print:p-0"
                >
                  <div className="flex items-start gap-3">
                    <EduIcon
                      size={34}
                      className="mt-0.5 shrink-0 micro-transition motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:rotate-6 print:hidden"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-base font-semibold print:text-xs">
                          {item.title}
                        </h3>
                        <span className="font-mono text-xs text-muted-foreground">
                          {formatPeriod(item.period.start, item.period.end)}
                        </span>
                      </div>
                      <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                        {item.school}
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground print:mt-1 print:text-xs print:text-foreground">
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Selected Projects */}
        <section className="relative border-t border-dashed pt-6 print:border-t print:pt-3">
          <div className="print:hidden">
            <SideNote side="left">{"Shipped to\nproduction"}</SideNote>
          </div>
          <h2 className="section-heading mb-4 print:border-0 print:bg-transparent print:px-0 print:py-1 print:text-sm print:uppercase">
            Selected Projects
          </h2>
          <div className="grid gap-3 px-6 sm:grid-cols-2 print:block print:space-y-2 print:px-0">
            {RESUME_PROJECTS.map((project, index) => {
              const ProjectIcon = resumeProjectIconMap[project.name] ?? ProjectExplorerIcon;
              return (
                <article
                  key={project.name}
                  className="group relative flex flex-col justify-between border border-dashed bg-background p-4 transition-colors hover:bg-muted/15 print:break-inside-avoid print:border-0 print:p-0"
                >
                  <div className="blueprint-bg pointer-events-none absolute inset-0 opacity-40 transition-opacity group-hover:opacity-100 print:hidden" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <ProjectIcon
                          size={30}
                          className="shrink-0 micro-transition motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:-rotate-6 print:hidden"
                        />
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {`0${index + 1} · ${project.period}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 font-mono text-xs print:hidden">
                        <Link
                          href={project.caseStudy}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Case study
                        </Link>
                        {"href" in project && project.href ? (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-primary hover:underline"
                          >
                            Live
                            <ArrowUpRightIcon className="size-3" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                    <h3 className="mt-2 text-sm font-semibold">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground print:text-foreground">
                      {project.summary}
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-muted-foreground print:text-foreground">
                      {project.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative z-10 mt-3 flex flex-wrap gap-1.5 print:hidden">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-dashed px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Stack / Skills */}
        <section className="border-t border-dashed pt-6 print:border-t print:pt-3">
          <h2 className="section-heading flex items-center gap-2.5 print:border-0 print:bg-transparent print:px-0 print:py-1 print:text-sm print:uppercase">
            <StackPillsIcon size={26} className="shrink-0 print:hidden" />
            <span>Technical Stack</span>
          </h2>
          <div className="print:hidden">
            {RESUME_STACK.map((group, index) => (
              <div
                key={group.label}
                className={cn(
                  "flex flex-col gap-2.5 border-b border-dashed px-6 py-3.5 sm:flex-row sm:items-center sm:gap-6",
                  index === RESUME_STACK.length - 1 && "border-none",
                )}
              >
                <span className="w-44 shrink-0 font-mono text-xs tracking-wider text-muted-foreground">
                  {`${String(index + 1).padStart(2, "0")} ${group.label}`}
                </span>
                <div className="flex flex-1 flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-lg border border-dashed px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <ul className="hidden flex-col gap-1 text-xs print:flex">
            {RESUME_STACK.map((group) => (
              <li key={group.label}>
                <span className="font-semibold">{`${group.label}: `}</span>
                {group.items.join(", ")}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}
