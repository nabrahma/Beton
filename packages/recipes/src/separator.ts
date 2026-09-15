import { tv, type VariantProps } from "./tv.ts";

export const separator = tv({
  base: "shrink-0 border-0 bg-border",
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "self-stretch",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", size: "sm", class: "h-0.5" },
    { orientation: "horizontal", size: "md", class: "h-0.75" },
    { orientation: "horizontal", size: "lg", class: "h-1.25" },
    { orientation: "vertical", size: "sm", class: "w-0.5" },
    { orientation: "vertical", size: "md", class: "w-0.75" },
    { orientation: "vertical", size: "lg", class: "w-1.25" },
  ],
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

export type SeparatorVariants = VariantProps<typeof separator>;
