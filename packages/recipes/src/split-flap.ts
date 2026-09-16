import { tv, type VariantProps } from "./tv.ts";

export const splitFlap = tv({
  slots: {
    root: "inline-flex gap-1",
    cell: [
      "relative grid place-items-center overflow-hidden",
      "border-3 border-border bg-ink font-mono font-black text-paper tabular-nums",
    ],
    char: "motion-safe:animate-flap motion-reduce:animate-none",
    seam: "pointer-events-none absolute inset-x-0 top-1/2 h-0.5 bg-border",
  },
  variants: {
    size: {
      sm: { cell: "h-10 w-7 text-lg" },
      md: { cell: "h-14 w-10 text-2xl" },
      lg: { cell: "h-20 w-14 text-4xl" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SplitFlapVariants = VariantProps<typeof splitFlap>;
