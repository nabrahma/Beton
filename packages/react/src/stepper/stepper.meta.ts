import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "stepper",
  title: "Stepper",
  description: "Shows where someone is in a task that runs over several steps.",
  category: "navigation",
  status: "stable",
  exports: ["Stepper"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Moves through anything interactive inside a step." }],
    aria: [
      "An ordered list of steps, named Progress by default.",
      'The step being worked on carries aria-current="step".',
    ],
    notes: [
      "Each marker says done or current step in words as well as in colour.",
      "Set activeStep and the rest follows, or set state on a step to override it.",
      "Use orientation vertical when the steps carry more than a line of description.",
    ],
  },
  related: ["tabs", "breadcrumbs"],
  playground: { recipe: "stepper", controls: ["size", "orientation"] },
};
