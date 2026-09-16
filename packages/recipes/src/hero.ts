import { tv, type VariantProps } from "./tv.ts";

export const hero = tv({
  slots: {
    root: "relative isolate w-full overflow-hidden",
    inner: "mx-auto flex w-full max-w-7xl flex-col px-4 py-20 sm:px-6 lg:py-28",
    content: "flex flex-col gap-6",
    eyebrow:
      "w-fit border-3 border-border bg-secondary px-3 py-1 font-mono text-xs font-bold tracking-widest uppercase",
    title: "font-display text-h1 font-black tracking-tight text-balance text-foreground",
    description: "max-w-prose text-pretty text-lg text-foreground",
    actions: "flex flex-wrap items-center gap-4 pt-2",
    aside: "flex min-w-0 items-center justify-center",
    note: "font-mono text-xs font-bold",
  },
  variants: {
    variant: {
      stacked: { inner: "items-start gap-10" },
      split: { inner: "gap-12 lg:grid lg:grid-cols-2 lg:items-center" },
      poster: {
        inner: "items-center gap-8 text-center",
        content: "items-center",
        description: "mx-auto",
        actions: "justify-center",
        title: "uppercase",
      },
    },
    surface: {
      paper: { root: "bg-surface" },
      raised: { root: "bg-raised" },
      accent: { root: "bg-primary" },
      ink: { root: "bg-ink text-paper" },
    },
  },
  defaultVariants: {
    variant: "stacked",
    surface: "paper",
  },
});

export type HeroVariants = VariantProps<typeof hero>;
