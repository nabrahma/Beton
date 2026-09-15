import { disabled, fieldSurface, focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const textarea = tv({
  base: [
    "block w-full min-w-0 resize-y",
    fieldSurface,
    "read-only:shadow-none",
    focusRing,
    disabled,
  ],
  variants: {
    size: {
      sm: "min-h-24 px-2.5 py-2 text-sm",
      md: "min-h-28 px-3 py-2.5 text-base",
      lg: "min-h-36 px-4 py-3 text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type TextareaVariants = VariantProps<typeof textarea>;
