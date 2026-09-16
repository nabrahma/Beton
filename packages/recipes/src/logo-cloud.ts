import { tv, type VariantProps } from "./tv.ts";

export const logoCloud = tv({
  slots: {
    list: "flex flex-wrap items-center justify-center gap-4",
    item: [
      "flex min-h-16 items-center justify-center border-3 border-border bg-raised px-6",
      "font-display font-black tracking-tight uppercase text-foreground",
    ],
  },
  variants: {
    size: {
      sm: { item: "min-h-12 px-4 text-sm" },
      md: { item: "min-h-16 px-6 text-lg" },
      lg: { item: "min-h-20 px-8 text-2xl" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type LogoCloudVariants = VariantProps<typeof logoCloud>;
