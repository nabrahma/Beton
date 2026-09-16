import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "scroll-area",
  title: "Scroll Area",
  description: "A scrolling panel with scrollbars that match the rest of the set.",
  category: "navigation",
  status: "stable",
  exports: ["ScrollArea"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Moves to the scrolling region, which is focusable." },
      { keys: "ArrowUp and ArrowDown", action: "Scroll the region once it has focus." },
      { keys: "Page Up and Page Down", action: "Scroll a screen at a time." },
    ],
    aria: [
      "The viewport is focusable and named by label, as a scrollable region must be.",
      "Scrollbars are decoration: the region scrolls with the keyboard on its own.",
    ],
    notes: [
      "Always pass a label. A scrollable region in the tab order needs a name.",
      "Pass horizontal for content that is wider than the panel.",
      "Scrollbars appear only when there is something to scroll.",
    ],
  },
  related: ["command-palette", "card"],
};
