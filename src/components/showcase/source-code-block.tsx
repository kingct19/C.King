"use client";

import { CopyStatusIcon } from "@/components/showcase/copy-status-icon";
import { useCopy } from "@/lib/use-copy";
import { cn } from "@/lib/utils";

export function SourceCodeBlock({
  code,
  codeHtml,
  filename,
  className,
}: {
  code: string;
  codeHtml?: string;
  filename: string;
  className?: string;
}) {
  const { status, copy } = useCopy();

  return (
    <div className={cn("overflow-hidden border-y border-dashed bg-background", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-dashed px-4 py-2">
        <p className="truncate font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
          {filename}
        </p>
        <button
          type="button"
          onClick={() => copy(code)}
          className="micro-press inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-muted-foreground uppercase hover:text-foreground"
        >
          <CopyStatusIcon status={status} className="size-3.5" />
          {status === "copied" ? "Copied" : "Copy"}
        </button>
      </div>
      {codeHtml ? (
        <div
          className="max-h-[32rem] overflow-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed [&_pre]:m-0 [&_pre]:bg-transparent [&_pre]:p-0"
          dangerouslySetInnerHTML={{ __html: codeHtml }}
        />
      ) : (
        <pre className="max-h-[32rem] overflow-auto px-4 py-4 font-mono text-[11px] leading-relaxed text-foreground">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
