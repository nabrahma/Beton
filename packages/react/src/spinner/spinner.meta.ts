import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "spinner",
  title: "Spinner",
  description: "A stepped, eight-block loading indicator. No smooth rotation.",
  category: "foundation",
  status: "stable",
  exports: ["Spinner"],
  accessibility: {
    keyboard: [],
    aria: ['role="status" with a text label, announced politely.', "The SVG is aria-hidden."],
    notes: [
      'The label defaults to "Loading". Make it specific: "Loading results".',
      "Under prefers-reduced-motion the spinner holds still; the status text still announces.",
    ],
  },
  related: ["button"],
  playground: { recipe: "spinner", controls: ["size"], toggles: ["showLabel"] },
};
