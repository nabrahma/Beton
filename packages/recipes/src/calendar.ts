import { focusRing, pressable } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const calendar = tv({
  slots: {
    root: "inline-flex w-full max-w-sm flex-col gap-3 border-3 border-border bg-raised p-4 shadow-sm",
    header: "flex items-center justify-between gap-2",
    heading: "font-display text-lg font-black tracking-tight uppercase text-foreground",
    nav: "flex items-center gap-2",
    navButton: [
      "inline-flex size-11 cursor-pointer items-center justify-center",
      "border-3 border-border bg-raised text-foreground",
      pressable,
      focusRing,
    ],
    grid: "w-full border-collapse",
    weekdays: "",
    weekday: "pb-1 text-center font-mono text-xs font-bold tracking-widest uppercase",
    week: "",
    cell: "p-0.5 text-center",
    day: [
      "flex size-11 cursor-pointer items-center justify-center",
      "border-3 border-transparent font-display font-bold text-foreground tabular-nums",
      "hover:border-border",
      "data-today:border-border",
      "data-selected:border-border data-selected:bg-primary data-selected:font-black",
      "data-outside:text-disabled-foreground",
      "data-disabled:cursor-not-allowed data-disabled:bg-disabled data-disabled:text-disabled-foreground",
      focusRing,
    ],
    footer: "flex items-center justify-between gap-2 border-t-3 border-border pt-3",
  },
});

export type CalendarVariants = VariantProps<typeof calendar>;
