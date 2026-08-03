import Link from "next/link";
import { CalendarIcon, FileDownIcon } from "lucide-react";

import { MobileNav } from "@/components/site/mobile-nav";
import { SiteNav } from "@/components/site/site-nav";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { CALENDLY_URL, RESUME, SITE } from "@/config/site";

const NAV_ITEMS = [
  { label: "About", href: "/#about", sectionId: "about" as const },
  { label: "Experience", href: "/#experience", sectionId: "experience" as const },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Sozo", href: "/#work-with", sectionId: "work-with" as const },
  { label: "Contact", href: "/#contact", sectionId: "contact" as const },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/90 pt-2 backdrop-blur-md supports-backdrop-filter:bg-background/75">
      <div className="relative mx-auto px-4 md:max-w-3xl">
        <div className="screen-line-top screen-line-bottom flex h-12 items-center gap-2 border-x border-line px-2">
          <Link href="/" aria-label={SITE.name} className="flex shrink-0 items-center px-1">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden min-w-0 flex-1 md:block">
            <SiteNav items={NAV_ITEMS} />
          </nav>

          <div className="ml-auto hidden shrink-0 items-center gap-1 md:flex">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 items-center gap-1 rounded-full bg-brand-blue px-2.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
            >
              <CalendarIcon className="size-3" />
              Book call
            </a>
            <Separator orientation="vertical" className="mx-1 data-vertical:h-4" />
            <a
              href={RESUME.href}
              download={RESUME.filename}
              className="inline-flex items-center gap-1 px-1.5 font-mono text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              aria-label={RESUME.label}
            >
              <FileDownIcon className="size-3.5" />
              {RESUME.label}
            </a>
            <ThemeToggle />
          </div>

          <MobileNav items={NAV_ITEMS} />
        </div>
      </div>
    </header>
  );
}

function Wordmark() {
  return (
    <span className="select-none font-mono text-xl font-bold tracking-tighter">
      {SITE.initials}
      <span className="text-foreground">.</span>
    </span>
  );
}
