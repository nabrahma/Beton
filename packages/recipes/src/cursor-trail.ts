import { tv, type VariantProps } from "./tv.ts";

export const cursorTrail = tv({
  slots: {
    root: "pointer-events-none fixed inset-0 z-50",
    dot: "absolute border-3 border-border",
  },
  variants: {
    variant: {
      primary: { dot: "bg-primary" },
      secondary: { dot: "bg-secondary" },
      danger: { dot: "bg-danger" },
      ink: { dot: "bg-ink" },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const confetti = tv({
  slots: {
    root: "pointer-events-none fixed inset-0 z-50",
    piece: "absolute border-3 border-border",
  },
});

export type CursorTrailVariants = VariantProps<typeof cursorTrail>;
export type ConfettiVariants = VariantProps<typeof confetti>;
