import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "team-grid",
  title: "Team Grid",
  description: "Who made it, with faces and roles.",
  category: "marketing",
  kind: "block",
  status: "stable",
  exports: ["TeamGrid"],
  accessibility: {
    keyboard: [{ keys: "Tab", action: "Reaches each person's links." }],
    aria: ["A list of people, each name a heading one level below the section."],
    notes: [
      "Roles are short. Bios are two lines at most.",
      "Give portraits real alt text, or use an Avatar, which derives initials from the name.",
    ],
  },
  related: ["avatar", "testimonial"],
  playground: { recipe: "teamGrid", controls: ["columns"] },
};
