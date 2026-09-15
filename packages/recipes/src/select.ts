import { disabled, fieldSurface, focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const select = tv({
  slots: {
    trigger: [
      "relative inline-flex w-full min-w-40 cursor-pointer select-none items-center justify-between gap-3 text-left",
      fieldSurface,
      "transition-[translate,box-shadow] duration-70 ease-linear motion-reduce:transition-none",
      "active:translate-x-1 active:translate-y-1 active:shadow-none",
      "data-popup-open:translate-x-1 data-popup-open:translate-y-1 data-popup-open:shadow-none",
      focusRing,
      disabled,
    ],
    value: "truncate data-placeholder:text-disabled-foreground",
    icon: "flex shrink-0 items-center",
    positioner: "z-50 outline-none",
    popup: [
      "max-h-(--available-height) min-w-(--anchor-width) overflow-y-auto",
      "border-3 border-border bg-raised text-foreground shadow-lg outline-none",
    ],
    list: "py-1",
    item: [
      "relative flex min-h-11 cursor-pointer select-none items-center gap-3 px-3 font-medium outline-none",
      "data-highlighted:bg-secondary data-selected:font-bold",
      "data-disabled:cursor-not-allowed data-disabled:text-disabled-foreground",
    ],
    itemIndicator: "flex size-4 shrink-0 items-center justify-center",
    itemText: "flex-1",
    groupLabel: "px-3 pt-3 pb-1 font-mono text-xs font-bold uppercase",
    separator: "my-1 h-0.5 bg-border",
    label: "font-display text-sm font-bold uppercase tracking-wide text-foreground",
  },
  variants: {
    size: {
      sm: { trigger: "h-11 px-2.5 text-sm", item: "text-sm" },
      md: { trigger: "h-12 px-3 text-base", item: "text-base" },
      lg: { trigger: "h-14 px-4 text-lg", item: "text-lg" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SelectVariants = VariantProps<typeof select>;
