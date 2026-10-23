import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";

import { Footer } from "@/components/landing/footer";
import { SideNote } from "@/components/shared/side-note";
import {
  DottedWorldMapIcon,
  KeyOwnershipCutoutIcon,
  ModelPickerIcon,
  RolodexIcon,
} from "@/components/showcase/component-icons";
import { SERVICES_PAGE } from "@/config/site";

export const metadata: Metadata = {
  title: SERVICES_PAGE.meta.title,
  description: SERVICES_PAGE.meta.description,
  openGraph: {
    title: `${SERVICES_PAGE.meta.title} · Chandler King`,
    description: SERVICES_PAGE.meta.description,
    url: "/services",
  },
  twitter: {
    title: `${SERVICES_PAGE.meta.title} · Chandler King`,
    description: SERVICES_PAGE.meta.description,
  },
  alternates: {
    canonical: "/services",
  },
};

const capabilityIconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  "01": KeyOwnershipCutoutIcon,
  "02": RolodexIcon,
  "03": ModelPickerIcon,
  "04": DottedWorldMapIcon,
};

export default function ServicesPage() {
  const { hero, capabilities } = SERVICES_PAGE;

  return (
    <>
      <div className="relative flex min-h-dvh flex-col gap-y-6 overflow-x-clip bg-background pt-14 pb-12 xl:overflow-x-visible">
        {/* Compact Studio Sozo Intro & Preview */}
        <section className="relative border-t border-dashed pt-6">
          <SideNote side="left">{"Own your code,\nditch SaaS rent"}</SideNote>

          <div className="px-6 mb-4 flex items-center gap-2">
            <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              {`// ${hero.badge}`}
            </span>
          </div>

          <h1 className="section-heading text-balance">{hero.headline}</h1>

          <div className="px-6 pt-4">
            <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
              {hero.subhead}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <a
                href={hero.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="micro-press inline-flex h-9 items-center gap-1.5 rounded-md bg-foreground px-4 text-xs font-medium text-background transition-opacity hover:opacity-90"
              >
                {hero.primaryCta.label}
                <ArrowUpRightIcon className="size-3.5" />
              </a>
              <a
                href={hero.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="micro-press inline-flex h-9 items-center gap-1.5 rounded-md border border-dashed bg-background px-4 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
              >
                {hero.secondaryCta.label}
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            </div>
          </div>

          {/* Live Studio Sozo Preview Card */}
          <div className="px-6 pt-6">
            <a
              href={hero.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-lg border border-dashed bg-muted/20 transition-colors hover:border-foreground/30"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src="/images/projects/studio-sozo.webp"
                  alt="Studio Sozo — Custom Software Development, CRM & AI Automation"
                  fill
                  priority
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                />
              </div>
              <div className="flex items-center justify-between border-t border-dashed bg-background/90 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary">
                    Studio Sozo — Ditched Monthly SaaS Rent. Own It Outright.
                  </p>
                  <p className="truncate font-mono text-xs text-muted-foreground">
                    studiosozo.vercel.app/services
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-muted-foreground group-hover:text-primary">
                  Visit site
                  <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* 4-Card Capability Snapshot with PaperCut Sticker Icons */}
        <section className="relative border-t border-dashed pt-6">
          <SideNote side="right">{"Zero per-seat\nSaaS tax"}</SideNote>
          <h2 className="section-heading mb-4">What we build at Studio Sozo</h2>
          <div className="grid gap-3 px-6 sm:grid-cols-2">
            {capabilities.map((item) => {
              const Icon = capabilityIconMap[item.code] ?? KeyOwnershipCutoutIcon;
              return (
                <a
                  key={item.code}
                  href={hero.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-between border border-dashed bg-background p-4 transition-colors hover:bg-muted/15"
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
                          {item.code}
                        </span>
                        <ArrowUpRightIcon className="size-3.5 text-muted-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                      </div>
                    </div>
                    <h3 className="mt-2.5 text-sm font-semibold group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
