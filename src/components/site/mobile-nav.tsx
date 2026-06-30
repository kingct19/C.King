"use client";

import Link from "next/link";
import { FileDownIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import { MenuMorphIcon } from "@/components/morph";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { RESUME } from "@/config/site";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
};

const panelEase = [0.22, 1, 0.36, 1] as const;

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const panelTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: panelEase };

  const itemTransition = (index: number) =>
    reducedMotion
      ? { duration: 0 }
      : { duration: 0.24, delay: 0.04 + index * 0.045, ease: panelEase };

  return (
    <div className="md:hidden">
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <MenuMorphIcon open={open} />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: reducedMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: reducedMotion ? 1 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.22 }}
              className="fixed inset-0 top-14 z-40 bg-background/60 backdrop-blur-sm"
              onClick={close}
            />
            <motion.nav
              id="mobile-nav-panel"
              aria-label="Mobile"
              initial={reducedMotion ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={panelTransition}
              className="absolute top-full right-0 left-0 z-50 origin-top border-b border-line bg-background px-4 py-4 shadow-lg"
            >
              <ul className="flex flex-col gap-1">
                {items.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={reducedMotion ? false : { opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, x: -10 }}
                    transition={itemTransition(index)}
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      className={cn(
                        "flex min-h-11 items-center rounded-lg px-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, x: -10 }}
                transition={itemTransition(items.length)}
              >
                <a
                  href={RESUME.href}
                  download={RESUME.filename}
                  onClick={close}
                  className="mt-3 flex min-h-11 items-center gap-2 rounded-lg px-3 font-mono text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <FileDownIcon className="size-4" />
                  {RESUME.label}
                </a>
              </motion.div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
