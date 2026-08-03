"use client";

import Link from "next/link";

import { Carousel, Card } from "@/components/linear-carousel";
import { getProjectPageHref } from "@/config/project-pages";
import type { ProjectItem } from "@/config/site";
import { SITE } from "@/config/site";

export function FeaturedProjectsCarousel({ projects }: { projects: ProjectItem[] }) {
  const featured = projects.slice(0, 5);

  if (featured.length === 0) return null;

  const cards = featured.map((project, index) => {
    const pageHref = getProjectPageHref(project.title);
    return (
      <Card
        key={project.title}
        index={index}
        card={{
          src: project.previewImage ?? SITE.avatar,
          title: project.title,
          category: project.period,
          grayscale: project.previewImage ? false : true,
          content: (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {project.description ?? "Featured project"}
              </p>
              {pageHref ? (
                <Link
                  href={pageHref}
                  className="inline-flex text-sm font-medium text-brand-blue hover:underline"
                >
                  View case study →
                </Link>
              ) : null}
            </div>
          ),
        }}
      />
    );
  });

  return (
    <div className="-mx-4 border-y border-line py-2 md:-mx-0">
      <Carousel items={cards} autoplay autoplaySpeed={0.35} />
    </div>
  );
}
