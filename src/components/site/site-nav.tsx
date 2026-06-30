"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const SECTION_IDS = ["about", "experience", "projects", "work-with", "contact"] as const;

type NavItem = {
  label: string;
  href: string;
  sectionId?: (typeof SECTION_IDS)[number];
};

export function SiteNav({ items }: { items: NavItem[] }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
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
  }, []);

  return (
    <ul className="flex items-center justify-end gap-3 sm:justify-center sm:gap-4">
      {items.map((item) => {
        const isActive = item.sectionId && activeSection === item.sectionId;

        return (
          <li key={item.href} className="shrink-0">
            <Link
              href={item.href}
              className={cn(
                "relative text-sm font-medium transition-colors",
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
