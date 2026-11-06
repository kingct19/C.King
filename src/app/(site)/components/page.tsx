import type { Metadata } from "next";

import { Footer } from "@/components/landing/footer";
import { ComponentsShell } from "@/components/showcase/components-shell";
import { StreamCatalog } from "@/components/showcase/stream-catalog";
import { StreamCatalogHero } from "@/components/showcase/stream-catalog-hero";
import { SideNote } from "@/components/shared/side-note";
import { getEnabledStreamComponents } from "@/config/stream-components";
import { sectionNotes } from "@/config/section-notes";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Stream Components",
  description: `Overlays, banners, alerts, webcam frames, and transitions for Twitch and TikTok — copy a URL into OBS or TikTok Live Studio.`,
  alternates: {
    canonical: "/components",
  },
  openGraph: {
    title: "Stream Components · Chandler King",
    description: `Overlays, banners, alerts, webcam frames, and transitions for Twitch and TikTok by ${SITE.name}.`,
    url: "/components",
  },
  twitter: {
    title: "Stream Components · Chandler King",
    description: `Overlays, banners, alerts, webcam frames, and transitions for Twitch and TikTok by ${SITE.name}.`,
  },
};

export default function ComponentsPage() {
  const components = getEnabledStreamComponents();
  const note = sectionNotes.components;

  return (
    <>
      <ComponentsShell>
        <section className="border-t border-dashed pt-14">
          <div>
            <p className="px-6 py-2 text-xs">Components</p>
          </div>
          <h1 className="section-heading">
            drop in.
            <br className="sm:hidden" /> go live.
          </h1>

          <StreamCatalogHero components={components} />

          <div aria-hidden="true" className="blueprint-bg h-5 border-t" />

          <section className="relative">
            {note ? <SideNote side={note.side}>{note.text}</SideNote> : null}
            <h2 className="sr-only">Available Components</h2>
            <StreamCatalog components={components} />
          </section>
        </section>
      </ComponentsShell>
      <Footer />
    </>
  );
}
