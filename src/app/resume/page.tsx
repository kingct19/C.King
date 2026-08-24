import type { Metadata } from "next";
import { ArrowUpRightIcon, BriefcaseBusinessIcon, GraduationCapIcon } from "lucide-react";
import Link from "next/link";

import { AvailabilityBadge } from "@/components/site/availability-badge";
import { ScrollTop } from "@/components/site/scroll-top";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
  SectionSeparator,
} from "@/components/site/panel";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import {
  RESUME_EDUCATION,
  RESUME_EXPERIENCE,
  RESUME_PROJECTS,
  RESUME_SUMMARY,
} from "@/config/resume";
import { AVAILABILITY, OVERVIEW, SITE, SOCIAL_LINKS, STACK } from "@/config/site";

import { PrintToolbar } from "./print-toolbar";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${SITE.name} — Software Engineer in Kansas City, MO.`,
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

/** Formats "01.2025" as "Jan 2025"; missing end date becomes "Present". */
function formatPeriod(start: string, end?: string): string {
  const format = (value: string) => {
    const [month, year] = value.split(".");
    return `${MONTHS[Number(month) - 1]} ${year}`;
  };
  return `${format(start)} – ${end ? format(end) : "Present"}`;
}

const linkedIn = SOCIAL_LINKS.find((link) => link.name === "LinkedIn");

const CONTACT_LINKS = [
  { label: OVERVIEW.email, href: `mailto:${OVERVIEW.email}` },
  { label: OVERVIEW.phone, href: "tel:+19034244805" },
  { label: OVERVIEW.website, href: `https://${OVERVIEW.website}` },
  {
    label: `github.com/${SITE.github.username}`,
    href: `https://github.com/${SITE.github.username}`,
  },
  ...(linkedIn ? [{ label: "LinkedIn", href: linkedIn.href }] : []),
] as const;

export default function ResumePage() {
  return (
    <div className="max-w-screen overflow-x-clip">
      <div className="print:hidden">
        <SiteHeader />
      </div>

      <main id="main-content" className="mx-auto w-full min-w-0 px-4 md:max-w-3xl print:max-w-none print:px-0">
        <section className="border-x border-line print:border-0">
          <div className="px-4 py-6 print:px-0 print:py-0 print:mb-3">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase print:text-foreground">
              {SITE.wordmark}
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl print:mt-1 print:text-2xl">
              {SITE.name}
            </h1>
            <p className="mt-1 font-mono text-sm text-muted-foreground print:text-xs">
              Software Engineer & Founder
            </p>
            <p className="mt-1 font-mono text-sm text-foreground print:text-xs">
              {OVERVIEW.location}
            </p>
            <div aria-hidden className="mt-4 h-px bg-line print:mt-2">
              <div className="h-px w-16 bg-brand-blue" />
            </div>

            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-sm print:mt-2 print:text-xs">
              {CONTACT_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link-underline text-muted-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap items-center gap-3 print:hidden">
              <AvailabilityBadge status={AVAILABILITY.status} label={AVAILABILITY.label} />
              <PrintToolbar />
            </div>
          </div>
        </section>

        <SectionSeparator className="print:hidden" />

        <Panel className="print:mb-3 print:border-0 print:before:hidden print:after:hidden">
          <PanelHeader className="print:px-0 print:after:hidden">
            <PanelTitle className="print:mb-1.5 print:border-b print:border-line print:pb-1 print:text-xs print:tracking-wide print:uppercase">
              Summary
            </PanelTitle>
          </PanelHeader>
          <PanelContent className="print:p-0">
            <p className="text-sm leading-relaxed text-muted-foreground print:text-xs print:leading-snug print:text-foreground">
              {RESUME_SUMMARY}
            </p>
          </PanelContent>
        </Panel>

        <SectionSeparator className="print:hidden" />

        <Panel className="print:mb-3 print:border-0 print:before:hidden print:after:hidden">
          <PanelHeader className="print:px-0 print:after:hidden">
            <PanelTitle
              sup={`(${RESUME_EXPERIENCE.length})`}
              className="print:mb-1.5 print:border-b print:border-line print:pb-1 print:text-xs print:tracking-wide print:uppercase"
            >
              Experience
            </PanelTitle>
          </PanelHeader>
          <PanelContent className="flex flex-col gap-6 print:gap-2 print:p-0">
            {RESUME_EXPERIENCE.map((role) => (
              <article key={role.id} className="print:break-inside-avoid">
                <div className="flex gap-3">
                  <span className="icon-chip mt-0.5 print:hidden">
                    <BriefcaseBusinessIcon />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-sm font-medium print:text-xs print:font-semibold">
                        {role.title}
                      </h3>
                      <p className="font-mono text-xs text-muted-foreground">
                        {formatPeriod(
                          role.period.start,
                          "end" in role.period ? role.period.end : undefined
                        )}
                      </p>
                    </div>
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                      <a
                        href={role.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline"
                      >
                        {role.company}
                      </a>
                      <span className="text-muted-foreground/50">{` · ${role.type}`}</span>
                    </p>
                    <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground print:mt-1 print:space-y-0.5 print:text-xs print:leading-snug print:text-foreground">
                      {role.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <ul className="mt-3 flex flex-wrap gap-1.5 print:hidden">
                      {role.skills.map((skill) => (
                        <li key={skill} className="tag-fill">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </PanelContent>
        </Panel>

        <SectionSeparator className="print:hidden" />

        <Panel className="print:mb-3 print:border-0 print:before:hidden print:after:hidden">
          <PanelHeader className="print:px-0 print:after:hidden">
            <PanelTitle
              sup={`(${RESUME_PROJECTS.length})`}
              className="print:mb-1.5 print:border-b print:border-line print:pb-1 print:text-xs print:tracking-wide print:uppercase"
            >
              Projects
            </PanelTitle>
          </PanelHeader>
          <PanelContent className="flex flex-col gap-4 print:gap-1.5 print:p-0">
            {RESUME_PROJECTS.map((project, index) => (
              <article
                key={project.name}
                className="rounded-lg border border-line p-4 transition-colors hover:border-foreground/20 print:break-inside-avoid print:rounded-none print:border-0 print:border-b print:px-0 print:py-1.5 print:last:border-b-0"
              >
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div className="min-w-0">
                    <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                      {`Fig.${String(index + 1).padStart(2, "0")} · ${project.period}`}
                    </p>
                    <h3 className="mt-1 text-base font-medium tracking-tight print:text-xs print:font-semibold">
                      {project.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                    <Link
                      href={project.caseStudy}
                      className="text-brand-blue transition-opacity hover:opacity-80 print:hidden"
                    >
                      Case study
                    </Link>
                    {"href" in project && project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Live
                        <ArrowUpRightIcon className="size-3" />
                      </a>
                    ) : null}
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground print:mt-1 print:text-xs print:leading-snug print:text-foreground">
                  {project.summary}
                </p>
                <ul className="mt-2.5 flex flex-col gap-1.5 print:mt-1 print:list-disc print:gap-0.5 print:pl-5">
                  {project.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:top-[0.6em] before:left-0 before:size-1 before:rounded-full before:bg-muted-foreground/50 print:pl-0 print:text-xs print:leading-snug print:text-foreground print:before:hidden"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
                <ul className="mt-3 flex flex-wrap gap-1.5 print:hidden">
                  {project.tags.map((tag) => (
                    <li key={tag} className="tag-fill">
                      {tag}
                    </li>
                  ))}
                </ul>
                <p className="mt-1 hidden font-mono text-[10px] text-muted-foreground print:block">
                  {project.tags.join(" · ")}
                </p>
              </article>
            ))}
          </PanelContent>
        </Panel>

        <SectionSeparator className="print:hidden" />

        <Panel className="print:mb-3 print:border-0 print:before:hidden print:after:hidden">
          <PanelHeader className="print:px-0 print:after:hidden">
            <PanelTitle className="print:mb-1.5 print:border-b print:border-line print:pb-1 print:text-xs print:tracking-wide print:uppercase">
              Skills
            </PanelTitle>
          </PanelHeader>
          <div className="print:hidden">
            {STACK.map((group, index) => (
              <div
                key={group.label}
                className="grid grid-cols-[7.5rem_1fr] gap-4 px-4 py-3 not-last:screen-line-bottom max-sm:grid-cols-1"
              >
                <div className="flex items-baseline gap-2 font-mono text-xs text-muted-foreground">
                  <span className="text-muted-foreground/50">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  {group.label}
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="tag-fill">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <ul className="hidden flex-col gap-0.5 px-4 pb-4 text-xs leading-snug print:flex print:p-0">
            {STACK.map((group) => (
              <li key={group.label}>
                <span className="font-semibold">{`${group.label}: `}</span>
                {group.items.join(", ")}
              </li>
            ))}
          </ul>
        </Panel>

        <SectionSeparator className="print:hidden" />

        <Panel className="print:border-0 print:before:hidden print:after:hidden">
          <PanelHeader className="print:px-0 print:after:hidden">
            <PanelTitle className="print:mb-1.5 print:border-b print:border-line print:pb-1 print:text-xs print:tracking-wide print:uppercase">
              Education
            </PanelTitle>
          </PanelHeader>
          <PanelContent className="flex flex-col gap-5 print:gap-2 print:p-0">
            {RESUME_EDUCATION.map((item) => (
              <article key={item.id} className="print:break-inside-avoid">
                <div className="flex gap-3">
                  <span className="icon-chip mt-0.5 print:hidden">
                    <GraduationCapIcon />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-sm font-medium print:text-xs print:font-semibold">
                        {item.title}
                      </h3>
                      <p className="font-mono text-xs text-muted-foreground">
                        {formatPeriod(item.period.start, item.period.end)}
                      </p>
                    </div>
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">{item.school}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground print:mt-1 print:space-y-0 print:text-xs print:leading-snug print:text-foreground">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </PanelContent>
        </Panel>
      </main>

      <div className="mx-auto w-full min-w-0 px-4 md:max-w-3xl print:hidden">
        <SectionSeparator />
        <SiteFooter />
      </div>

      <div className="print:hidden">
        <ScrollTop />
      </div>
    </div>
  );
}
