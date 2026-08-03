"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const SECTION_IDS = ["about", "experience", "projects", "work-with", "contact"] as const;

type NavItem = {
  label: string;
  href: string;
  sectionId?: (typeof SECTION_IDS)[number];
};

export function SiteNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const sections = SECTION_IDS.flatMap((id) => {
      const element = document.getElementById(id);
      return element ? [{ id, element }] : [];
    });

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    for (const section of sections) {
      observer.observe(section.element);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <ul className="flex items-center justify-center gap-2.5 overflow-x-auto lg:gap-3.5">
      {items.map((item) => {
        const isSectionActive = Boolean(item.sectionId && activeSection === item.sectionId);
        const isPathActive = !item.sectionId && pathname === item.href;
        const isActive = isSectionActive || isPathActive;

        return (
          <li key={item.href} className="shrink-0">
            <Link
              href={item.href}
              className={cn(
                "relative whitespace-nowrap text-xs font-medium transition-colors lg:text-sm",
                isActive
                  ? "text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
