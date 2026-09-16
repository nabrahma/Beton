import { tv, type VariantProps } from "./tv.ts";

export const sticker = tv({
  slots: {
    // Square, not round: the radius scale has three values and none of them
    // is a circle. The type does the circling instead.
    root: "relative inline-grid shrink-0 place-items-center border-3 border-border shadow-sm",
    spinner: "absolute inset-0 motion-safe:animate-spin-slow motion-reduce:animate-none",
    text: "fill-current font-display font-black tracking-[0.2em] uppercase",
    center: "relative z-10 grid place-items-center font-display font-black uppercase",
  },
  variants: {
    variant: {
      primary: { root: "bg-primary text-ink" },
      secondary: { root: "bg-secondary text-ink" },
      ghost: { root: "bg-raised text-ink" },
      danger: { root: "bg-danger text-ink" },
    },
    reverse: {
      true: { spinner: "[animation-direction:reverse]" },
    },
    size: {
      sm: { root: "size-24", center: "text-xs" },
      md: { root: "size-32", center: "text-sm" },
      lg: { root: "size-44", center: "text-base" },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    reverse: false,
  },
});

export type StickerVariants = VariantProps<typeof sticker>;
