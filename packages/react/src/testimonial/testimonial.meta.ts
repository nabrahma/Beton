import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "testimonial",
  title: "Testimonial",
  description: "What people say, attributed to the people who said it.",
  category: "marketing",
  kind: "block",
  status: "stable",
  exports: ["Testimonial"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Reaches any links inside a quote." }],
    aria: [
      "Each quote is a figure with a blockquote and a caption, so the attribution belongs to the quote.",
      "The big quote mark is decoration and is hidden.",
    ],
    notes: [
      "Name the person and say what they do. An anonymous quote is worth nothing.",
      "One, two or three across.",
    ],
  },
  related: ["logo-cloud", "stats-band"],
  playground: { recipe: "testimonial", controls: ["size", "columns"] },
};
