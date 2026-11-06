import { ImageResponse } from "next/og";

import { findStreamComponent } from "@/config/stream-components";
import { SITE } from "@/config/site";

export const alt = "Stream overlay component";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const component = findStreamComponent(id);
  const title = component?.title ?? "Stream overlay";
  const description =
    component?.description ??
    "A browser-source overlay for OBS and TikTok Live Studio.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#141414",
          color: "#f5f5f5",
          padding: 56,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px dashed rgba(255,255,255,0.35)",
            padding: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "ui-monospace, monospace",
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.62)",
            }}
          >
            <span style={{ display: "flex" }}>Stream overlay</span>
            <span style={{ display: "flex" }}>{SITE.wordmark}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Georgia, serif",
                fontSize: 84,
                fontStyle: "italic",
                lineHeight: 0.95,
                letterSpacing: -1,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                maxWidth: 860,
                fontSize: 28,
                lineHeight: 1.35,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              {description}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "ui-monospace, monospace",
              fontSize: 22,
              letterSpacing: 1,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {`${SITE.domain}/components/${component?.id ?? id}`}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
