"use client";

import { useCallback, useState } from "react";

import { StreamInstallCommand } from "@/components/showcase/stream-install-command";
import { StreamLayoutToggle } from "@/components/showcase/stream-layout-toggle";
import type {
  StreamApp,
  StreamComponentDoc,
  StreamLayout,
} from "@/config/stream-components";

export function StreamCatalogHero({
  components,
}: {
  components: StreamComponentDoc[];
}) {
  const ids = components.map((component) => component.id);
  const [layout, setLayout] = useState<StreamLayout>("desktop");
  const [app, setApp] = useState<StreamApp>("obs");

  const handleLayoutChange = useCallback((next: StreamLayout) => {
    setLayout(next);
    setApp(next === "mobile" ? "tiktok" : "obs");
  }, []);

  return (
    <section className="px-6 py-2">
      <div className="mt-4">
        <StreamLayoutToggle value={layout} onChange={handleLayoutChange} />
      </div>
      <StreamInstallCommand
        className="mt-4"
        ids={ids}
        layout={layout}
        app={app}
        onAppChange={setApp}
        rotating
      />
    </section>
  );
}
