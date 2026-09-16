import { tv, type VariantProps } from "./tv.ts";

export const statsBand = tv({
  slots: {
    list: "grid divide-border border-3 border-border bg-raised",
    item: "flex flex-col gap-1 p-6",
    value: "font-display font-black tabular-nums text-foreground",
    label: "font-mono text-xs font-bold tracking-widest uppercase",
    description: "text-sm text-foreground",
  },
  variants: {
    columns: {
      2: { list: "sm:grid-cols-2 sm:divide-x-3 divide-y-3 sm:divide-y-0" },
      3: { list: "sm:grid-cols-3 sm:divide-x-3 divide-y-3 sm:divide-y-0" },
      4: { list: "sm:grid-cols-2 lg:grid-cols-4 divide-y-3 sm:divide-y-0 sm:divide-x-3" },
    },
    size: {
      sm: { value: "text-h3" },
      md: { value: "text-h2" },
      lg: { value: "text-h1" },
    },
  },
  defaultVariants: {
    columns: 4,
    size: "md",
  },
});

export type StatsBandVariants = VariantProps<typeof statsBand>;
