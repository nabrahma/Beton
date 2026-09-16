import { focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const footer = tv({
  slots: {
    root: "w-full border-t-3 border-border bg-raised",
    inner: "mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6",
    brand: "flex flex-col gap-3",
    mark: "font-display text-2xl font-black tracking-tight uppercase text-foreground",
    blurb: "max-w-xs text-pretty text-sm text-foreground",
    columns: "grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-4",
    column: "flex flex-col gap-3",
    columnTitle: "font-mono text-xs font-bold tracking-widest uppercase",
    list: "flex flex-col gap-2",
    link: ["flex min-h-11 items-center text-foreground hover:underline", focusRing],
    bottom:
      "flex flex-col gap-3 border-t-3 border-border pt-6 sm:flex-row sm:items-center sm:justify-between",
    note: "font-mono text-xs font-bold",
    social: "flex items-center gap-3",
  },
  variants: {
    variant: {
      simple: { inner: "gap-8" },
      columns: { inner: "gap-10 lg:flex-row lg:justify-between" },
    },
  },
  defaultVariants: {
    variant: "columns",
  },
});

export type FooterVariants = VariantProps<typeof footer>;
