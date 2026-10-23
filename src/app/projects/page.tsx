import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Footer } from "@/components/landing/footer";
import { HomeProjectExplorer } from "@/components/landing/home-project-explorer";
import type { ProjectExplorerItem } from "@/components/project-explorer";
import { SideNote } from "@/components/shared/side-note";
import {
  ApparelTeeCutoutIcon,
  FishCutoutIcon,
  GraduationCapCutoutIcon,
  HvacHomeCutoutIcon,
  KeyOwnershipCutoutIcon,
  LocationPinCutoutIcon,
  ProjectExplorerIcon,
  RolodexIcon,
  SolarSunCutoutIcon,
  WavesJetSkiCutoutIcon,
} from "@/components/showcase/component-icons";
import { PROJECT_PAGES } from "@/config/project-pages";
import { projectsConfig } from "@/config/projects";
import { CALENDLY_URL, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Work & Projects",
  description: `Selected products and builds by ${SITE.name} — case studies for web, mobile, and AI work.`,
  openGraph: {
    title: "Work & Projects · Chandler King",
    description: `Selected products and builds by ${SITE.name} — case studies for web, mobile, and AI work.`,
    url: "/projects",
  },
  alternates: {
    canonical: "/projects",
  },
};

const explorerProjects: ProjectExplorerItem[] = projectsConfig.map((project) => ({
  id: project.id,
  title: project.title,
  year: project.year,
  description: project.description,
  category: project.category,
  status: project.status,
  href: project.href,
  liveUrl: project.liveUrl,
  githubUrl: project.githubUrl,
  image: project.image,
  imageAlt: project.imageAlt,
  enabled: project.enabled,
  order: project.order,
}));

const projectIconMap: Record<
  string,
  React.ComponentType<{ className?: string; size?: number }>
> = {
  angleriq: FishCutoutIcon,
  "studio-sozo": KeyOwnershipCutoutIcon,
  "the-sozo-crm": RolodexIcon,
  "home-ranger": HvacHomeCutoutIcon,
  "splash-and-dash": WavesJetSkiCutoutIcon,
  "serene-dreams": ApparelTeeCutoutIcon,
  "elevate-solar": SolarSunCutoutIcon,
  "family-tracking": LocationPinCutoutIcon,
  "etamu-all-in-one": GraduationCapCutoutIcon,
};

export default function ProjectsIndexPage() {
  return (
    <>
      <div className="relative flex min-h-dvh flex-col gap-y-6 overflow-x-clip bg-background pt-14 pb-12 xl:overflow-x-visible">
        <div className="relative border-t border-dashed pt-6">
          <SideNote side="left">{"Shipped from zero\nto production"}</SideNote>

          <div className="px-6 mb-3 flex items-center gap-2">
            <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              {"// SHIPPED PLATFORMS & CASE STUDIES"}
            </span>
          </div>

          <h1 className="section-heading mb-3 flex items-center gap-2.5">
            <ProjectExplorerIcon size={28} className="shrink-0" />
            <span>Selected Work &amp; Case Studies</span>
          </h1>
          <p className="px-6 text-sm leading-relaxed text-muted-foreground">
            Production SaaS platforms, AI mobile apps, custom client systems, and university engineering builds.
          </p>
        </div>

        <HomeProjectExplorer
          projects={explorerProjects}
          title="By Year"
          showHeading={false}
          defaultOpen="all"
        />

        <section className="relative border-t border-dashed pt-6">
          <SideNote side="right">{"Deep dives &\narchitecture"}</SideNote>
          <h2 className="section-heading mb-4">Case Studies</h2>
          <div className="grid gap-4 px-6 sm:grid-cols-2">
            {PROJECT_PAGES.map((project) => {
              const Icon = projectIconMap[project.slug] ?? ProjectExplorerIcon;
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group relative flex flex-col justify-between border border-dashed bg-background p-4 transition-colors hover:bg-muted/20"
                >
                  <div className="blueprint-bg pointer-events-none absolute inset-0 opacity-40 transition-opacity group-hover:opacity-100" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-2">
                      <Icon
                        size={38}
                        className="shrink-0 micro-transition motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:-rotate-6"
                      />
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {project.period}
                        </span>
                        <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                      </div>
                    </div>
                    <h3 className="mt-2.5 text-base font-semibold group-hover:text-primary">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {project.summary}
                    </p>
                  </div>
                  <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-dashed px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="border-t border-dashed px-6 pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Have a web, mobile, or AI product in mind?
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="micro-press inline-flex h-8 items-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-medium text-background transition-opacity hover:opacity-90"
          >
            Book a 30-min scoping call
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
