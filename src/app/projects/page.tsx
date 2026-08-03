import type { Metadata } from "next";

import { SectionSeparator } from "@/components/site/panel";
import { ProjectsStickyScroll } from "@/components/site/projects-sticky-scroll";
import { ScrollTop } from "@/components/site/scroll-top";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { PROJECT_PAGES } from "@/config/project-pages";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Selected products and builds by ${SITE.name} — case studies for web, mobile, and AI work.`,
  openGraph: {
    title: "Projects · Chandler King",
    description: `Selected products and builds by ${SITE.name} — case studies for web, mobile, and AI work.`,
    url: "/projects",
  },
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsIndexPage() {
  return (
    <div className="max-w-screen overflow-x-clip">
      <SiteHeader />

      <main id="main-content">
        <ProjectsStickyScroll projects={PROJECT_PAGES} />
      </main>

      <div className="mx-auto w-full min-w-0 px-4 md:max-w-3xl">
        <SectionSeparator />
        <SiteFooter />
      </div>

      <ScrollTop />
    </div>
  );
}
