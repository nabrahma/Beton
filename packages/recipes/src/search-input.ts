import { disabled, fieldSurface, focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const searchInput = tv({
  slots: {
    root: "relative flex w-full items-center",
    icon: "pointer-events-none absolute left-3 shrink-0 text-foreground",
    input: [
      "w-full min-w-0",
      fieldSurface,
      "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
      focusRing,
      disabled,
    ],
    clear: "absolute right-1.5",
  },
  variants: {
    size: {
      sm: { input: "h-11 pr-11 pl-9 text-sm", icon: "left-2.5 size-4" },
      md: { input: "h-12 pr-12 pl-10 text-base", icon: "size-5" },
      lg: { input: "h-14 pr-14 pl-12 text-lg", icon: "left-3.5 size-6", clear: "right-2" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SearchInputVariants = VariantProps<typeof searchInput>;
