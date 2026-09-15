import { disabled, fieldSurface, focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const otpInput = tv({
  slots: {
    root: "flex w-fit flex-wrap items-center gap-2",
    input: [
      fieldSurface,
      // After fieldSurface, so the monospace face wins over its font-sans.
      "text-center font-mono font-bold caret-foreground",
      "data-filled:bg-secondary aria-invalid:data-filled:bg-danger/15",
      focusRing,
      disabled,
    ],
    separator: "h-1 w-3 shrink-0 bg-border",
  },
  variants: {
    size: {
      sm: { input: "size-11 text-lg" },
      md: { input: "size-12 text-xl" },
      lg: { input: "size-14 text-2xl" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type OtpInputVariants = VariantProps<typeof otpInput>;
