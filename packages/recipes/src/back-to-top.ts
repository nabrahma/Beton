import { tv, type VariantProps } from "./tv.ts";

export const backToTop = tv({
  slots: {
    root: "fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6",
  },
  variants: {
    hidden: {
      true: { root: "pointer-events-none invisible opacity-0" },
      false: { root: "visible opacity-100" },
    },
  },
  defaultVariants: {
    hidden: false,
  },
});

export type BackToTopVariants = VariantProps<typeof backToTop>;
