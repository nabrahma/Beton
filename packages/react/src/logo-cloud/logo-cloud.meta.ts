import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "logo-cloud",
  title: "Logo Cloud",
  description: "A row of the names that use the thing.",
  category: "marketing",
  kind: "block",
  status: "stable",
  exports: ["LogoCloud"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Reaches any names that are links." }],
    aria: ["A list, so the names are counted rather than run together."],
    notes: [
      "Words set in the display face beat grey logo images, and they stay legible.",
      "If a name is a picture, give it alt text or hide it and add the name beside it.",
    ],
  },
  related: ["marquee", "testimonial"],
  playground: { recipe: "logoCloud", controls: ["size"] },
};
