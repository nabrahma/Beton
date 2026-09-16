import { tv, type VariantProps } from "./tv.ts";

export const descriptionList = tv({
  slots: {
    root: "w-full",
    group: "border-b-3 border-border last:border-b-0",
    term: "font-mono text-xs font-bold tracking-widest uppercase",
    description: "font-sans text-foreground",
  },
  variants: {
    layout: {
      stacked: {
        group: "flex flex-col gap-1 py-3 first:pt-0 last:pb-0",
      },
      inline: {
        group:
          "grid grid-cols-[minmax(8rem,12rem)_1fr] items-baseline gap-4 py-3 first:pt-0 last:pb-0",
      },
    },
    size: {
      sm: { description: "text-sm" },
      md: { description: "text-base" },
      lg: { description: "text-lg" },
    },
  },
  defaultVariants: {
    layout: "stacked",
    size: "md",
  },
});

export type DescriptionListVariants = VariantProps<typeof descriptionList>;
