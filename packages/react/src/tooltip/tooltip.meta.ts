import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "tooltip",
  title: "Tooltip",
  description: "A short visual label shown on hover and keyboard focus.",
  category: "overlays",
  status: "stable",
  exports: ["Tooltip", "TooltipProvider"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Shows the tooltip when the trigger receives focus." },
      { keys: "Escape", action: "Dismisses it while keeping focus on the trigger." },
    ],
    aria: [
      "Tooltips add no role and no description: they are visual only.",
      "The trigger must carry its own accessible name.",
    ],
    notes: [
      "Touch and screen reader users never see a tooltip, so it must only repeat what the trigger already says.",
      "Anything essential belongs in the page, or in a Popover if space is tight.",
      "Wrap an area in TooltipProvider to share delays between neighbouring tooltips.",
    ],
    limitations: [
      "Not available to touch users. Never put an action or unique information inside one.",
    ],
  },
  related: ["popover", "button"],
};
