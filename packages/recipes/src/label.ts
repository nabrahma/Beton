import { tv, type VariantProps } from "./tv.ts";

export const label = tv({
  slots: {
    root: [
      "inline-flex items-center gap-1 font-display font-bold uppercase tracking-wide text-foreground",
      "data-disabled:cursor-not-allowed data-disabled:text-disabled-foreground",
    ],
    indicator: "font-mono text-foreground",
  },
  variants: {
    size: {
      sm: { root: "text-xs" },
      md: { root: "text-sm" },
      lg: { root: "text-base" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type LabelVariants = VariantProps<typeof label>;
