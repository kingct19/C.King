import { OverlayRoot } from "@/components/stream/overlay-root";
import { PANEL_MARK_SVG, type PanelMarkId } from "@/config/stream-panel-marks";
import { TWITCH_PANELS, type TwitchPanel } from "@/config/stream-panels";
import { footerConfig, siteConfig } from "@/config/site";
import type { StreamLayout } from "@/config/stream-components";
import styles from "./twitch-panels.module.css";

function hasLines(panel: TwitchPanel): panel is TwitchPanel & { lines: readonly string[] } {
  return "lines" in panel;
}

const COFFEE = "/images/profile-stickers/coffee.webp";

function Mark({ id }: { id: TwitchPanel["id"] }) {
  switch (id) {
    case "about":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={siteConfig.personal.avatar.src}
          alt=""
          className={styles.glyph}
          draggable={false}
        />
      );
    case "donations":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={COFFEE} alt="" className={styles.glyph} draggable={false} />
      );
    case "instagram":
    case "twitter":
    case "discord":
    case "subs":
      return <Logo id={id} />;
    default: {
      const unreachable: never = id;
      return unreachable;
    }
  }
}

function Logo({ id }: { id: PanelMarkId }) {
  return <span className={styles.mark} dangerouslySetInnerHTML={{ __html: PANEL_MARK_SVG[id] }} />;
}

function Panel({ panel }: { panel: TwitchPanel }) {
  return (
    <article className={styles.panel}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={footerConfig.artwork.src}
        alt=""
        width={footerConfig.artwork.width}
        height={footerConfig.artwork.height}
        draggable={false}
        className={styles.forest}
      />
      <div className={styles.content}>
        <p className={styles.eyebrow}>{panel.eyebrow}</p>
        <div className={styles.heading}>
          <Mark id={panel.id} />
          <h3 className={styles.title}>{panel.title}</h3>
        </div>
        {"body" in panel ? <p className={styles.body}>{panel.body}</p> : null}
        {hasLines(panel) ? (
          <div className={styles.card}>
            {panel.lines.map((line) => (
              <p key={line} className={styles.line}>
                {line}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function TwitchPanels({
  layout,
}: {
  layout: StreamLayout;
  preview?: boolean;
}) {
  return (
    <OverlayRoot>
      <div className={styles.set} data-layout={layout}>
        {TWITCH_PANELS.map((panel) => (
          <Panel key={panel.id} panel={panel} />
        ))}
      </div>
    </OverlayRoot>
  );
}
