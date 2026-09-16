import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "pricing-table",
  title: "Pricing Table",
  description: "What each plan costs and what is in it.",
  category: "marketing",
  kind: "block",
  status: "stable",
  exports: ["PricingTable"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Reaches each plan's button in order." }],
    aria: [
      "A list of plans, each with a heading one level below the section.",
      "Included and missing features are said in words, not left to a tick and a dash.",
    ],
    notes: [
      "Pass a feature as [label, false] to show it as missing.",
      "One featured plan, at most: it thickens the border and drops a longer shadow.",
      "Write the price yourself, already formatted for the currency you mean.",
    ],
  },
  related: ["cta-band", "faq"],
  playground: { recipe: "pricingTable", controls: ["columns"] },
};
