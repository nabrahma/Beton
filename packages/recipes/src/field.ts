import { labelText } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const field = tv({
  slots: {
    root: "flex w-full flex-col gap-2",
    label: ["inline-flex w-fit items-center gap-1", labelText],
    description: "text-caption text-foreground",
    error: [
      "flex items-start gap-2 font-bold text-foreground",
      "before:mt-1 before:size-3 before:shrink-0 before:border-2 before:border-border before:bg-danger before:content-['']",
    ],
    fieldset: "flex w-full min-w-0 flex-col gap-3 border-0 p-0",
    legend: ["mb-1 p-0", labelText],
  },
  variants: {
    size: {
      sm: { label: "text-xs", description: "text-xs", error: "text-xs", legend: "text-xs" },
      md: { label: "text-sm", error: "text-sm", legend: "text-sm" },
      lg: { label: "text-base", description: "text-base", error: "text-base", legend: "text-base" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type FieldVariants = VariantProps<typeof field>;
