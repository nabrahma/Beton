import { tv, type VariantProps } from "./tv.ts";

export const gridBackground = tv({
  slots: {
    root: "pointer-events-none absolute inset-0 -z-10",
  },
  variants: {
    weight: {
      light: { root: "opacity-40" },
      medium: { root: "opacity-70" },
      heavy: { root: "opacity-100" },
    },
  },
  defaultVariants: {
    weight: "medium",
  },
});

export const halftoneBackground = tv({
  slots: {
    root: "pointer-events-none absolute inset-0 -z-10",
  },
  variants: {
    weight: {
      light: { root: "opacity-15" },
      medium: { root: "opacity-30" },
      heavy: { root: "opacity-60" },
    },
  },
  defaultVariants: {
    weight: "medium",
  },
});

export const noiseOverlay = tv({
  slots: {
    root: "pointer-events-none absolute inset-0 z-10 mix-blend-multiply",
  },
  variants: {
    weight: {
      light: { root: "opacity-20" },
      medium: { root: "opacity-35" },
      heavy: { root: "opacity-60" },
    },
  },
  defaultVariants: {
    weight: "medium",
  },
});

export type GridBackgroundVariants = VariantProps<typeof gridBackground>;
export type HalftoneBackgroundVariants = VariantProps<typeof halftoneBackground>;
export type NoiseOverlayVariants = VariantProps<typeof noiseOverlay>;
