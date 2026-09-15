import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "separator",
  title: "Separator",
  description: "A solid ink rule in three stroke weights, horizontal or vertical.",
  category: "foundation",
  status: "stable",
  exports: ["Separator"],
  accessibility: {
    keyboard: [],
    aria: [
      'Decorative by default: role="none".',
      'With decorative={false}: role="separator" and aria-orientation.',
    ],
    notes: ["Only mark a separator as semantic when it divides distinct groups of content."],
  },
  related: ["card"],
  playground: { recipe: "separator", controls: ["orientation", "size"] },
};
