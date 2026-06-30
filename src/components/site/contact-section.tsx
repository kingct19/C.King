"use client";

import { ArrowUpRightIcon, BriefcaseBusinessIcon, HandshakeIcon, MailIcon } from "lucide-react";

import { BorderGradientLink } from "@/components/border-gradient";
import { SpotlightCard } from "@/components/spotlight-card";
import { CopyEmailButton } from "@/components/site/copy-email-button";
import { AnimatedPanelTitle } from "@/components/site/animated-panel-title";
import { Panel, PanelContent, PanelHeader } from "@/components/site/panel";
import { CONTACT } from "@/config/site";

export function ContactSection() {
  return (
    <Panel id="contact">
      <PanelHeader>
        <AnimatedPanelTitle>Contact</AnimatedPanelTitle>
      </PanelHeader>

      <PanelContent className="flex flex-col gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <SpotlightCard
            spotlightColor="rgba(0, 149, 246, 0.18)"
            hoverScale={1.02}
            className="rounded-lg shadow-none"
          >
            <div className="flex flex-col gap-3 p-4">
              <div className="flex items-center gap-2">
                <BriefcaseBusinessIcon className="size-4 text-muted-foreground" />
                <h3 className="font-medium">{CONTACT.hire.headline}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {CONTACT.hire.description}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-2">
                <BorderGradientLink
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex h-9 items-center rounded-full bg-brand-blue px-4 text-sm font-medium text-white"
                >
                  <MailIcon className="size-4" />
                  Email me
                </BorderGradientLink>
                <CopyEmailButton email={CONTACT.email} />
              </div>
              <ul className="flex flex-wrap gap-3 pt-1">
                {CONTACT.hire.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground link-underline"
                    >
                      {link.label}
                      <ArrowUpRightIcon className="size-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(0, 149, 246, 0.18)"
            hoverScale={1.02}
            className="rounded-lg shadow-none"
          >
            <div className="flex flex-col gap-3 p-4">
              <div className="flex items-center gap-2">
                <HandshakeIcon className="size-4 text-muted-foreground" />
                <h3 className="font-medium">{CONTACT.partner.headline}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {CONTACT.partner.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                <BorderGradientLink
                  href={CONTACT.partner.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center rounded-full bg-brand-blue px-4 text-sm font-medium text-white"
                >
                  {CONTACT.partner.primaryCta.label}
                  <ArrowUpRightIcon className="size-4" />
                </BorderGradientLink>
                {CONTACT.partner.secondaryCta ? (
                  <a
                    href={CONTACT.partner.secondaryCta.href}
                    className="btn-fill-soft"
                  >
                    {CONTACT.partner.secondaryCta.label}
                    <ArrowUpRightIcon className="size-4" />
                  </a>
                ) : null}
              </div>
            </div>
          </SpotlightCard>
        </div>

        <p className="font-mono text-sm text-muted-foreground">
          <a href={`mailto:${CONTACT.email}`} className="link-underline">
            {CONTACT.email}
          </a>
          {" · "}
          <a href={`tel:${CONTACT.phone.replace(/\D/g, "")}`} className="link-underline">
            {CONTACT.phone}
          </a>
        </p>
      </PanelContent>
    </Panel>
  );
}
