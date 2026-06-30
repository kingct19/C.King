"use client";

import { Carousel, Card } from "@/components/linear-carousel";
import type { ProjectItem } from "@/config/site";
import { SITE } from "@/config/site";

export function FeaturedProjectsCarousel({ projects }: { projects: ProjectItem[] }) {
  const featured = projects.slice(0, 5);

  if (featured.length === 0) return null;

  const cards = featured.map((project, index) => (
    <Card
      key={project.title}
      index={index}
      card={{
        src: project.previewImage ?? SITE.avatar,
        title: project.title,
        category: project.period,
        grayscale: project.previewImage ? false : true,
        content: (
          <p className="text-sm text-muted-foreground">
            {project.description ?? "Featured project"}
          </p>
        ),
      }}
    />
  ));

  return (
    <div className="-mx-4 border-y border-line py-2 md:-mx-0">
      <Carousel items={cards} autoplay autoplaySpeed={0.35} />
    </div>
  );
}
