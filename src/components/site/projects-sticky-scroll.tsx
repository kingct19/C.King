"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CodeIcon,
  FolderCodeIcon,
  GlobeIcon,
  RocketIcon,
  SmartphoneIcon,
  SparklesIcon,
} from "lucide-react";
import type { ComponentType } from "react";

import FeaturesWithStickyScroll, {
  type StickyFeature,
} from "@/block/features-with-sticky-scroll";
import type { ProjectPage } from "@/config/project-pages";
import { SITE } from "@/config/site";

const ICONS: ComponentType<{ className?: string }>[] = [
  SmartphoneIcon,
  RocketIcon,
  GlobeIcon,
  FolderCodeIcon,
  CodeIcon,
  SparklesIcon,
];

function ProjectMedia({ project }: { project: ProjectPage }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg border border-line bg-muted"
    >
      <Image
        src={project.previewImage ?? SITE.avatar}
        alt={project.title}
        fill
        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        sizes="(max-width: 1024px) 100vw, 40vw"
      />
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent p-4">
        <span className="text-sm font-medium text-white">View case study →</span>
      </div>
    </Link>
  );
}

export function ProjectsStickyScroll({ projects }: { projects: ProjectPage[] }) {
  const features: StickyFeature[] = projects.map((project, index) => {
    const Icon = ICONS[index % ICONS.length];
    return {
      title: project.title,
      description: `${project.period} — ${project.summary}`,
      icon: <Icon className="h-8 w-8 text-muted-foreground" />,
      content: <ProjectMedia project={project} />,
    };
  });

  return (
    <FeaturesWithStickyScroll
      heading="Projects"
      subheading="Products and client builds — scroll through each case study."
      features={features}
      className="relative mx-auto h-full w-full pt-16 md:pt-28"
    />
  );
}
