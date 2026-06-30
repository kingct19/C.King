const THEME_CLASSES = ["light", "dark"] as const;

export type ThemeName = (typeof THEME_CLASSES)[number];

export function applyThemeClass(theme: ThemeName) {
  const root = document.documentElement;
  root.classList.remove(...THEME_CLASSES);
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

export function getCurrentThemeFromDom(): ThemeName {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function getNextTheme(): ThemeName {
  return getCurrentThemeFromDom() === "dark" ? "light" : "dark";
}
