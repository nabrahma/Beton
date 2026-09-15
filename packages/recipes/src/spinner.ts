import { tv, type VariantProps } from "./tv.ts";

export const spinner = tv({
  slots: {
    root: "inline-flex items-center gap-2 text-foreground",
    icon: "shrink-0 animate-spin-stepped fill-current motion-reduce:animate-none",
    label: "font-mono text-sm font-bold uppercase",
  },
  variants: {
    size: {
      sm: { icon: "size-4" },
      md: { icon: "size-6" },
      lg: { icon: "size-10", label: "text-base" },
    },
    showLabel: {
      true: {},
      false: { label: "sr-only" },
    },
  },
  defaultVariants: {
    size: "md",
    showLabel: false,
  },
});

export type SpinnerVariants = VariantProps<typeof spinner>;
