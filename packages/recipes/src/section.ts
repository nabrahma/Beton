import { tv, type VariantProps } from "./tv.ts";

/**
 * The frame every marketing block sits in: full width, generous padding, and a
 * centred column that never gets wider than the measure.
 */
export const section = tv({
  slots: {
    root: "w-full",
    inner: "mx-auto flex w-full flex-col px-4 sm:px-6",
    header: "flex flex-col gap-4",
    eyebrow: "font-mono text-xs font-bold tracking-widest uppercase",
    title: "font-display font-black tracking-tight text-balance text-foreground",
    description: "max-w-prose text-pretty text-foreground",
    actions: "flex flex-wrap items-center gap-3 pt-2",
  },
  variants: {
    size: {
      sm: { inner: "max-w-5xl gap-8 py-12", title: "text-h3", description: "text-base" },
      md: { inner: "max-w-6xl gap-12 py-16", title: "text-h2", description: "text-lg" },
      lg: { inner: "max-w-7xl gap-16 py-24", title: "text-h1", description: "text-xl" },
    },
    align: {
      start: { header: "items-start text-left" },
      center: { header: "items-center text-center", actions: "justify-center" },
    },
    surface: {
      paper: { root: "bg-surface" },
      raised: { root: "bg-raised" },
      accent: { root: "bg-secondary" },
      ink: { root: "bg-ink text-paper" },
    },
    bordered: {
      true: { root: "border-y-3 border-border" },
    },
  },
  defaultVariants: {
    size: "md",
    align: "start",
    surface: "paper",
    bordered: false,
  },
});

export type SectionVariants = VariantProps<typeof section>;
