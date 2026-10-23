"use client";

import {
  Contrast,
  BookmarkCheckIcon,
  FolderOpen,
  HeartHandshake,
  Home,
  Layers,
  Link,
  Monitor,
  Moon,
  Sun,
  Terminal,
} from "@/components/shared/site-icons";
import { FaGithub } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useMemo } from "react";

import {
  CommandPalette,
  type CommandPaletteGroup,
  type CommandPaletteItem,
  type CommandPalettePage,
} from "@/components/ui/command-palette";
import { bookshelfConfig } from "@/config/books";
import { projectsConfig } from "@/config/projects";
import { CALENDLY_URL } from "@/config/site";

export function SiteCommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { setTheme } = useTheme();

  const groups = useMemo<CommandPaletteGroup[]>(() => {
    const go = (href: string) => () => router.push(href);

    const projectItems: CommandPaletteItem[] = projectsConfig.map((project) => ({
      id: `project-${project.id}`,
      label: project.title,
      icon: <FolderOpen className="size-4" />,
      keywords: ["project", "case study", project.category, project.id],
      onSelect: go(project.href ?? `/projects/${project.id}`),
    }));

    return [
      {
        label: "Navigate",
        items: [
          {
            id: "go-home",
            label: "Home",
            icon: <Home className="size-4" />,
            keywords: ["landing", "start", "top"],
            onSelect: go("/"),
          },
          {
            id: "go-projects",
            label: "All Work & Projects",
            icon: <Layers className="size-4" />,
            keywords: ["work", "portfolio", "projects", "case studies"],
            onSelect: go("/projects"),
          },
          {
            id: "go-services",
            label: "Services & Sozo Tech",
            icon: <HeartHandshake className="size-4" />,
            keywords: ["services", "sozo", "pricing", "mvp", "agency"],
            onSelect: go("/services"),
          },
          {
            id: "go-resume",
            label: "Resume / CV",
            icon: <Terminal className="size-4" />,
            keywords: ["resume", "cv", "pdf", "experience"],
            onSelect: go("/resume"),
          },
          {
            id: "go-bookshelf",
            label: bookshelfConfig.title,
            icon: <BookmarkCheckIcon className="size-4" />,
            keywords: ["books", "reading", "library", "shelf"],
            onSelect: go(bookshelfConfig.href),
          },
        ],
      },
      { label: "Projects", items: projectItems },
      {
        label: "Actions",
        items: [
          {
            id: "book-call",
            label: "Book 30-min Scoping Call",
            icon: <HeartHandshake className="size-4" />,
            badge: "Google Meet",
            keywords: ["call", "book", "meeting", "schedule", "google meet"],
            onSelect: () => window.open(CALENDLY_URL, "_blank"),
          },
          {
            id: "open-github",
            label: "Open GitHub (@kingct19)",
            icon: <FaGithub className="size-4" />,
            badge: "external",
            keywords: ["repo", "source", "repository", "code", "github"],
            onSelect: () => window.open("https://github.com/kingct19", "_blank"),
          },
          {
            id: "copy-email",
            label: "Copy Email (chandler@studiosozo.dev)",
            icon: <Link className="size-4" />,
            keywords: ["email", "contact", "copy", "mail"],
            onSelect: () => {
              navigator.clipboard
                ?.writeText("chandler@studiosozo.dev")
                .catch(() => {});
            },
          },
          {
            id: "change-theme",
            label: "Change theme…",
            icon: <Contrast className="size-4" />,
            keywords: ["dark", "light", "system", "appearance", "mode"],
            page: "theme",
          },
        ],
      },
    ];
  }, [router]);

  const pages = useMemo<CommandPalettePage[]>(
    () => [
      {
        id: "theme",
        label: "Theme",
        placeholder: "Search themes…",
        items: [
          {
            id: "theme-light",
            label: "Light",
            icon: <Sun className="size-4" />,
            onSelect: () => setTheme("light"),
          },
          {
            id: "theme-dark",
            label: "Dark",
            icon: <Moon className="size-4" />,
            onSelect: () => setTheme("dark"),
          },
          {
            id: "theme-system",
            label: "System",
            icon: <Monitor className="size-4" />,
            onSelect: () => setTheme("system"),
          },
        ],
      },
    ],
    [setTheme],
  );

  return (
    <CommandPalette
      groups={groups}
      pages={pages}
      open={open}
      onOpenChange={onOpenChange}
      recents
      disableOnMobile
      hotkey={false}
    />
  );
}
