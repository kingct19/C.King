"use client";

import { DownloadIcon, PrinterIcon } from "lucide-react";

import { RESUME } from "@/config/site";

export function PrintToolbar() {
  return (
    <div className="flex flex-wrap items-center gap-2 print:hidden">
      <a
        href={RESUME.href}
        download={RESUME.filename}
        className="btn-fill-soft h-9 px-4"
      >
        <DownloadIcon className="size-4" />
        Download PDF
      </a>
      <button type="button" onClick={() => window.print()} className="btn-fill h-9">
        <PrinterIcon className="size-4" />
        Print
      </button>
    </div>
  );
}
