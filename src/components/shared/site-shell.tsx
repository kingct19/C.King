import { BottomNav } from "@/components/landing/bottom-nav";
import { BackToTop } from "@/components/shared/back-to-top";
import { FrameGutters } from "@/components/shared/frame-gutters";
import { SiteHeader } from "@/components/shared/site-header";
import { JsonLd } from "@/components/site/json-ld";
import { TooltipProvider } from "@/components/ui/tooltip";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={150}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <JsonLd />
      <SiteHeader />
      <FrameGutters />
      <div className="relative mx-auto w-full max-w-[var(--frame-max-w)]">
        <div
          id="main-content"
          className="relative w-full border-x border-dashed bg-muted/20"
        >
          {children}
        </div>
        <BottomNav />
        <BackToTop />
      </div>
    </TooltipProvider>
  );
}
