import { focusRingWithin, labelText } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const numberInput = tv({
  slots: {
    root: "flex w-full flex-col gap-2",
    label: ["w-fit text-sm", labelText],
    group: [
      "flex w-full items-stretch border-3 border-border bg-raised text-foreground shadow-sm",
      "data-invalid:bg-danger/15",
      "data-disabled:border-disabled-foreground data-disabled:bg-disabled data-disabled:text-disabled-foreground data-disabled:shadow-none",
      focusRingWithin,
    ],
    input: [
      "min-w-0 flex-1 bg-transparent px-2 text-center font-mono font-bold tabular-nums outline-none",
      "data-disabled:cursor-not-allowed",
    ],
    button: [
      "flex shrink-0 cursor-pointer items-center justify-center bg-secondary font-display font-black",
      "hover:bg-primary active:bg-primary",
      "data-disabled:cursor-not-allowed data-disabled:bg-disabled data-disabled:text-disabled-foreground",
      "focus-visible:outline-none",
    ],
    decrement: "border-r-3 border-border",
    increment: "border-l-3 border-border",
  },
  variants: {
    size: {
      sm: { group: "h-11", input: "text-sm", button: "w-11 text-lg" },
      md: { group: "h-12", input: "text-base", button: "w-12 text-xl" },
      lg: { group: "h-14", input: "text-lg", button: "w-14 text-2xl" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type NumberInputVariants = VariantProps<typeof numberInput>;
