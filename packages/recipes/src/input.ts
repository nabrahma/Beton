import { disabled, focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const input = tv({
  base: [
    "w-full min-w-0 border-3 border-border bg-raised text-foreground shadow-sm",
    "font-sans placeholder:text-disabled-foreground",
    "file:mr-3 file:border-0 file:bg-transparent file:font-display file:font-bold file:uppercase",
    "aria-invalid:bg-danger/15 data-invalid:bg-danger/15",
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
