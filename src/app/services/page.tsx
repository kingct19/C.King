import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";

import { BorderGradientLink } from "@/components/border-gradient";
import { ScrollTop } from "@/components/site/scroll-top";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
  SectionSeparator,
} from "@/components/site/panel";
import { SpotlightCard } from "@/components/spotlight-card";
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

export default function ServicesPage() {
  const { hero, offers, carePlan, caseStudies, faq, closingCta } = SERVICES_PAGE;

  return (
    <div className="max-w-screen overflow-x-clip">
      <SiteHeader />

      <main id="main-content" className="mx-auto w-full min-w-0 px-4 md:max-w-3xl">
        {/* Hero */}
        <section className="border-x border-line">
          <div className="relative p-4">
            <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[569/362]">
              <Image
                src="/images/sozo-banner.png"
                alt="Sozo Tech Enterprise"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="screen-line-top px-4 pb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              {hero.headline}
            </h1>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
              {hero.subhead}
            </p>
            <BorderGradientLink
              href={hero.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-9 w-fit items-center rounded-full bg-brand-blue px-4 text-sm font-medium text-white"
            >
              {hero.cta.label}
            </BorderGradientLink>
          </div>
        </section>

        <SectionSeparator />

        {/* Offers */}
        <Panel>
          <PanelHeader>
            <PanelTitle>What we build</PanelTitle>
          </PanelHeader>
          <PanelContent>
            <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {offers.map((offer) => (
                <li key={offer.title} className="min-w-0">
                  <SpotlightCard
                    spotlightColor="rgba(0, 149, 246, 0.15)"
                    hoverScale={1.01}
                    className="h-full w-full rounded-lg shadow-none"
                  >
                    <div className="flex h-full flex-col p-4">
                      <h3 className="font-medium">{offer.title}</h3>
                      <p className="mt-1 font-mono text-sm text-brand-blue">{offer.price}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{offer.audience}</p>
                      <ul className="mt-3 flex flex-col gap-1.5">
                        {offer.points.map((point) => (
                          <li
                            key={point}
                            className="text-sm leading-relaxed text-muted-foreground before:mr-2 before:text-foreground/40 before:content-['·']"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SpotlightCard>
                </li>
              ))}
            </ul>
          </PanelContent>
        </Panel>

        <SectionSeparator />

        {/* Care Plan */}
        <Panel>
          <PanelContent>
            <div className="rounded-lg border border-line bg-muted/30 px-4 py-5 sm:px-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-semibold tracking-tight">{carePlan.title}</h2>
                <p className="font-mono text-sm text-brand-blue">{carePlan.price}</p>
              </div>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
                {carePlan.description}
              </p>
            </div>
          </PanelContent>
        </Panel>

        <SectionSeparator />

        {/* Case studies */}
        <Panel>
          <PanelHeader>
            <PanelTitle>Selected work</PanelTitle>
          </PanelHeader>
          <PanelContent className="flex flex-col gap-4">
            {caseStudies.map((study) => (
              <a
                key={study.title}
                href={study.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg border border-line p-4 transition-colors hover:border-foreground/20"
              >
                <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                  {study.framing}
                </p>
                <h3 className="mt-1 flex items-center gap-1.5 font-medium">
                  {study.title}
                  <ArrowUpRightIcon className="size-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {study.summary}
                </p>
              </a>
            ))}
          </PanelContent>
        </Panel>

        <SectionSeparator />

        {/* FAQ */}
        <Panel>
          <PanelHeader>
            <PanelTitle>FAQ</PanelTitle>
          </PanelHeader>
          <PanelContent>
            <dl className="flex flex-col gap-5">
              {faq.map((item) => (
                <div key={item.q}>
                  <dt className="font-medium">{item.q}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
                </div>
              ))}
            </dl>
          </PanelContent>
        </Panel>

        <SectionSeparator />

        {/* Closing CTA */}
        <Panel>
          <PanelContent className="flex flex-col items-start gap-3 py-8">
            <h2 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">
              {closingCta.headline}
            </h2>
            <p className="max-w-prose text-sm text-muted-foreground">{closingCta.subhead}</p>
            <BorderGradientLink
              href={closingCta.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex h-9 w-fit items-center rounded-full bg-brand-blue px-4 text-sm font-medium text-white"
            >
              {closingCta.cta.label}
            </BorderGradientLink>
          </PanelContent>
        </Panel>

        <div className="h-4 border-x border-line" />
      </main>

      <div className="mx-auto w-full min-w-0 px-4 md:max-w-3xl">
        <SectionSeparator />
        <SiteFooter />
      </div>

      <ScrollTop />
    </div>
  );
}
