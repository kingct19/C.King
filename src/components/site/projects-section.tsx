"use client";

import { useCallback, useRef } from "react";
import { ArrowUpRightIcon, FolderCodeIcon } from "lucide-react";

import {
  ChevronsUpDownIcon,
  type ChevronsUpDownIconHandle,
} from "@/components/chevrons-up-down-icon";
import { StaggerFadeList } from "@/components/stagger-fade";
import { AnimatedPanelTitle } from "@/components/site/animated-panel-title";
import { FeaturedProjectsCarousel } from "@/components/site/featured-projects-carousel";
import { Panel, PanelHeader } from "@/components/site/panel";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { ProjectItem } from "@/config/site";

function ProjectRow({ project }: { project: ProjectItem }) {
  const chevronsRef = useRef<ChevronsUpDownIconHandle>(null);

  const handleOpenChange = useCallback((open: boolean) => {
    if (open) {
      chevronsRef.current?.startAnimation();
    } else {
      chevronsRef.current?.stopAnimation();
    }
  }, []);

  const hasDetails =
    Boolean(project.description) ||
    Boolean(project.bullets?.length) ||
    Boolean(project.tags?.length);

  return (
    <Collapsible
      defaultOpen={project.isExpanded}
      onOpenChange={handleOpenChange}
      disabled={!hasDetails}
      asChild
    >
      <div className="not-last:screen-line-bottom py-4">
        <CollapsibleTrigger className="group/project flex w-full items-center gap-3 text-left select-none">
          <span className="icon-chip">
            <FolderCodeIcon className="size-4" />
          </span>

          <span className="flex flex-1 flex-col">
            <span className="font-medium">{project.title}</span>
            <span className="font-mono text-sm text-muted-foreground">
              {project.period}
            </span>
          </span>

          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              onClick={(event) => event.stopPropagation()}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowUpRightIcon className="size-4" />
            </a>
          ) : null}

          {hasDetails ? (
            <span className="text-muted-foreground [&_svg]:size-4">
              <ChevronsUpDownIcon ref={chevronsRef} duration={0.32} />
            </span>
          ) : null}
        </CollapsibleTrigger>

        {hasDetails ? (
          <CollapsibleContent>
            <div className="flex flex-col gap-3 pt-3 pl-9">
              {project.description ? (
                <p className="text-sm text-muted-foreground">{project.description}</p>
              ) : null}

              {project.bullets?.length ? (
                <ul className="flex flex-col gap-1.5">
                  {project.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="relative pl-4 text-sm before:absolute before:top-[0.6em] before:left-0 before:size-1 before:rounded-full before:bg-muted-foreground/50"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}

              {project.tags?.length ? (
                <ul className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li key={tag} className="tag-fill">
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </CollapsibleContent>
        ) : null}
      </div>
    </Collapsible>
  );
}

export function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  return (
    <Panel id="projects">
      <PanelHeader>
        <AnimatedPanelTitle sup={`(${projects.length})`}>Projects</AnimatedPanelTitle>
      </PanelHeader>

      <FeaturedProjectsCarousel projects={projects} />

      <StaggerFadeList as="div" className="px-4" staggerDelay={0.07}>
        {projects.map((project) => (
          <ProjectRow key={project.title} project={project} />
        ))}
      </StaggerFadeList>
    </Panel>
  );
}
