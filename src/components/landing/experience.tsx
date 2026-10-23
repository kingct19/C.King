"use client";

import { experienceConfig, experienceSectionConfig } from "@/config/experience";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

const enabledExperience = experienceConfig
  .filter((item) => item.enabled !== false)
  .sort((a, b) => a.order - b.order);

export function Experience() {
  if (!enabledExperience.length) {
    return null;
  }

  return (
    <section className="border-t border-dashed pt-6">
      <h2 className="section-heading mb-3">{experienceSectionConfig.title}</h2>
      <div className="px-6 space-y-4">
        {enabledExperience.map((item, idx) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
            className="border border-dashed bg-background/50 p-4"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base font-semibold">{item.role}</h3>
              <span className="font-mono text-xs text-muted-foreground">
                {item.period}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {item.companyUrl ? (
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 hover:text-primary"
                >
                  {item.company}
                  <ArrowUpRight className="size-3" />
                </a>
              ) : (
                item.company
              )}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
            {item.highlights?.length ? (
              <ul className="mt-2 list-disc pl-4 text-sm text-muted-foreground space-y-1">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            ) : null}
            {item.skills?.length ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-dashed px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : null}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
