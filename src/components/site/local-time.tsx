"use client";

import { useEffect, useState } from "react";

function getTimeParts(timeZone: string) {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  }).format(now);

  const tzDate = new Date(now.toLocaleString("en-US", { timeZone }));
  const offsetHours = Math.round((tzDate.getTime() - now.getTime()) / 3_600_000);

  let diff = "local time";
  if (offsetHours > 0) diff = `${offsetHours}h ahead`;
  if (offsetHours < 0) diff = `${Math.abs(offsetHours)}h behind`;

  return { time, diff };
}

export function LocalTime({ timeZone }: { timeZone: string }) {
  const [parts, setParts] = useState<{ time: string; diff: string } | null>(null);

  useEffect(() => {
    const update = () => setParts(getTimeParts(timeZone));
    update();
    const timer = setInterval(update, 30_000);
    return () => clearInterval(timer);
  }, [timeZone]);

  if (!parts) {
    return <span className="font-mono text-sm">--:--</span>;
  }

  return (
    <span className="font-mono text-sm">
      {parts.time}
      <span className="text-muted-foreground">{` // ${parts.diff}`}</span>
    </span>
  );
}
