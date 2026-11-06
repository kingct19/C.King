"use client";

import { FileDownIcon, PrinterIcon } from "lucide-react";

import { RESUME } from "@/config/site";

export function PrintToolbar() {
  return (
    <div className="flex flex-wrap items-center gap-2 print:hidden">
      <a
        href={RESUME.href}
        download={RESUME.filename}
        className="micro-press inline-flex h-8 items-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-medium text-background transition-opacity hover:opacity-90"
      >
        <FileDownIcon className="size-3.5" />
        Download PDF
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className="micro-press inline-flex h-8 items-center gap-1.5 rounded-md border border-dashed bg-background px-3 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
      >
        <PrinterIcon className="size-3.5" />
        Print Resume
      </button>
    </div>
  );
}
