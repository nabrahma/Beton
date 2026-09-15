import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "text",
  title: "Text & Heading",
  description: "Body copy and poster-scale headings from the Béton type scale.",
  category: "foundation",
  status: "stable",
  exports: ["Heading", "Text"],
  accessibility: {
    keyboard: [],
    aria: ["Heading renders <h1>–<h6> from level.", "Text renders a <p> by default."],
    notes: [
      "level sets document structure; size sets appearance. Never pick a level for its looks.",
      "Headings scale down on small screens so 96px display type never overflows.",
    ],
  },
  related: ["card"],
  playground: { recipe: "heading", controls: ["size"], toggles: ["uppercase"] },
};
