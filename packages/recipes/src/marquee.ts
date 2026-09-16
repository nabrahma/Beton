import { tv, type VariantProps } from "./tv.ts";

export const marquee = tv({
  slots: {
    root: "group flex w-full overflow-hidden",
    track: [
      "flex w-max shrink-0 items-center",
      "motion-safe:animate-marquee motion-reduce:animate-none",
      "group-hover:[animation-play-state:paused]",
    ],
    item: "shrink-0",
  },
  variants: {
    direction: {
      left: {},
      right: { track: "motion-safe:animate-marquee-reverse" },
    },
    gap: {
      sm: { track: "gap-4 pr-4", item: "" },
      md: { track: "gap-8 pr-8", item: "" },
      lg: { track: "gap-12 pr-12", item: "" },
    },
    bordered: {
      true: { root: "border-y-3 border-border bg-raised py-3" },
    },
  },
  defaultVariants: {
    direction: "left",
    gap: "md",
    bordered: false,
  },
});

export type MarqueeVariants = VariantProps<typeof marquee>;
