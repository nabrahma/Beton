import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "badge",
  title: "Badge",
  description: "A short status or category label in a monospace sticker.",
  category: "foundation",
  status: "stable",
  exports: ["Badge"],
  accessibility: {
    keyboard: [],
    aria: ["Renders a <span> with no role. Its text is read inline."],
    notes: [
      "Colour is never the only signal: the badge text carries the meaning.",
      'Render as a link with render={<a href="..." />} to make it interactive.',
    ],
  },
  related: ["avatar", "kbd"],
};
