import Link from "next/link";

import { SITE } from "@/config/site";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4">
      <div className="screen-line-top screen-line-bottom flex flex-1 flex-col items-center justify-center gap-4 border-x border-line py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Error 404
        </p>
        <h1 className="font-mono text-6xl font-bold tracking-tighter sm:text-8xl">
          404
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          This page doesn&apos;t exist — but {SITE.name}&apos;s portfolio does.
        </p>
        <Link
          href="/"
          className="btn-fill mt-2 inline-flex"
        >
          Back home
        </Link>
      </div>

      <div className="screen-line-top overflow-hidden py-6" aria-hidden>
        <p
          className="text-center font-mono text-[clamp(3rem,12vw,6rem)] leading-none font-bold tracking-tighter text-transparent uppercase select-none"
          style={{ WebkitTextStroke: "1px var(--color-line)" }}
        >
          {SITE.wordmark}
        </p>
      </div>
    </div>
  );
}
