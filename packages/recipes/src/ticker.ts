import { tv, type VariantProps } from "./tv.ts";

export const ticker = tv({
  slots: {
    root: "flex w-full items-stretch overflow-hidden border-y-3 border-border bg-ink text-paper",
    label: [
      "flex shrink-0 items-center border-r-3 border-border bg-primary px-4",
      "font-display font-black tracking-widest text-ink uppercase",
    ],
    viewport: "group flex min-w-0 flex-1 overflow-hidden",
    track: [
      "flex w-max shrink-0 items-center",
      "motion-safe:animate-marquee motion-reduce:animate-none",
      "group-hover:[animation-play-state:paused]",
    ],
    item: "flex shrink-0 items-center gap-2 font-mono font-bold",
    separator: "px-4 font-mono font-black text-primary select-none",
  },
  variants: {
    size: {
      sm: { root: "h-10", label: "text-xs", item: "text-xs", track: "gap-6 pr-6" },
      md: { root: "h-12", label: "text-sm", item: "text-sm", track: "gap-8 pr-8" },
      lg: { root: "h-14", label: "text-base", item: "text-base", track: "gap-10 pr-10" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type TickerVariants = VariantProps<typeof ticker>;
