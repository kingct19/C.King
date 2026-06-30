import {
  BriefcaseBusinessIcon,
  ClockIcon,
  GlobeIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  RocketIcon,
  VenusAndMarsIcon,
} from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { LocalTime } from "@/components/site/local-time";
import { Panel } from "@/components/site/panel";
import { cn } from "@/lib/utils";
import { OVERVIEW } from "@/config/site";

function IconChip({ children }: { children: ReactNode }) {
  return <span className="icon-chip">{children}</span>;
}

function OverviewRow({
  icon,
  className,
  children,
  ...props
}: ComponentProps<"div"> & { icon: ReactNode }) {
  return (
    <div className={cn("flex min-h-6 min-w-0 items-start gap-4 sm:items-center", className)} {...props}>
      <IconChip>{icon}</IconChip>
      <p className="min-w-0 flex-1 font-mono text-sm break-words">{children}</p>
    </div>
  );
}

export function Overview() {
  return (
    <Panel id="overview">
      <div className="grid grid-cols-1 gap-x-4 gap-y-2.5 p-4 sm:grid-cols-2">
        <OverviewRow icon={<BriefcaseBusinessIcon />} className="sm:col-span-2">
          {OVERVIEW.rows[0].label}{" "}
          <a href={OVERVIEW.rows[0].link.href} className="font-medium link-underline">
            {OVERVIEW.rows[0].link.text}
          </a>
        </OverviewRow>

        <OverviewRow icon={<RocketIcon />} className="sm:col-span-2">
          {OVERVIEW.rows[1].label}{" "}
          <a href={OVERVIEW.rows[1].link.href} className="font-medium link-underline">
            {OVERVIEW.rows[1].link.text}
          </a>
        </OverviewRow>

        <OverviewRow icon={<MapPinIcon />}>{OVERVIEW.location}</OverviewRow>

        <div className="flex h-6 items-center gap-4">
          <IconChip>
            <ClockIcon />
          </IconChip>
          <LocalTime timeZone={OVERVIEW.timeZone} />
        </div>

        <OverviewRow icon={<MailIcon />}>
          <a href={`mailto:${OVERVIEW.email}`} className="link-underline">
            {OVERVIEW.email}
          </a>
        </OverviewRow>

        <OverviewRow icon={<PhoneIcon />}>
          <a href="tel:+19034244805" className="link-underline">
            {OVERVIEW.phone}
          </a>
        </OverviewRow>

        <OverviewRow icon={<GlobeIcon />}>
          <a href={`https://${OVERVIEW.website}`} className="link-underline">
            {OVERVIEW.website}
          </a>
        </OverviewRow>

        <OverviewRow icon={<VenusAndMarsIcon />}>{OVERVIEW.pronouns}</OverviewRow>
      </div>
    </Panel>
  );
}
