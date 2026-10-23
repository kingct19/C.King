import type { Testimonial } from "@/config/types";

export const testimonialsSectionConfig = {
  title: "Quotes",
  seeMoreLabel: "Work with Chandler & Studio Sozo",
};

export const testimonialsConfig: Testimonial[] = [
  {
    id: "musashi-1",
    name: "Miyamoto Musashi",
    role: "The Book of Five Rings",
    content:
      "Do nothing that is of no use. Think lightly of yourself and deeply of the world.",
    avatar: "MM",
    image: "/images/quotes/doodle-musashi-v2.webp",
    order: 1,
    enabled: true,
  },
  {
    id: "musashi-2",
    name: "Miyamoto Musashi",
    role: "The Book of Five Rings",
    content:
      "If you know the way broadly you will see it in everything. From one thing, know ten thousand things.",
    avatar: "MM",
    image: "/images/quotes/doodle-musashi-v2.webp",
    order: 2,
    enabled: true,
  },
  {
    id: "vinland-1",
    name: "Thors Snorresson",
    role: "Vinland Saga",
    content:
      "You have no enemies. No one has any enemies. There is nobody who it is okay to hurt.",
    avatar: "VS",
    image: "/images/quotes/doodle-thors-v2.webp",
    order: 3,
    enabled: true,
  },
  {
    id: "aurelius-1",
    name: "Marcus Aurelius",
    role: "Meditations",
    content:
      "You have power over your mind — not outside events. Realize this, and you will find strength.",
    avatar: "MA",
    image: "/images/quotes/doodle-aurelius.webp",
    order: 4,
    enabled: true,
  },
  {
    id: "clear-1",
    name: "James Clear",
    role: "Atomic Habits",
    content:
      "You do not rise to the level of your goals. You fall to the level of your systems.",
    avatar: "JC",
    image: "/images/quotes/doodle-clear.webp",
    order: 5,
    enabled: true,
  },
  {
    id: "knight-1",
    name: "Phil Knight",
    role: "Shoe Dog",
    content:
      "The cowards never started and the weak died along the way. That leaves us.",
    avatar: "PK",
    image: "/images/quotes/doodle-knight.webp",
    order: 6,
    enabled: true,
  },
  {
    id: "jobs-1",
    name: "Steve Jobs",
    role: "Co-Founder of Apple",
    content:
      "Real artists ship. Design is not just what it looks like and feels like. Design is how it works.",
    avatar: "SJ",
    image: "/images/quotes/doodle-jobs.webp",
    order: 7,
    enabled: true,
  },
  {
    id: "aurelius-2",
    name: "Marcus Aurelius",
    role: "Meditations",
    content:
      "Waste no more time arguing about what a good man should be. Be one.",
    avatar: "MA",
    image: "/images/quotes/doodle-aurelius.webp",
    order: 8,
    enabled: true,
  },
  {
    id: "housel-1",
    name: "Morgan Housel",
    role: "The Psychology of Money",
    content:
      "Controlling your time is the highest dividend money pays.",
    avatar: "MH",
    image: "/images/quotes/doodle-housel.webp",
    order: 9,
    enabled: true,
  },
  {
    id: "greene-1",
    name: "Robert Greene",
    role: "The 48 Laws of Power",
    content:
      "Win through your actions, never through argument. Demonstrate, do not explicate.",
    avatar: "RG",
    image: "/images/quotes/doodle-greene.webp",
    order: 10,
    enabled: true,
  },
  {
    id: "kakashi-1",
    name: "Kakashi Hatake",
    role: "Naruto",
    content:
      "In the ninja world, those who break the rules are scum, that's true — but those who abandon their friends are worse than scum.",
    avatar: "KH",
    image: "/images/quotes/doodle-kakashi.webp",
    order: 11,
    enabled: true,
  },
  {
    id: "musashi-3",
    name: "Miyamoto Musashi",
    role: "Dokkodo · The Path of Aloneness",
    content:
      "Step by step walk the thousand-mile road. Study strategy over the years and achieve the spirit of the warrior.",
    avatar: "MM",
    image: "/images/quotes/doodle-musashi-v2.webp",
    order: 12,
    enabled: true,
  },
];

export function getAllTestimonials(): Testimonial[] {
  return [...testimonialsConfig].sort((a, b) => a.order - b.order);
}

export function getEnabledTestimonials(): Testimonial[] {
  return getAllTestimonials().filter((item) => item.enabled !== false);
}
