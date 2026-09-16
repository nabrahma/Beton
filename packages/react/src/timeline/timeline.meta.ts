import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "timeline",
  title: "Timeline",
  description: "What happened, in order: releases, deployments, an audit trail.",
  category: "data-display",
  status: "stable",
  exports: ["Timeline"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Moves through any links inside an entry." }],
    aria: [
      "An ordered list, so the sequence is announced as one.",
      "Times use a time element with a machine-readable date.",
    ],
    notes: [
      "Pass dateTime as well as the text, so the date means something to a machine.",
      "Set state to colour the marker: done, current or upcoming.",
    ],
  },
  related: ["stepper", "list"],
  playground: { recipe: "timeline", controls: ["size"] },
};
