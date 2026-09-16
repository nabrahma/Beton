import { tv, type VariantProps } from "./tv.ts";

export const bentoGrid = tv({
  slots: {
    list: "grid auto-rows-[minmax(12rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-3",
    item: "flex h-full flex-col justify-between gap-4 border-3 border-border bg-raised p-6 shadow-sm",
    itemTitle: "font-display text-h4 font-extrabold text-foreground",
    itemDescription: "text-pretty text-foreground",
    media: "flex min-h-0 flex-1 items-center justify-center",
  },
  variants: {
    span: {
      1: {},
      2: { item: "sm:col-span-2" },
      3: { item: "sm:col-span-2 lg:col-span-3" },
    },
    tall: {
      true: { item: "row-span-2" },
    },
    accent: {
      none: {},
      primary: { item: "bg-primary" },
      secondary: { item: "bg-secondary" },
      ink: { item: "bg-ink text-paper" },
    },
  },
  defaultVariants: {
    span: 1,
    tall: false,
    accent: "none",
  },
});

export type BentoGridVariants = VariantProps<typeof bentoGrid>;
