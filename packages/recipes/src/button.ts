import { focusRing, hitArea, pressable } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const button = tv({
  base: [
    "relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap",
    "border-3 border-border font-display font-extrabold uppercase tracking-wide text-foreground",
    focusRing,
    // Disabled: flat grey. A loading button keeps its fill and sits pressed instead.
    "not-data-loading:data-disabled:cursor-not-allowed not-data-loading:data-disabled:border-disabled-foreground not-data-loading:data-disabled:bg-disabled not-data-loading:data-disabled:text-disabled-foreground not-data-loading:data-disabled:shadow-none not-data-loading:data-disabled:translate-none",
    "data-loading:cursor-progress data-loading:translate-x-1 data-loading:translate-y-1 data-loading:shadow-none",
  ],
  variants: {
    variant: {
      primary: ["bg-primary", pressable],
      secondary: ["bg-raised", pressable],
      ghost: [
        "border-transparent bg-transparent shadow-none",
        "hover:border-border active:bg-secondary data-pressed:bg-secondary",
      ],
      danger: ["bg-danger", pressable],
    },
    size: {
      sm: ["h-9 gap-1.5 px-3 text-sm", hitArea],
      md: "h-11 gap-2 px-5 text-base",
      lg: "h-14 gap-2.5 px-7 text-lg",
    },
    iconOnly: {
      true: "px-0",
    },
  },
  compoundVariants: [
    { iconOnly: true, size: "sm", class: "w-9" },
    { iconOnly: true, size: "md", class: "w-11" },
    { iconOnly: true, size: "lg", class: "w-14" },
  ],
  defaultVariants: {
    variant: "primary",
    size: "md",
    iconOnly: false,
  },
});

export type ButtonVariants = VariantProps<typeof button>;
