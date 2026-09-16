import { tv, type VariantProps } from "./tv.ts";

export const pricingTable = tv({
  slots: {
    list: "grid items-start gap-6",
    plan: "flex h-full flex-col gap-5 border-3 border-border bg-raised p-6 shadow-sm",
    badge:
      "w-fit border-3 border-border bg-primary px-2 py-0.5 font-mono text-xs font-bold tracking-widest uppercase",
    name: "font-display text-h4 font-black tracking-tight text-foreground",
    price:
      "flex flex-wrap items-baseline gap-x-1 font-display font-black tabular-nums text-foreground",
    amount: "text-h3",
    period: "font-mono text-sm font-bold",
    description: "text-pretty text-foreground",
    features: "flex flex-col gap-2",
    feature: "flex items-start gap-2 text-foreground",
    featureIcon: "mt-1 size-4 shrink-0",
    action: "pt-2",
    footnote: "font-mono text-xs font-bold",
  },
  variants: {
    columns: {
      2: { list: "sm:grid-cols-2", amount: "text-h2" },
      3: { list: "md:grid-cols-3" },
      4: { list: "sm:grid-cols-2 xl:grid-cols-4" },
    },
    featured: {
      true: { plan: "border-5 shadow-lg" },
    },
  },
  defaultVariants: {
    columns: 3,
    featured: false,
  },
});

export type PricingTableVariants = VariantProps<typeof pricingTable>;
