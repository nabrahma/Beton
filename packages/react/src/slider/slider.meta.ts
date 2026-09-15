import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "slider",
  title: "Slider",
  description: "Choose a value or range by dragging a square thumb along a track.",
  category: "forms",
  status: "stable",
  exports: ["Slider"],
  accessibility: {
    keyboard: [
      { keys: "Arrow keys", action: "Change the value by one step." },
      { keys: "Shift + Arrow keys", action: "Change the value by a large step." },
      { keys: "Page Up / Page Down", action: "Change the value by a large step." },
      { keys: "Home / End", action: "Jump to the minimum or maximum." },
    ],
    aria: ['Each thumb contains a native range input with role="slider" and aria-valuenow.'],
    notes: [
      "Name thumbs with label, aria-label, or thumbLabels for a range.",
      "Pair a slider with a NumberInput when precise values matter.",
    ],
  },
  related: ["number-input"],
  playground: { recipe: "slider", controls: ["variant", "size"], toggles: ["disabled"] },
};
