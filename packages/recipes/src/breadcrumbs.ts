import { focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const breadcrumbs = tv({
  slots: {
    root: "w-full",
    list: "flex flex-wrap items-center gap-x-2 gap-y-1",
    item: "flex items-center gap-2",
    link: [
      "relative inline-flex min-h-11 items-center font-display font-bold text-foreground",
      "underline decoration-3 decoration-primary underline-offset-4 hover:bg-secondary",
      focusRing,
    ],
    current: "inline-flex min-h-11 items-center font-display font-extrabold text-foreground",
    separator: "font-mono font-bold text-foreground select-none",
  },
  variants: {
    size: {
      sm: { link: "text-sm", current: "text-sm", separator: "text-sm" },
      md: { link: "text-base", current: "text-base", separator: "text-base" },
      lg: { link: "text-lg", current: "text-lg", separator: "text-lg" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type BreadcrumbsVariants = VariantProps<typeof breadcrumbs>;
