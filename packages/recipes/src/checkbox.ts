import { focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const checkbox = tv({
  slots: {
    root: [
      "relative inline-flex shrink-0 cursor-pointer items-center justify-center",
      "border-3 border-border bg-raised text-foreground",
      "after:absolute after:content-['']",
      "data-invalid:bg-danger/15 data-readonly:cursor-default",
      "data-disabled:cursor-not-allowed data-disabled:border-disabled-foreground data-disabled:bg-disabled data-disabled:text-disabled-foreground",
      "data-disabled:data-checked:bg-disabled data-disabled:data-indeterminate:bg-disabled",
      focusRing,
    ],
    indicator: "flex size-full items-center justify-center",
    icon: "size-full",
  },
  variants: {
    variant: {
      primary: { root: "data-checked:bg-primary data-indeterminate:bg-primary" },
      secondary: { root: "data-checked:bg-secondary data-indeterminate:bg-secondary" },
      danger: { root: "data-checked:bg-danger data-indeterminate:bg-danger" },
    },
    size: {
      // Hit-area extensions bring every size to a 44px target.
      sm: { root: "size-5 border-2 after:-inset-3" },
      md: { root: "size-6 after:-inset-2.5" },
      lg: { root: "size-8 after:-inset-1.5" },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type CheckboxVariants = VariantProps<typeof checkbox>;
