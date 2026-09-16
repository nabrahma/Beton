import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "feature-grid",
  title: "Feature Grid",
  description: "A grid of what a thing does, one card per feature.",
  category: "marketing",
  kind: "block",
  status: "stable",
  exports: ["FeatureGrid"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Reaches the features that are links." }],
    aria: [
      "A list, so the number of features is announced.",
      "Each feature title is a heading one level below the section.",
      "Feature icons are decoration and are hidden.",
    ],
    notes: [
      "Two, three or four columns; one on a phone, always.",
      "Pass href to make a feature lead somewhere.",
    ],
  },
  related: ["bento-grid", "section"],
  playground: { recipe: "featureGrid", controls: ["columns"] },
};
