"use client";

import { BeRightBack } from "@/components/stream/be-right-back";
import { FollowAlert } from "@/components/stream/follow-alert";
import { LowerThird } from "@/components/stream/lower-third";
import { StartingSoon } from "@/components/stream/starting-soon";
import { SubAlert } from "@/components/stream/sub-alert";
import { OfflineBanner } from "@/components/stream/offline-banner";
import { Stinger } from "@/components/stream/stinger";
import { TwitchBanner } from "@/components/stream/twitch-banner";
import { TwitchPanels } from "@/components/stream/twitch-panels";
import { WebcamFrame } from "@/components/stream/webcam-frame";
import type { StreamCopy } from "@/config/stream-copy";
import type { StreamComponentId, StreamLayout } from "@/config/stream-components";

export function StreamOverlay({
  id,
  layout,
  preview = false,
  copy,
  alertKey,
  demo = false,
}: {
  id: StreamComponentId;
  layout: StreamLayout;
  preview?: boolean;
  copy?: StreamCopy;
  alertKey?: string;
  demo?: boolean;
}) {
  switch (id) {
    case "starting-soon":
      return (
        <StartingSoon
          layout={layout}
          preview={preview}
          eyebrow={copy?.eyebrow}
          title={copy?.title}
          badge={copy?.badge}
          ticker={copy?.ticker}
        />
      );
    case "lower-third":
      return (
        <LowerThird
          layout={layout}
          preview={preview}
          eyebrow={copy?.eyebrow}
          name={copy?.name}
          role={copy?.role}
          avatar={copy?.avatar}
        />
      );
    case "follow-alert":
      return (
        <FollowAlert
          layout={layout}
          preview={preview}
          label={copy?.label}
          username={copy?.username}
          alertKey={alertKey}
          demo={demo}
        />
      );
    case "webcam-frame":
      return (
        <WebcamFrame layout={layout} preview={preview} />
      );
    case "stinger":
      return (
        <Stinger
          layout={layout}
          preview={preview}
          eyebrow={copy?.eyebrow}
          wordmark={copy?.wordmark}
        />
      );
    case "twitch-banner":
      return (
        <TwitchBanner layout={layout} title={copy?.title} badge={copy?.badge} />
      );
    case "offline-banner":
      return (
        <OfflineBanner layout={layout} title={copy?.title} badge={copy?.badge} />
      );
    case "be-right-back":
      return <BeRightBack layout={layout} title={copy?.title} />;
    case "sub-alert":
      return (
        <SubAlert
          layout={layout}
          preview={preview}
          username={copy?.username}
          alertKey={alertKey}
          demo={demo}
        />
      );
    case "twitch-panels":
      return <TwitchPanels layout={layout} preview={preview} />;
    default: {
      const exhaustive: never = id;
      return exhaustive;
    }
  }
}
