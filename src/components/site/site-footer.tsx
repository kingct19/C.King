import { MailIcon } from "lucide-react";

import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/site/social-icons";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { FOOTER, SITE, SOCIAL_LINKS } from "@/config/site";

function FooterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[8rem_1fr] gap-4 font-mono text-sm max-sm:grid-cols-1 max-sm:gap-0.5">
      <dt className="text-right text-muted-foreground/60 max-sm:text-left">{label}</dt>
      <dd className="flex flex-col items-start gap-0.5">{children}</dd>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link-underline text-foreground"
    >
      {children}
    </a>
  );
}

const FOOTER_SOCIALS = [
  { name: "GitHub", icon: GitHubIcon },
  { name: "LinkedIn", icon: LinkedInIcon },
  { name: "Instagram", icon: InstagramIcon },
  { name: "Mail", icon: MailIcon },
] as const;

export function SiteFooter() {
  return (
    <footer className="screen-line-top border-x border-line">
      <dl className="flex flex-col gap-3 px-4 py-10">
        <FooterRow label="Crafted by">
          <FooterLink href={FOOTER.craftedBy.href}>{FOOTER.craftedBy.text}</FooterLink>
        </FooterRow>

        <FooterRow label="Built with">
          {FOOTER.builtWith.map((item) => (
            <FooterLink key={item.text} href={item.href}>
              {item.text}
            </FooterLink>
          ))}
        </FooterRow>

        <FooterRow label="Infrastructure">
          <FooterLink href={FOOTER.infrastructure.href}>
            {FOOTER.infrastructure.text}
          </FooterLink>
        </FooterRow>

        <FooterRow label="Source code">
          <FooterLink href={FOOTER.sourceCode.href}>{FOOTER.sourceCode.text}</FooterLink>
        </FooterRow>
      </dl>

      <div className="screen-line-top flex items-center justify-center gap-2 py-3">
        {FOOTER_SOCIALS.map((social) => {
          const link = SOCIAL_LINKS.find((s) => s.name === social.name);
          if (!link) return null;
          return (
            <a
              key={social.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <social.icon className="size-4" />
            </a>
          );
        })}
        <span className="mx-1 h-4 w-px bg-line" aria-hidden />
        <ThemeToggle />
      </div>

      {/* Giant outlined wordmark, echoing the design's building-block lettering. */}
      <div className="screen-line-top overflow-hidden py-6" aria-hidden>
        <p
          className="text-center font-mono text-[clamp(4rem,14vw,9rem)] leading-none font-bold tracking-tighter text-transparent uppercase select-none"
          style={{ WebkitTextStroke: "1px var(--color-line)" }}
        >
          {SITE.wordmark}
        </p>
      </div>
    </footer>
  );
}
