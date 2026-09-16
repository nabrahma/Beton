import { tv, type VariantProps } from "./tv.ts";

export const progress = tv({
  slots: {
    root: "flex w-full flex-col gap-2",
    header: "flex items-baseline justify-between gap-4",
    label: "font-display font-bold tracking-wide uppercase text-foreground",
    value: "font-mono font-bold text-foreground",
    track: "w-full overflow-hidden border-3 border-border bg-surface",
    indicator: [
      "h-full transition-[width] duration-100 ease-linear motion-reduce:transition-none",
      "data-indeterminate:w-2/5 data-indeterminate:animate-indeterminate",
    ],
  },
  variants: {
    variant: {
      primary: { indicator: "bg-primary" },
      secondary: { indicator: "bg-secondary" },
      success: { indicator: "bg-success" },
      danger: { indicator: "bg-danger" },
    },
    size: {
      sm: { track: "h-4", label: "text-xs", value: "text-xs" },
      md: { track: "h-6", label: "text-sm", value: "text-sm" },
      lg: { track: "h-8", label: "text-base", value: "text-base" },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ProgressVariants = VariantProps<typeof progress>;
