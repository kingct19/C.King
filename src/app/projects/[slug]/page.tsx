import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react";

import BlogContentWithToc from "@/block/blog-content-with-toc";
import SimpleBlogWithGrid from "@/block/simple-blog-with-grid";
import { BorderGradientLink } from "@/components/border-gradient";
import { SectionSeparator } from "@/components/site/panel";
import { ScrollTop } from "@/components/site/scroll-top";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import {
  getAllProjectSlugs,
  getProjectBlogContent,
  getProjectPage,
  PROJECT_PAGES,
} from "@/config/project-pages";
import { CALENDLY_URL, SITE } from "@/config/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectPage(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} · Chandler King`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: project.previewImage ? [{ url: project.previewImage }] : undefined,
    },
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectPage(slug);
  if (!project) notFound();

  const { content, toc, date } = getProjectBlogContent(project);
  const others = PROJECT_PAGES.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <div className="max-w-screen overflow-x-clip">
      <SiteHeader />

      <main id="main-content" className="py-8">
        <div className="mx-auto mb-6 w-full max-w-7xl px-4 md:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-3.5" />
            All projects
          </Link>
        </div>

        <BlogContentWithToc
          blog={{
            title: project.title,
            summary: `${project.period} · ${project.tags.slice(0, 3).join(" · ")}`,
            date,
            author: SITE.name,
            authorImage: SITE.avatar,
            thumbnail: project.previewImage ?? SITE.avatar,
            content,
          }}
          toc={toc}
        />

        <div className="mx-auto mt-4 flex w-full max-w-7xl flex-wrap items-center gap-3 px-4 md:px-8">
          {project.href ? (
            <BorderGradientLink
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-fit items-center gap-1 rounded-full bg-brand-blue px-4 text-sm font-medium text-white"
            >
              Visit project
              <ArrowUpRightIcon className="size-4" />
            </BorderGradientLink>
          ) : null}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Book a scoping call →
          </a>
        </div>

        <SimpleBlogWithGrid
          heading="More projects"
          description="Other case studies from products and client builds."
          blogs={others.map((item) => ({
            title: item.title,
            description: item.summary,
            href: `/projects/${item.slug}`,
            image: item.previewImage,
            author: SITE.name,
            authorAvatar: SITE.avatar,
          }))}
        />
      </main>

      <div className="mx-auto w-full min-w-0 px-4 md:max-w-3xl">
        <SectionSeparator />
        <SiteFooter />
      </div>

      <ScrollTop />
    </div>
  );
}
