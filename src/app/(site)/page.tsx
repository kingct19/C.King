import { About } from "@/components/landing/about";
import { Bookshelf } from "@/components/landing/bookshelf";
import { Campfire } from "@/components/landing/campfire";
import { CoffeeShopScene } from "@/components/landing/coffee-shop-scene";
import { Experience } from "@/components/landing/experience";
import { Footer } from "@/components/landing/footer";
import { GitHubSection } from "@/components/landing/github-section";
import { Hero } from "@/components/landing/hero";
import { ProfileBanner } from "@/components/landing/profile-banner";
import { HowIWork } from "@/components/landing/how-i-work";
import { HomeProjectExplorer } from "@/components/landing/home-project-explorer";
import { HomeSectionRail } from "@/components/landing/home-section-rail";
import { Services } from "@/components/landing/services";
import { GitSkeleton } from "@/components/skeletons/github-skeleton";
import { Skills } from "@/components/landing/skills";
import Social from "@/components/landing/social";
import { Testimonials } from "@/components/landing/testimonials";
import { Vader } from "@/components/landing/vader";
import { PixelDissolve } from "@/components/ui/pixel-dissolve";
import { SideNote } from "@/components/shared/side-note";
import { projectsConfig, projectsSectionConfig } from "@/config/projects";
import { getEnabledBooks } from "@/config/books";
import { sectionNotes } from "@/config/section-notes";
import { coffeeShopConfig } from "@/config/coffee-shop";
import { siteConfig } from "@/config/site";
import type { SectionId } from "@/config/types";
import type { ReactElement } from "react";
import { Suspense } from "react";
import type { ProjectExplorerItem } from "@/components/project-explorer";

const explorerProjects: ProjectExplorerItem[] = projectsConfig.map(
  (project) => ({
    id: project.id,
    title: project.title,
    year: project.year,
    description: project.description,
    category: project.category,
    status: project.status,
    href: project.href,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    image: project.image,
    imageAlt: project.imageAlt,
    enabled: project.enabled,
    order: project.order,
  }),
);

const staticSections: Record<Exclude<SectionId, "github">, ReactElement> = {
  socials: <Social />,
  skills: <Skills />,
  about: <About />,
  testimonials: <Testimonials />,
  projects: (
    <HomeProjectExplorer
      projects={explorerProjects}
      title={projectsSectionConfig.title}
    />
  ),
  components: <div />,
  bookmarks: <div />,
  bookshelf: <Bookshelf books={getEnabledBooks()} />,
  certifications: <div />,
  sponsors: <div />,
  experience: <Experience />,
  services: <Services />,
  workflow: <HowIWork />,
  contact: <div />,
};

export default function Home() {
  const showGithub = siteConfig.sectionFlags.github;
  const visibleSections = siteConfig.sectionOrder.filter(
    (id) => siteConfig.sectionFlags[id] && (id !== "github" || showGithub),
  );

  return (
    <>
      <main
        className="relative flex min-h-dvh flex-col gap-y-4 overflow-x-clip bg-background pt-8 xl:overflow-x-visible"
      >
        <div id="hero" className="bg-background scroll-mt-20">
          <ProfileBanner />
          <Hero />
        </div>
        {siteConfig.sectionOrder.map((sectionId) => {
          if (
            !siteConfig.sectionFlags[sectionId] ||
            (sectionId === "github" && !showGithub)
          ) {
            return null;
          }

          const content =
            sectionId === "github" ? (
              <Suspense key="github" fallback={<GitSkeleton />}>
                <GitHubSection />
              </Suspense>
            ) : (
              staticSections[sectionId]
            );
          const note = sectionNotes[sectionId];

          return (
            <div
              key={sectionId}
              id={sectionId}
              className="relative bg-background scroll-mt-20"
            >
              {sectionId === "about" && coffeeShopConfig.enabled && <CoffeeShopScene />}
              {sectionId === "about" && <Vader />}
              {note && <SideNote side={note.side}>{note.text}</SideNote>}
              {content}
            </div>
          );
        })}
      </main>
      <Campfire />
      <Footer />
      <HomeSectionRail
        items={[
          { id: "hero", label: "Top" },
          ...visibleSections.map((id) => ({
            id,
            label:
              id === "github"
                ? "GitHub"
                : id === "testimonials"
                  ? "Quotes"
                  : `${id.charAt(0).toUpperCase()}${id.slice(1)}`,
          })),
        ]}
      />
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 mx-auto w-full max-w-[var(--frame-max-w)]">
        <div aria-hidden="true" className="bottom-blur" />
        <PixelDissolve />
      </div>
    </>
  );
}
