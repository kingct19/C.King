"use client";

import { ArrowLeftIcon, DownloadIcon, PrinterIcon } from "lucide-react";
import Link from "next/link";

import { RESUME } from "@/config/site";

export function PrintToolbar() {
  return (
    <div className="mx-auto mb-6 flex w-full max-w-[8.5in] items-center justify-between gap-3 px-8 pt-6 print:hidden">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
      >
        <ArrowLeftIcon className="size-4" />
        Back to site
      </Link>
      <div className="flex items-center gap-2">
        <a
          href={RESUME.href}
          download={RESUME.filename}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-300 px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
        >
          <DownloadIcon className="size-4" />
          Download PDF
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex h-8 items-center gap-1.5 rounded-md bg-zinc-900 px-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
        >
          <PrinterIcon className="size-4" />
          Print
        </button>
      </div>
    </div>
  );
}
