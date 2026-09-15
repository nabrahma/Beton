import { focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

// `switch` is a reserved word, so the recipe is exported as `switchStyles`.
export const switchStyles = tv({
  slots: {
    root: [
      "relative inline-flex shrink-0 cursor-pointer items-center border-3 border-border bg-raised p-0.5",
      "after:absolute after:content-['']",
      "data-invalid:bg-danger/15",
      "data-disabled:cursor-not-allowed data-disabled:border-disabled-foreground data-disabled:bg-disabled data-disabled:data-checked:bg-disabled",
      focusRing,
    ],
    thumb: [
      "block border-2 border-border bg-raised",
      "transition-[translate] duration-70 ease-linear motion-reduce:transition-none",
      "data-disabled:border-disabled-foreground",
    ],
  },
  variants: {
    variant: {
      primary: { root: "data-checked:bg-primary" },
      secondary: { root: "data-checked:bg-secondary" },
      danger: { root: "data-checked:bg-danger" },
    },
    // Track inner size = outer size minus 6px border and 4px padding; the thumb
    // travels exactly the remaining width.
    size: {
      sm: {
        root: "h-6 w-10 after:-inset-x-0.5 after:-inset-y-2.5",
        thumb: "size-3.5 data-checked:translate-x-4",
      },
      md: {
        root: "h-8 w-14 after:inset-x-0 after:-inset-y-1.5",
        thumb: "size-5.5 data-checked:translate-x-6",
      },
      lg: {
        root: "h-10 w-18 after:inset-x-0 after:-inset-y-0.5",
        thumb: "size-7.5 data-checked:translate-x-8",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type SwitchVariants = VariantProps<typeof switchStyles>;
