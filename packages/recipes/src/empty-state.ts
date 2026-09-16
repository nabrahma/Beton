import { tv, type VariantProps } from "./tv.ts";

export const emptyState = tv({
  slots: {
    root: "flex w-full flex-col items-center justify-center gap-4 border-3 border-dashed border-border bg-raised text-center",
    icon: "flex items-center justify-center border-3 border-border bg-secondary",
    title: "font-display font-black tracking-tight text-foreground",
    description: "max-w-prose text-foreground",
    actions: "flex flex-wrap items-center justify-center gap-3 pt-2",
  },
  variants: {
    size: {
      sm: { root: "p-6", icon: "size-12", title: "text-h4", description: "text-sm" },
      md: { root: "p-10", icon: "size-16", title: "text-h3", description: "text-base" },
      lg: { root: "p-16", icon: "size-20", title: "text-h2", description: "text-lg" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type EmptyStateVariants = VariantProps<typeof emptyState>;
