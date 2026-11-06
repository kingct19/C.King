import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createElement } from "react";

import { Footer } from "@/components/landing/footer";
import { ComponentsShell } from "@/components/showcase/components-shell";
import { getComponentIcon } from "@/components/showcase/component-icons";
import { SectionRail, type RailItem } from "@/components/section-rail";
import { StreamCopyPageMenu } from "@/components/showcase/stream-copy-page-menu";
import { StreamDocs } from "@/components/showcase/stream-docs";
import { StreamManualInstall } from "@/components/showcase/stream-manual-install";
import { StreamPlayground } from "@/components/showcase/stream-playground";
import { streamDocs } from "@/config/stream-docs";
import {
  findStreamComponent,
  getEnabledStreamComponents,
  getStreamSourceUrl,
} from "@/config/stream-components";
import { SITE } from "@/config/site";
import { highlightCode } from "@/lib/highlight";
import { formatStreamPageMarkdown } from "@/lib/stream-page-markdown";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getEnabledStreamComponents().map((component) => ({ id: component.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const component = findStreamComponent(id);
  if (!component) {
    return { title: "Component Not Found" };
  }
  return {
    title: component.title,
    description: component.description,
    alternates: { canonical: `/components/${component.id}` },
    openGraph: {
      title: `${component.title} · Chandler King`,
      description: component.description,
      url: `/components/${component.id}`,
    },
    twitter: {
      title: `${component.title} · Chandler King`,
      description: component.description,
    },
  };
}

export default async function StreamComponentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const component = findStreamComponent(id);
  if (!component) {
    notFound();
  }

  const Icon = getComponentIcon(component.icon);
  const docs = streamDocs[component.id];
  const source = await readFile(
    path.join(/* turbopackIgnore: true */ process.cwd(), component.sourcePath),
    "utf8",
  );
  const [codeHtml, usageHtml, browserSourceHtml] = await Promise.all([
    highlightCode(source, "tsx"),
    highlightCode(docs.usage, "tsx"),
    highlightCode(docs.browserSource, "tsx"),
  ]);
  const markdown = formatStreamPageMarkdown(component, docs);
  const markdownUrl = `${SITE.url}/components/${component.id}/markdown`;
  const railItems: RailItem[] = getEnabledStreamComponents().map((item) => {
    const ItemIcon = getComponentIcon(item.icon);
    return {
      id: item.id,
      label: item.title,
      href: `/components/${item.id}`,
      card: {
        title: item.title,
        description: item.summary,
        icon: createElement(ItemIcon, { className: "size-4" }),
      },
    };
  });

  return (
    <>
      <ComponentsShell>
        <section className="border-t border-dashed pt-14 pb-12">
          <div className="px-6 pt-4">
            <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
              <ol className="flex items-center gap-1.5">
                <li>
                  <Link href="/components" className="hover:text-foreground">
                    Components
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="inline-flex items-center gap-1.5 text-foreground">
                  {createElement(Icon, { className: "size-4 shrink-0 text-muted-foreground" })}
                  {component.title}
                </li>
              </ol>
            </nav>
          </div>

          <div className="section-heading mt-4 flex flex-wrap items-center justify-between gap-3 border-t-0">
            <h1 className="inline-flex items-center gap-2">
              {component.title}
              {component.new ? (
                <span className="-rotate-6 rounded-full bg-primary px-1.5 py-0.5 font-mono text-[9px] leading-3 font-medium tracking-normal text-primary-foreground">
                  New
                </span>
              ) : null}
            </h1>
            <StreamCopyPageMenu
              markdown={markdown}
              markdownUrl={markdownUrl}
              githubUrl={getStreamSourceUrl(component.sourcePath)}
              componentTitle={component.title}
            />
          </div>

          <div className="mt-3 px-6">
            <p className="text-base leading-relaxed text-muted-foreground">
              {component.description}
            </p>
          </div>

          <StreamPlayground
            componentId={component.id}
            title={component.title}
            source={source}
            codeHtml={codeHtml}
          />

          <StreamDocs
            docs={docs}
            usageHtml={usageHtml}
            browserSourceHtml={browserSourceHtml}
          />
          <StreamManualInstall title={component.title} docs={docs} />
        </section>
      </ComponentsShell>
      <SectionRail activeId={component.id} items={railItems} />
      <Footer />
    </>
  );
}
