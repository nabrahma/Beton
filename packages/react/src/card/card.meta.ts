import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "card",
  title: "Card",
  description:
    "A bordered container with a hard shadow, composed from header, body and footer parts.",
  category: "foundation",
  status: "stable",
  exports: ["Card"],
  accessibility: {
    keyboard: [
      {
        keys: "Tab",
        action:
          "Moves to interactive content inside the card, or to the card itself when rendered as a link.",
      },
    ],
    aria: [
      "Card.Title renders an <h3> by default. Use render={<h2 />} to match your document outline.",
      "Card.Description renders a <p>.",
    ],
    notes: [
      "Use interactive with render={<a />} for cards that navigate. Do not nest other links or buttons inside a link card.",
    ],
  },
  related: ["button", "badge"],
};
