import { tv, type VariantProps } from "./tv.ts";

export const text = tv({
  base: "font-sans text-foreground",
  variants: {
    size: {
      sm: "text-caption",
      md: "text-body",
      lg: "text-xl leading-relaxed",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
    mono: {
      true: "font-mono",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "regular",
    mono: false,
  },
});

export const heading = tv({
  base: "font-display text-foreground text-balance",
  variants: {
    size: {
      sm: "text-2xl font-extrabold leading-tight sm:text-h4",
      md: "text-3xl font-extrabold leading-none tracking-tight sm:text-4xl lg:text-h3",
      lg: "text-4xl font-black leading-none tracking-tight sm:text-5xl lg:text-h2",
      xl: "text-5xl font-black leading-[0.95] tracking-tighter sm:text-7xl lg:text-h1",
    },
    uppercase: {
      true: "uppercase",
    },
  },
  defaultVariants: {
    size: "md",
    uppercase: false,
  },
});

export type TextVariants = VariantProps<typeof text>;
export type HeadingVariants = VariantProps<typeof heading>;
