import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StreamOverlay } from "@/components/stream/stream-overlay";
import { parseStreamCopy } from "@/config/stream-copy";
import {
  findStreamComponent,
  getEnabledStreamComponents,
  parseStreamLayout,
} from "@/config/stream-components";

export const dynamicParams = false;

function readAlertKey(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  const cleaned = raw.trim().slice(0, 80);
  return cleaned.length > 0 ? cleaned : undefined;
}

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
    return { title: "Overlay Not Found", robots: { index: false, follow: false } };
  }
  return {
    title: `${component.title} overlay`,
    description: component.description,
    robots: { index: false, follow: false },
  };
}

export default async function LiveOverlayPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const component = findStreamComponent(id);
  if (!component) {
    notFound();
  }

  const layoutValue = Array.isArray(query.layout) ? query.layout[0] : query.layout;
  const layout = parseStreamLayout(layoutValue);
  const copy = parseStreamCopy(query);
  const alertKey = readAlertKey(query.key);
  const demoValue = Array.isArray(query.demo) ? query.demo[0] : query.demo;

  return (
    <div className="h-screen w-screen overflow-hidden bg-transparent">
      <StreamOverlay
        id={component.id}
        layout={layout}
        copy={copy}
        alertKey={alertKey}
        demo={demoValue === "1"}
      />
    </div>
  );
}
