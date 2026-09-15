import { focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const radioGroup = tv({
  slots: {
    root: "flex",
    item: [
      "inline-flex w-fit cursor-pointer items-center gap-3 font-medium text-foreground",
      "has-data-disabled:cursor-not-allowed has-data-disabled:text-disabled-foreground",
    ],
    radio: [
      "relative inline-flex shrink-0 items-center justify-center rounded-lg",
      "border-3 border-border bg-raised",
      "after:absolute after:content-['']",
      "data-invalid:bg-danger/15",
      "data-disabled:border-disabled-foreground data-disabled:bg-disabled data-disabled:data-checked:bg-disabled",
      focusRing,
    ],
    indicator:
      "rounded-lg border-2 border-border bg-foreground data-disabled:bg-disabled-foreground",
  },
  variants: {
    variant: {
      primary: { radio: "data-checked:bg-primary" },
      secondary: { radio: "data-checked:bg-secondary" },
      danger: { radio: "data-checked:bg-danger" },
    },
    size: {
      sm: { radio: "size-5 border-2 after:-inset-3", indicator: "size-2", item: "text-sm" },
      md: { radio: "size-6 after:-inset-2.5", indicator: "size-2.5", item: "text-base" },
      lg: { radio: "size-8 after:-inset-1.5", indicator: "size-3.5", item: "text-lg" },
    },
    orientation: {
      vertical: { root: "flex-col gap-3" },
      horizontal: { root: "flex-row flex-wrap gap-x-6 gap-y-3" },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    orientation: "vertical",
  },
});

export type RadioGroupVariants = VariantProps<typeof radioGroup>;
