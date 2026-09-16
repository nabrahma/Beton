import { popupSurface } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const menu = tv({
  slots: {
    positioner: "z-50 outline-none",
    popup: ["min-w-52 max-w-(--available-width) py-1 shadow-sm", popupSurface],
    item: [
      "relative flex min-h-11 cursor-pointer select-none items-center gap-3 px-3 font-medium outline-none",
      "data-highlighted:bg-secondary data-popup-open:bg-secondary",
      "data-disabled:cursor-not-allowed data-disabled:text-disabled-foreground",
    ],
    indicator: "flex size-4 shrink-0 items-center justify-center",
    shortcut: "ml-auto pl-6 font-mono text-xs font-bold",
    chevron: "ml-auto size-4 shrink-0 -rotate-90",
    separator: "my-1 h-0.5 bg-border",
    groupLabel: "px-3 pt-2 pb-1 font-mono text-xs font-bold uppercase",
  },
  variants: {
    size: {
      sm: { item: "text-sm" },
      md: { item: "text-base" },
      lg: { item: "min-h-12 text-lg" },
    },
    danger: {
      true: { item: "data-highlighted:bg-danger" },
    },
  },
  defaultVariants: {
    size: "md",
    danger: false,
  },
});

export type MenuVariants = VariantProps<typeof menu>;
