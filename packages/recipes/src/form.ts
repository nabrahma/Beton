import { tv, type VariantProps } from "./tv.ts";

export const form = tv({
  base: "flex w-full flex-col",
  variants: {
    size: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type FormVariants = VariantProps<typeof form>;
