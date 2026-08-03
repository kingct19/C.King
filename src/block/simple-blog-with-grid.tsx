"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type BlogGridItem = {
  title: string;
  description: string;
  href: string;
  image?: string;
  author: string;
  authorAvatar: string;
};

type SimpleBlogWithGridProps = {
  heading?: string;
  description?: string;
  blogs: BlogGridItem[];
  className?: string;
};

export default function SimpleBlogWithGrid({
  heading = "More projects",
  description = "Explore more case studies from the portfolio.",
  blogs,
  className,
}: SimpleBlogWithGridProps) {
  return (
    <div className={cn("relative overflow-hidden py-12 md:py-16", className)}>
      <GridPatternContainer className="opacity-50" />
      <div className="relative z-20 mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-8 py-2">
          <h2 className="mb-3 scroll-m-20 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {heading}
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground md:text-base">
            {description}
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard blog={blog} key={blog.href} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogCard({ blog }: { blog: BlogGridItem }) {
  const truncate = (text: string, length: number) =>
    text.length > length ? `${text.slice(0, length)}...` : text;

  return (
    <Link
      className="w-full overflow-hidden rounded-3xl border border-line bg-card transition duration-200 hover:scale-[1.02]"
      href={blog.href}
    >
      {blog.image ? (
        <div className="relative h-52 w-full overflow-hidden bg-muted">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div className="flex h-52 items-center justify-center bg-muted">
          <span className="font-mono text-sm text-muted-foreground">{blog.title}</span>
        </div>
      )}
      <div className="bg-card p-4 md:p-6">
        <div className="mb-2 flex items-center space-x-2">
          <Image
            src={blog.authorAvatar}
            alt={blog.author}
            width={20}
            height={20}
            className="size-5 rounded-full object-cover"
          />
          <p className="text-sm text-muted-foreground">{blog.author}</p>
        </div>
        <p className="mb-2 text-lg font-semibold text-foreground">{blog.title}</p>
        <p className="text-left text-sm text-muted-foreground">
          {truncate(blog.description, 100)}
        </p>
      </div>
    </Link>
  );
}

export function GridPatternContainer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]",
        className
      )}
    >
      <GridPattern />
    </div>
  );
}

export function GridPattern() {
  const columns = 30;
  const rows = 11;
  return (
    <div className="flex flex-shrink-0 scale-105 flex-wrap items-center justify-center gap-x-px gap-y-px bg-muted">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={cn(
                "flex size-10 flex-shrink-0 rounded-[1px] bg-background",
                index % 2 === 0 &&
                  "shadow-[0px_0px_0px_3px_var(--color-background)_inset]"
              )}
            />
          );
        })
      )}
    </div>
  );
}
