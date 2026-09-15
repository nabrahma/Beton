import { focusRingWithin } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const slider = tv({
  slots: {
    root: "flex w-full flex-col gap-2 data-disabled:cursor-not-allowed",
    header: "flex items-center justify-between gap-4",
    label: "font-display text-sm font-bold uppercase tracking-wide text-foreground",
    value: "font-mono text-sm font-bold tabular-nums text-foreground",
    control: "relative flex w-full touch-none select-none items-center py-4",
    track: "relative w-full grow border-3 border-border bg-raised data-disabled:bg-disabled",
    indicator: "h-full bg-primary data-disabled:bg-disabled-foreground",
    thumb: [
      "relative border-3 border-border bg-raised shadow-sm",
      "after:absolute after:content-['']",
      "data-dragging:shadow-none",
      "data-disabled:border-disabled-foreground data-disabled:bg-disabled data-disabled:shadow-none",
      focusRingWithin,
    ],
  },
  variants: {
    variant: {
      primary: { indicator: "bg-primary" },
      secondary: { indicator: "bg-secondary" },
      danger: { indicator: "bg-danger" },
    },
    size: {
      sm: { track: "h-2.5", thumb: "size-5 border-2 after:-inset-3" },
      md: { track: "h-3", thumb: "size-7 after:-inset-2" },
      lg: { track: "h-4", thumb: "size-9 after:-inset-1" },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type SliderVariants = VariantProps<typeof slider>;
