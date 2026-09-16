import { tv, type VariantProps } from "./tv.ts";

export const stat = tv({
  slots: {
    root: "flex flex-col gap-1 border-3 border-border bg-raised shadow-sm",
    label: "font-mono text-xs font-bold tracking-widest uppercase",
    value: "font-display font-black tracking-tight text-foreground tabular-nums",
    delta: "inline-flex items-center gap-1 font-mono text-sm font-bold",
    deltaIcon: "size-4",
    description: "text-sm text-foreground",
  },
  variants: {
    size: {
      sm: { root: "p-4", value: "text-h3" },
      md: { root: "p-5", value: "text-h2" },
      lg: { root: "p-6", value: "text-h1" },
    },
    trend: {
      up: { delta: "text-foreground" },
      down: { delta: "text-foreground" },
      flat: { delta: "text-foreground" },
    },
  },
  defaultVariants: {
    size: "md",
    trend: "flat",
  },
});

export type StatVariants = VariantProps<typeof stat>;
