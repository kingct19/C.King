"use client";

import { useCallback, useState } from "react";
import { FileDownIcon } from "lucide-react";

import { PreviewBox } from "@/components/showcase/preview-box";
import { StreamInstallCommand } from "@/components/showcase/stream-install-command";
import { StreamLayoutToggle } from "@/components/showcase/stream-layout-toggle";
import { StreamPreviewStage } from "@/components/showcase/stream-preview-stage";
import { offlineBannerLayout } from "@/components/stream/offline-banner";
import { StreamOverlay } from "@/components/stream/stream-overlay";
import { twitchBannerLayout } from "@/components/stream/twitch-banner";
import { Button } from "@/components/ui/button";
import { STREAM_COPY } from "@/config/stream-copy";
import {
  findStreamComponent,
  type StreamApp,
  type StreamComponentId,
  type StreamLayout,
} from "@/config/stream-components";
import { downloadBannerPng } from "@/lib/twitch-banner-png";
import { downloadTwitchPanels } from "@/lib/twitch-panel-png";

export function StreamPlayground({
  componentId,
  title,
  source,
  codeHtml,
}: {
  componentId: StreamComponentId;
  title: string;
  source: string;
  codeHtml: string;
}) {
  const [layout, setLayout] = useState<StreamLayout>("desktop");
  const [app, setApp] = useState<StreamApp>("obs");
  const [downloading, setDownloading] = useState(false);
  const [downloadFailed, setDownloadFailed] = useState(false);
  const canvas = findStreamComponent(componentId)?.previewCanvas;

  const downloadBanner = useCallback(async () => {
    setDownloading(true);
    setDownloadFailed(false);
    try {
      if (componentId === "twitch-panels") {
        await downloadTwitchPanels();
        return;
      }
      const banner =
        componentId === "twitch-banner"
          ? twitchBannerLayout
          : componentId === "offline-banner"
            ? offlineBannerLayout
            : null;
      if (!banner) return;
      const copy =
        componentId === "offline-banner"
          ? STREAM_COPY["offline-banner"]
          : STREAM_COPY["twitch-banner"];
      await downloadBannerPng(banner, {
        title: copy.title ?? "",
        badge: copy.badge ?? "",
      });
    } catch {
      setDownloadFailed(true);
    } finally {
      setDownloading(false);
    }
  }, [componentId]);

  const handleLayoutChange = useCallback((next: StreamLayout) => {
    setLayout(next);
    setApp(next === "mobile" ? "tiktok" : "obs");
  }, []);

  return (
    <>
      <PreviewBox
        componentId={componentId}
        ariaLabel={`${title} preview`}
        rawCode={source}
        codeHtml={codeHtml}
        preview={
          <StreamPreviewStage layout={layout} canvas={canvas} className="border-0">
            <StreamOverlay
              key={`${componentId}-${layout}`}
              id={componentId}
              layout={layout}
              preview
            />
          </StreamPreviewStage>
        }
      />

      <section className="relative mx-3 mb-2 overflow-hidden rounded-2xl border bg-muted/10 sm:mx-6">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <h2 className="text-sm font-medium tracking-tight">Props</h2>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed px-4 py-3">
          <div>
            <p className="text-sm font-medium">{canvas ? "Size" : "Layout"}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {canvas
                ? `Still image, ${canvas.label}. ${canvas.detail}`
                : "Desktop 16:9 for OBS, or mobile 9:16 for TikTok Live Studio."}
            </p>
            {downloadFailed ? (
              <p className="mt-1 text-xs text-muted-foreground">The PNG didn’t save. Try again.</p>
            ) : null}
          </div>
          {canvas ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={downloadBanner}
              disabled={downloading}
            >
              <FileDownIcon />
              {downloading
                ? "Preparing"
                : componentId === "twitch-panels"
                  ? "Download PNGs"
                  : "Download PNG"}
            </Button>
          ) : (
            <StreamLayoutToggle value={layout} onChange={handleLayoutChange} />
          )}
        </div>
      </section>

      <section className="px-6 py-6">
        <h2 className="text-base font-medium tracking-tight">Installation</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {canvas
            ? `${title} is a still ${canvas.label} PNG. ${canvas.detail}`
            : `${title} is a browser-source overlay. Copy the URL for OBS or TikTok Live Studio. The live page has no site chrome and a transparent background.`}
        </p>
        {canvas ? null : (
          <StreamInstallCommand
            className="mt-4"
            ids={[componentId]}
            layout={layout}
            app={app}
            onAppChange={setApp}
          />
        )}
      </section>
    </>
  );
}
