import Link from "next/link";
import { FileDownIcon } from "lucide-react";

import { SiteNav } from "@/components/site/site-nav";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { RESUME, SITE } from "@/config/site";

const NAV_ITEMS = [
  { label: "About", href: "#about", sectionId: "about" as const },
  { label: "Experience", href: "#experience", sectionId: "experience" as const },
  { label: "Projects", href: "#projects", sectionId: "projects" as const },
  { label: "Work with Sozo", href: "#work-with", sectionId: "work-with" as const },
  { label: "Contact", href: "#contact", sectionId: "contact" as const },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/90 pt-2 backdrop-blur-md supports-backdrop-filter:bg-background/75">
      <div className="mx-auto px-4 md:max-w-3xl">
        <div className="screen-line-top screen-line-bottom flex h-12 items-center justify-between gap-2 border-x border-line px-2">
          <Link href="/" aria-label={SITE.name} className="flex shrink-0 items-center px-1">
            <Wordmark />
          </Link>

          <nav
            aria-label="Primary"
            className="min-w-0 flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-none [&::-webkit-scrollbar]:hidden"
          >
            <SiteNav items={NAV_ITEMS} />
          </nav>

          <div className="flex shrink-0 items-center">
            <a
              href={RESUME.href}
              download={RESUME.filename}
              className="hidden items-center gap-1 px-2 font-mono text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              <FileDownIcon className="size-3.5" />
              {RESUME.label}
            </a>
            <Separator
              orientation="vertical"
              className="mx-2 hidden data-vertical:h-4 sm:block"
            />
            <ThemeToggle />
          </div>
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
