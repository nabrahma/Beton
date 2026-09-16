import { tv, type VariantProps } from "./tv.ts";

export const timeline = tv({
  slots: {
    root: "flex w-full flex-col",
    item: "relative flex gap-4 pb-6 last:pb-0",
    marker: [
      "z-10 flex size-6 shrink-0 items-center justify-center border-3 border-border bg-raised",
      "data-[state=done]:bg-primary data-[state=current]:bg-secondary",
    ],
    connector: "absolute top-6 bottom-0 left-[calc(0.75rem-2px)] w-1 bg-border",
    content: "flex min-w-0 flex-1 flex-col gap-1 pb-2",
    time: "font-mono text-xs font-bold tracking-widest uppercase",
    title: "font-display font-extrabold text-foreground",
    body: "text-foreground",
  },
  variants: {
    size: {
      sm: { title: "text-sm", body: "text-sm" },
      md: { title: "text-base", body: "text-base" },
      lg: { title: "text-lg", body: "text-lg" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type TimelineVariants = VariantProps<typeof timeline>;
