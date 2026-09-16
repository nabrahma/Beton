import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "hover-card",
  title: "Hover Card",
  description: "A preview panel shown when a link is hovered or focused.",
  category: "overlays",
  status: "stable",
  exports: ["HoverCard"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Shows the card when the link receives focus." },
      { keys: "Escape", action: "Dismisses the card." },
    ],
    aria: ["The trigger is a link that works on its own.", "The card is supplementary content."],
    notes: [
      "Touch users never see the card, so everything inside must be reachable by following the link.",
      "Use it for previews, never for actions.",
    ],
    limitations: ["Not available to touch users."],
  },
  related: ["popover", "tooltip", "avatar"],
};
