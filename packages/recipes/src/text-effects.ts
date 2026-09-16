import { tv, type VariantProps } from "./tv.ts";

/** Scramble, typewriter and counter share one plain typographic surface. */
export const textEffect = tv({
  base: "font-display font-black tracking-tight text-foreground tabular-nums",
  variants: {
    size: {
      sm: "text-h4",
      md: "text-h3",
      lg: "text-h2",
      xl: "text-h1",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const typewriter = tv({
  slots: {
    root: "font-display font-black tracking-tight text-foreground",
    caret: "ml-0.5 inline-block w-[0.6ch] bg-foreground align-baseline motion-safe:animate-blink",
  },
  variants: {
    size: {
      sm: { root: "text-h4", caret: "h-[1em]" },
      md: { root: "text-h3", caret: "h-[1em]" },
      lg: { root: "text-h2", caret: "h-[1em]" },
      xl: { root: "text-h1", caret: "h-[1em]" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const glitchText = tv({
  slots: {
    root: "relative inline-block font-display font-black tracking-tight text-foreground",
    layer: "pointer-events-none absolute inset-0 select-none",
    body: "relative",
    a: "text-primary motion-safe:animate-glitch-a motion-reduce:hidden",
    b: "text-danger motion-safe:animate-glitch-b motion-reduce:hidden",
  },
  variants: {
    size: {
      sm: { root: "text-h4" },
      md: { root: "text-h3" },
      lg: { root: "text-h2" },
      xl: { root: "text-h1" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type TextEffectVariants = VariantProps<typeof textEffect>;
export type TypewriterVariants = VariantProps<typeof typewriter>;
export type GlitchTextVariants = VariantProps<typeof glitchText>;
