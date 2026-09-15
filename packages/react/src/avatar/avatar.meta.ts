import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "avatar",
  title: "Avatar",
  description: "A profile image that falls back to initials when the image is missing or fails.",
  category: "foundation",
  status: "stable",
  exports: ["Avatar"],
  accessibility: {
    keyboard: [],
    aria: [
      "The image uses alt text from the alt prop.",
      'The fallback has role="img" and aria-label from alt, so the name survives a broken image.',
    ],
    notes: [
      "alt is required. Describe the person, not the picture.",
      'Pass alt="" only when the name is already written next to the avatar.',
    ],
  },
  related: ["badge", "card"],
  playground: { recipe: "avatar", controls: ["variant", "size"] },
};
