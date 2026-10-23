import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

import { Footer } from "@/components/landing/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getAllProjectSlugs,
  getProjectPage,
  PROJECT_PAGES,
} from "@/config/project-pages";
import { projectsConfig } from "@/config/projects";
import { CALENDLY_URL } from "@/config/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectPage(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} · Chandler King`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: project.previewImage ? [{ url: project.previewImage }] : undefined,
    },
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectPage(slug);
  if (!project) notFound();

  const index = PROJECT_PAGES.findIndex((item) => item.slug === project.slug);
  const prev = index > 0 ? PROJECT_PAGES[index - 1] : undefined;
  const next = index < PROJECT_PAGES.length - 1 ? PROJECT_PAGES[index + 1] : undefined;
  const explorerMatch = projectsConfig.find((item) => item.id === project.slug);
  const coverImage = explorerMatch?.image ?? "/rixel.png";

  return (
    <>
      <div className="relative flex min-h-dvh flex-col gap-y-4 overflow-x-clip bg-background pt-14 pb-12">
        {/* Breadcrumb */}
        <div className="px-6 pt-4 border-t border-dashed">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/#projects" className="hover:text-foreground">
              Work
            </Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-foreground">
              Projects
            </Link>
            <span>/</span>
            <span className="truncate font-medium text-foreground">
              {project.title}
            </span>
          </nav>
        </div>

        {/* Title bar */}
        <h1 className="section-heading text-balance">{project.title}</h1>

        {/* Meta */}
        <div className="px-6 flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="font-mono text-xs text-muted-foreground">
            <span className="tabular-nums">{project.period}</span>
            <span aria-hidden="true" className="mx-2 text-muted-foreground/50">
              {"//"}
            </span>
            {explorerMatch?.category ?? "Case Study"}
          </p>
        </div>

        {/* Description */}
        <div className="px-6">
          <p className="text-base text-muted-foreground leading-relaxed text-pretty">
            {project.subheading}
          </p>
        </div>

        {/* Hero image */}
        <div className="aspect-video relative bg-muted overflow-hidden border-y">
          <Image
            src={coverImage}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 ring-1 ring-black/10 ring-inset dark:ring-white/15"
          />
        </div>

        {/* Tags & Actions */}
        <div className="px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {project.href ? (
              <Button asChild size="sm">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Project
                  <ArrowUpRightIcon className="ml-1.5 size-3.5" />
                </a>
              </Button>
            ) : null}
            <Button asChild variant="outline" size="sm">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Scoping Call
              </a>
            </Button>
          </div>
        </div>

        {/* Case Study Content */}
        <section
          aria-label="Case study"
          className="border-t border-dashed px-6 py-6"
        >
          <div className="prose max-w-none">
            <h2>Overview</h2>
            <p>{project.summary}</p>

            {project.features.map((feature) => (
              <div key={feature.title}>
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prev / Next Navigation */}
        <nav
          aria-label="More projects"
          className="border-t border-dashed px-6 py-6 flex items-start justify-between gap-4"
        >
          <div className="min-w-0 flex-1">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group inline-flex min-w-0 max-w-full flex-col gap-1 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                  <ArrowLeftIcon className="size-3 transition-transform group-hover:-translate-x-0.5" />
                  Prev
                </span>
                <span className="truncate text-sm font-medium group-hover:text-primary group-hover:underline group-hover:underline-offset-4">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <Link
                href="/projects"
                className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground"
              >
                <ArrowLeftIcon className="size-3" />
                All work
              </Link>
            )}
          </div>
          <div className="min-w-0 flex-1 text-right">
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group inline-flex min-w-0 max-w-full flex-col items-end gap-1 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                  Next
                  <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="truncate text-sm font-medium group-hover:text-primary group-hover:underline group-hover:underline-offset-4">
                  {next.title}
                </span>
              </Link>
            ) : (
              <Link
                href="/projects"
                className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground"
              >
                All work
                <ArrowRightIcon className="size-3" />
              </Link>
            )}
          </div>
        </nav>
      </div>
      <Footer />
    </>
  );
}
