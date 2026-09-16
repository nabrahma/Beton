import { tv, type VariantProps } from "./tv.ts";

export const ctaBand = tv({
  slots: {
    root: "w-full border-y-3 border-border",
    inner: "mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6",
    title: "font-display text-h2 font-black tracking-tight text-balance",
    description: "max-w-prose text-pretty text-lg",
    actions: "flex flex-wrap items-center gap-4",
  },
  variants: {
    surface: {
      accent: { root: "bg-primary text-ink" },
      secondary: { root: "bg-secondary text-ink" },
      ink: { root: "bg-ink text-paper" },
      raised: { root: "bg-raised text-foreground" },
    },
    layout: {
      stacked: {},
      inline: { inner: "md:flex-row md:items-center md:justify-between" },
    },
  },
  defaultVariants: {
    surface: "accent",
    layout: "inline",
  },
});

export type CtaBandVariants = VariantProps<typeof ctaBand>;
