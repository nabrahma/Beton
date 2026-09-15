import { tv, type VariantProps } from "./tv.ts";

export const avatar = tv({
  slots: {
    root: [
      "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden",
      "rounded-md border-3 border-border align-middle font-display font-extrabold uppercase text-foreground",
    ],
    image: "size-full object-cover",
    fallback: "flex size-full items-center justify-center",
  },
  variants: {
    variant: {
      primary: { root: "bg-primary" },
      secondary: { root: "bg-secondary" },
      ghost: { root: "bg-raised" },
      danger: { root: "bg-danger" },
    },
    size: {
      sm: { root: "size-8 border-2 text-xs" },
      md: { root: "size-11 text-sm" },
      lg: { root: "size-16 text-xl" },
    },
  },
  defaultVariants: {
    variant: "secondary",
    size: "md",
  },
});

export type AvatarVariants = VariantProps<typeof avatar>;
