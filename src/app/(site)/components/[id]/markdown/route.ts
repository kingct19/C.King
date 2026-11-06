import { findStreamComponent } from "@/config/stream-components";
import { streamDocs } from "@/config/stream-docs";
import { formatStreamPageMarkdown } from "@/lib/stream-page-markdown";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const component = findStreamComponent(id);
  if (!component) {
    return new Response("Not found", { status: 404 });
  }

  const body = formatStreamPageMarkdown(component, streamDocs[component.id]);
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "noindex",
    },
  });
}
