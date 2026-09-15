import { disabled, fieldSurface, focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const input = tv({
  base: [
    "w-full min-w-0",
    fieldSurface,
    "file:mr-3 file:border-0 file:bg-transparent file:font-display file:font-bold file:uppercase",
    "read-only:shadow-none",
    focusRing,
    disabled,
  ],
  variants: {
    size: {
      sm: "h-11 px-2.5 text-sm",
      md: "h-12 px-3 text-base",
      lg: "h-14 px-4 text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type InputVariants = VariantProps<typeof input>;
