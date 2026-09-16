import { tv, type VariantProps } from "./tv.ts";

export const featureGrid = tv({
  slots: {
    list: "grid gap-6",
    item: "flex h-full flex-col gap-3 border-3 border-border bg-raised p-6 shadow-sm",
    icon: "flex size-12 shrink-0 items-center justify-center border-3 border-border bg-secondary",
    itemTitle: "font-display text-h4 font-extrabold text-foreground",
    itemDescription: "text-pretty text-foreground",
  },
  variants: {
    columns: {
      2: { list: "sm:grid-cols-2" },
      3: { list: "sm:grid-cols-2 lg:grid-cols-3" },
      4: { list: "sm:grid-cols-2 lg:grid-cols-4" },
    },
  },
  defaultVariants: {
    columns: 3,
  },
});

export type FeatureGridVariants = VariantProps<typeof featureGrid>;
