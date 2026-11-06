export const TWITCH_PANEL = {
  width: 320,
  height: 400,
  scale: 2,
} as const;

export const TWITCH_PANELS = [
  {
    id: "about",
    eyebrow: "About",
    title: "About me",
    body: "A caffeinated beverage.",
    filename: "kingcappuccinoo-panel-about.png",
  },
  {
    id: "instagram",
    eyebrow: "Social",
    title: "Instagram",
    lines: ["@chandler.t.king"],
    filename: "kingcappuccinoo-panel-instagram.png",
  },
  {
    id: "twitter",
    eyebrow: "Social",
    title: "Twitter",
    lines: ["@chandlerking"],
    filename: "kingcappuccinoo-panel-twitter.png",
  },
  {
    id: "discord",
    eyebrow: "Social",
    title: "Discord",
    lines: ["Come say hey"],
    filename: "kingcappuccinoo-panel-discord.png",
  },
  {
    id: "subs",
    eyebrow: "Perks",
    title: "Subs",
    lines: [
      "Exclusive emotes",
      "Crown and Fair badge",
      "First dibs",
      "No ads",
      "Giveaways",
    ],
    filename: "kingcappuccinoo-panel-subs.png",
  },
  {
    id: "donations",
    eyebrow: "Support",
    title: "Donations",
    body: "All donations will go toward improving the quality of the stream. Thank you.",
    filename: "kingcappuccinoo-panel-donations.png",
  },
] as const;

export type TwitchPanel = (typeof TWITCH_PANELS)[number];
