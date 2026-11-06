import type { SiteNavigationItem } from "@/config/types";

export const navigationConfig = {
  label: "Site navigation",
  menu: "Menu",
  close: "Close navigation",
  search: "Open command palette",
  backToTop: "Back to top",
  githubLabel: "View source on GitHub (opens in a new tab)",
};

export const navigationItems: SiteNavigationItem[] = [
  { id: "home", label: "Home", href: "/", icon: "home", order: 0 },
  { id: "components", label: "Components", href: "/components", icon: "overlay", order: 1 },
  { id: "projects", label: "Work", href: "/projects", icon: "folder", order: 2 },
  { id: "services", label: "Services", href: "/services", icon: "sparkles", order: 3 },
  { id: "resume", label: "Resume", href: "/resume", icon: "terminal", order: 4 },
];
