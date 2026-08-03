"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu } from "@tabler/icons-react";

export type BlogPost = {
  title: string;
  summary?: string;
  date: string;
  author: string;
  authorImage: string;
  thumbnail: string;
  content: string;
};

export type TocLink = {
  title: string;
  href: string;
};

type BlogContentWithTocProps = {
  blog: BlogPost;
  toc: TocLink[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BlogContentWithToc({ blog, toc }: BlogContentWithTocProps) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 md:flex-row md:px-8">
      <Toc links={toc} />
      <article className="flex max-w-2xl flex-1 flex-col pb-16">
        <div className="relative h-60 w-full overflow-hidden rounded-3xl border border-line md:h-[30rem]">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 42rem"
          />
        </div>

        <h1 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {blog.title}
        </h1>

        {blog.summary ? (
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {blog.summary}
          </p>
        ) : null}

        <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:text-brand-blue prose-img:rounded-xl">
          <ReactMarkdown
            components={{
              h2: ({ children }) => {
                const text = String(children);
                return (
                  <h2 id={slugify(text)} className="scroll-mt-24">
                    {children}
                  </h2>
                );
              },
              h3: ({ children }) => {
                const text = String(children);
                return (
                  <h3 id={slugify(text)} className="scroll-mt-24">
                    {children}
                  </h3>
                );
              },
              img: ({ src, alt }) => {
                if (!src || typeof src !== "string") return null;
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt={alt ?? ""} className="rounded-xl border border-line" />
                );
              },
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>

        <div className="mt-10 max-w-2xl">
          <div className="h-px w-full bg-border" />
        </div>

        <div className="mt-8 flex items-center">
          <Image
            src={blog.authorImage}
            alt={blog.author}
            width={20}
            height={20}
            className="size-5 rounded-full object-cover"
          />
          <p className="pl-2 text-sm text-muted-foreground">{blog.author}</p>
          <div className="mx-2 size-1 rounded-full bg-border" />
          <p className="pl-1 text-sm text-muted-foreground">
            {format(new Date(blog.date), "LLLL d, yyyy")}
          </p>
        </div>
      </article>
    </div>
  );
}

function Toc({ links }: { links: TocLink[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Table of contents"
        className="sticky top-20 left-0 hidden max-w-xs flex-col self-start pr-10 md:flex"
      >
        <p className="mb-2 px-2 font-mono text-xs tracking-wide text-muted-foreground uppercase">
          On this page
        </p>
        {links.map((link, index) => (
          <Link
            className="group/toc-link relative rounded-lg px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            key={link.href}
            href={link.href}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === index && (
              <motion.span
                layoutId="toc-indicator"
                className="absolute top-0 left-0 h-full w-1 rounded-tr-full rounded-br-full bg-border"
              />
            )}
            <span className="inline-block transition duration-200 group-hover/toc-link:translate-x-1">
              {link.title}
            </span>
          </Link>
        ))}
      </nav>

      <div className="sticky top-20 z-20 flex w-full flex-col items-end self-start md:hidden">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Table of contents"
          className="flex size-10 items-center justify-center rounded-full border border-line bg-background shadow-sm"
        >
          <IconMenu className="size-5 text-foreground" />
        </button>
        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 flex flex-col items-end rounded-3xl border border-line bg-background p-4 shadow-sm"
            >
              {links.map((link, index) => (
                <Link
                  className="group/toc-link relative rounded-lg px-2 py-1 text-right text-sm text-muted-foreground transition-colors hover:text-foreground"
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {hovered === index && (
                    <motion.span
                      layoutId="toc-indicator-mobile"
                      className="absolute top-0 left-0 h-full w-1 rounded-tr-full rounded-br-full bg-border"
                    />
                  )}
                  <span className="inline-block transition duration-200 group-hover/toc-link:translate-x-1">
                    {link.title}
                  </span>
                </Link>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
