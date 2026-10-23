import type { ProfileBannerSticker } from "@/config/types";

export const profileBannerConfig = {
  label: "A few things from my desk",
  profileLabel: "Animate my profile sticker",
  profileSoundSrc: "/profile-pop.mp3",
};

export const profileBannerStickers: ProfileBannerSticker[] = [
  {
    id: "notebook",
    src: "/images/profile-stickers/macbook.webp",
    alt: "A halftone Space Grey MacBook Pro with code on screen",
    label: "Animate the MacBook sticker",
    tilt: -7,
    order: 1,
    soundSrc: "/keyboard-click.mp3",
  },
  {
    id: "keyboard",
    src: "/images/profile-stickers/walnut-keyboard.webp",
    alt: "A halftone walnut wood mechanical keyboard with forest green keycaps and Japanese wave spacebar",
    label: "Animate the keyboard sticker",
    tilt: 4,
    order: 2,
    soundSrc: "/keyboard-click.mp3",
  },
  {
    id: "plane",
    src: "/images/profile-stickers/plane.webp",
    alt: "A cobalt-blue paper plane",
    label: "Animate the paper plane sticker",
    tilt: -9,
    order: 3,
    soundSrc: "/plane-whoosh.mp3",
  },
  {
    id: "coffee",
    src: "/images/profile-stickers/latte-mug.webp",
    alt: "A halftone matte black ceramic latte mug with tulip heart latte art",
    label: "Animate the latte sticker",
    tilt: 7,
    order: 4,
    soundSrc: "/coffee-cup.mp3",
  },
];
