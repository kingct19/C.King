"use client";

import { ArrowUpRightIcon, BriefcaseBusinessIcon, CodeIcon, SmartphoneIcon } from "lucide-react";
import type { ComponentType } from "react";

import { BorderGradientLink } from "@/components/border-gradient";
import { SpotlightCard } from "@/components/spotlight-card";
import { StaggerFadeList } from "@/components/stagger-fade";
import { AnimatedPanelTitle } from "@/components/site/animated-panel-title";
import { Panel, PanelContent, PanelHeader } from "@/components/site/panel";
import { WORK_WITH_SOZO } from "@/config/site";

const SERVICE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  briefcase: BriefcaseBusinessIcon,
  code: CodeIcon,
  smartphone: SmartphoneIcon,
};

export function WorkWithSection() {
  return (
    <Panel id="work-with">
      <PanelHeader>
        <AnimatedPanelTitle>Work with Sozo</AnimatedPanelTitle>
      </PanelHeader>

      <PanelContent className="flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {WORK_WITH_SOZO.description}
        </p>

        <StaggerFadeList
          as="div"
          className="grid gap-3 sm:grid-cols-3"
          staggerDelay={0.08}
        >
          {WORK_WITH_SOZO.metrics.map((metric) => (
            <li
              key={metric.label}
              className="rounded-lg bg-muted px-3 py-2.5"
            >
              <p className="font-mono text-lg font-medium tabular-nums">{metric.value}</p>
              <p className="font-mono text-xs text-muted-foreground">{metric.label}</p>
            </li>
          ))}
        </StaggerFadeList>

        <StaggerFadeList as="div" className="flex flex-col gap-4" staggerDelay={0.12}>
          {WORK_WITH_SOZO.services.map((service) => {
            const Icon = SERVICE_ICONS[service.icon] ?? CodeIcon;
            return (
              <li key={service.title}>
                <SpotlightCard
                  spotlightColor="rgba(0, 149, 246, 0.15)"
                  hoverScale={1.01}
                  className="rounded-lg shadow-none"
                >
                  <div className="flex gap-3 p-4">
                    <span className="icon-chip">
                      <Icon />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium">{service.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                      {service.tags?.length ? (
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {service.tags.map((tag) => (
                            <li key={tag} className="tag-fill">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </SpotlightCard>
              </li>
            );
          })}
        </StaggerFadeList>

        <BorderGradientLink
          href={WORK_WITH_SOZO.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 w-fit items-center rounded-full bg-brand-blue px-4 text-sm font-medium text-white"
        >
          {WORK_WITH_SOZO.cta.label}
          <ArrowUpRightIcon className="size-4" />
        </BorderGradientLink>
      </PanelContent>
    </Panel>
  );
}
