import { About } from "@/components/site/about";
import { ContactSection } from "@/components/site/contact-section";
import { ExperienceSection } from "@/components/site/experience-section";
import { Overview } from "@/components/site/overview";
import { SectionSeparator } from "@/components/site/panel";
import { Profile } from "@/components/site/profile";
import { ProjectsSection } from "@/components/site/projects-section";
import { ScrollTop } from "@/components/site/scroll-top";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SocialLinks } from "@/components/site/social-links";
import { Stack } from "@/components/site/stack";
import { WorkWithSection } from "@/components/site/work-with-section";
import { getGitHubProjects } from "@/lib/github-repos";

export default async function Home() {
  const projects = await getGitHubProjects();

  return (
    <div className="max-w-screen overflow-x-clip">
      <SiteHeader />

      <main id="main-content" className="mx-auto px-4 md:max-w-3xl">
        <Profile />
        <SectionSeparator />
        <Overview />
        <SocialLinks />
        <SectionSeparator />
        <About />
        <SectionSeparator />
        <ExperienceSection />
        <SectionSeparator />
        <ProjectsSection projects={projects} />
        <SectionSeparator />
        <Stack />
        <SectionSeparator />
        <WorkWithSection />
        <SectionSeparator />
        <ContactSection />
        <div className="h-4 border-x border-line" />
      </main>

      <div className="mx-auto px-4 md:max-w-3xl">
        <SiteFooter />
      </div>

      <ScrollTop />
    </div>
  );
}
