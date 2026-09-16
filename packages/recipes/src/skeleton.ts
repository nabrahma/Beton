import { tv, type VariantProps } from "./tv.ts";

export const skeleton = tv({
  base: ["block bg-surface", "border-3 border-border", "motion-safe:animate-pulse-stepped"],
  variants: {
    shape: {
      line: "h-4 w-full",
      title: "h-8 w-2/3",
      block: "h-32 w-full",
      avatar: "size-11 rounded-md",
      button: "h-12 w-32",
    },
  },
  defaultVariants: {
    shape: "line",
  },
});

export type SkeletonVariants = VariantProps<typeof skeleton>;
