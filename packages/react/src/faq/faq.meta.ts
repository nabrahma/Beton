import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "faq",
  title: "FAQ",
  description: "The questions people actually ask, with the answers.",
  category: "marketing",
  kind: "block",
  status: "stable",
  exports: ["Faq"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Moves between the questions." },
      { keys: "Enter or Space", action: "Opens or closes an answer." },
    ],
    aria: ["Each question is a button in a heading; each answer is a region named by it."],
    notes: [
      "Answers open one at a time unless you pass multiple.",
      "Put the awkward questions in. A missing answer is still an answer.",
      "Pass aside for a way to get in touch beside the list.",
    ],
  },
  related: ["accordion", "pricing-table"],
};
