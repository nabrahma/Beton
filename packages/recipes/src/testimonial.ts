import { tv, type VariantProps } from "./tv.ts";

export const testimonial = tv({
  slots: {
    root: "flex h-full flex-col gap-5 border-3 border-border bg-raised p-6 shadow-sm",
    mark: "font-display text-h1 leading-none font-black text-foreground select-none",
    quote: "text-pretty text-foreground",
    footer: "mt-auto flex items-center gap-3 border-t-3 border-border pt-4",
    person: "flex min-w-0 flex-col",
    name: "font-display font-extrabold text-foreground",
    role: "font-mono text-xs font-bold",
    list: "grid gap-6",
  },
  variants: {
    size: {
      sm: { quote: "text-base" },
      md: { quote: "text-lg" },
      lg: { quote: "text-xl" },
    },
    columns: {
      1: { list: "max-w-2xl" },
      2: { list: "sm:grid-cols-2" },
      3: { list: "sm:grid-cols-2 lg:grid-cols-3" },
    },
  },
  defaultVariants: {
    size: "md",
    columns: 3,
  },
});

export type TestimonialVariants = VariantProps<typeof testimonial>;
