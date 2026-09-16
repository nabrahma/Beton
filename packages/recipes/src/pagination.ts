import { focusRing, pressable } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const pagination = tv({
  slots: {
    root: "flex w-full items-center justify-between gap-4",
    list: "flex flex-wrap items-center gap-2",
    item: [
      "inline-flex shrink-0 cursor-pointer items-center justify-center",
      "border-3 border-border bg-raised font-display font-extrabold text-foreground",
      "aria-[current=page]:bg-primary",
      "data-disabled:cursor-not-allowed data-disabled:border-disabled-foreground data-disabled:bg-disabled data-disabled:text-disabled-foreground data-disabled:shadow-none",
      pressable,
      focusRing,
    ],
    ellipsis: "inline-flex items-center justify-center font-mono font-bold select-none",
    status: "font-mono text-sm font-bold",
  },
  variants: {
    size: {
      sm: { item: "size-11 text-sm", ellipsis: "size-11 text-sm" },
      md: { item: "size-12 text-base", ellipsis: "size-12" },
      lg: { item: "size-14 text-lg", ellipsis: "size-14 text-lg" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type PaginationVariants = VariantProps<typeof pagination>;
