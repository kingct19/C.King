import type { SectionId, SectionNoteConfig } from "@/config/types";

export const sectionNotes: Partial<Record<SectionId, SectionNoteConfig>> = {
  projects: {
    text: "Shipped from zero\nto production",
    side: "right",
  },
  about: {
    text: "Ask the AI\nanything below",
    side: "left",
  },
  testimonials: {
    text: "Words I keep\nin mind",
    side: "left",
  },
  bookshelf: {
    text: "Books I keep\ncoming back to",
    side: "right",
  },
};
