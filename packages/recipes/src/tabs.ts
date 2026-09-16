import { focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const tabs = tv({
  slots: {
    root: "flex w-full",
    list: "flex",
    tab: [
      "relative flex shrink-0 cursor-pointer select-none items-center justify-center gap-2",
      "border-3 border-transparent font-display font-extrabold uppercase tracking-wide text-foreground",
      "hover:underline",
      "data-active:border-border data-active:bg-raised",
      "data-disabled:cursor-not-allowed data-disabled:text-disabled-foreground data-disabled:no-underline",
      focusRing,
    ],
    panel: "min-w-0 flex-1 p-6 outline-none",
    indicator: "absolute bg-primary",
  },
  variants: {
    orientation: {
      horizontal: {
        root: "flex-col",
        list: "flex-row flex-wrap border-b-3 border-border",
        tab: "-mb-[3px] data-active:border-b-surface",
        indicator: "bottom-0 left-0 h-1 w-(--active-tab-width) translate-x-(--active-tab-left)",
      },
      vertical: {
        root: "flex-row",
        list: "flex-col border-r-3 border-border",
        tab: "-mr-[3px] justify-start data-active:border-r-surface",
        indicator: "top-0 left-0 h-(--active-tab-height) w-1 translate-y-(--active-tab-top)",
      },
    },
    size: {
      sm: { tab: "min-h-11 px-3 text-sm", panel: "p-4" },
      md: { tab: "min-h-12 px-4 text-base", panel: "p-6" },
      lg: { tab: "min-h-14 px-5 text-lg", panel: "p-8" },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

export type TabsVariants = VariantProps<typeof tabs>;
