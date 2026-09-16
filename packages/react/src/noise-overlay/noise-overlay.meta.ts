import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "noise-overlay",
  title: "Noise Overlay",
  description: "Print grain over a section, drawn by the browser.",
  category: "motion",
  status: "stable",
  exports: ["NoiseOverlay"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "An overlay takes no focus." }],
    aria: ["Decoration: hidden from screen readers and never in the way of a pointer."],
    notes: [
      "It sits above the content and multiplies, so keep the weight low over text.",
      "No image is downloaded: the grain is generated.",
    ],
  },
  related: ["grid-background", "halftone-background"],
  playground: { recipe: "noiseOverlay", controls: ["weight"] },
};
