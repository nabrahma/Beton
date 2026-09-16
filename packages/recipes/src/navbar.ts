import { focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const navbar = tv({
  slots: {
    root: "w-full border-b-3 border-border bg-raised",
    inner: "mx-auto flex w-full max-w-7xl items-center gap-6 px-4 sm:px-6",
    brand: [
      "flex shrink-0 items-center gap-2.5 font-display font-black uppercase tracking-tight text-foreground",
      focusRing,
    ],
    nav: "hidden flex-1 items-center gap-1 md:flex",
    link: [
      "flex min-h-11 items-center border-3 border-transparent px-3",
      "font-display font-extrabold uppercase tracking-wide text-foreground",
      "hover:border-border aria-[current=page]:border-border aria-[current=page]:bg-secondary",
      focusRing,
    ],
    actions: "ml-auto flex items-center gap-3",
  },
  variants: {
    size: {
      sm: { inner: "h-14", brand: "text-lg", link: "text-sm" },
      md: { inner: "h-16", brand: "text-2xl", link: "text-sm" },
      lg: { inner: "h-20", brand: "text-3xl", link: "text-base" },
    },
    sticky: {
      true: { root: "sticky top-0 z-40" },
    },
  },
  defaultVariants: {
    size: "md",
    sticky: false,
  },
});

export type NavbarVariants = VariantProps<typeof navbar>;
