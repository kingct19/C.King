"use client";

import { MoonStarIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef } from "react";

import { ThemeToggleCircular } from "@/components/theme-toggle-circular";
import { Button } from "@/components/ui/button";
import {
  applyThemeClass,
  getNextTheme,
  type ThemeName,
} from "@/lib/theme-transition";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const nextThemeRef = useRef<ThemeName>("dark");

  return (
    <ThemeToggleCircular
      onToggle={() => {
        const nextTheme = getNextTheme();
        nextThemeRef.current = nextTheme;
        applyThemeClass(nextTheme);
      }}
      onComplete={() => setTheme(nextThemeRef.current)}
    >
      <Button variant="ghost" size="icon" aria-label="Toggle theme">
        <SunIcon className="hidden [html.light_&]:block" />
        <MoonStarIcon className="hidden [html.dark_&]:block" />
      </Button>
    </ThemeToggleCircular>
  );
}
