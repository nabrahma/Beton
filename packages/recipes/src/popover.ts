import { popupSurface } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const popover = tv({
  slots: {
    positioner: "z-50 outline-none",
    popup: ["relative flex max-w-(--available-width) flex-col gap-2 p-5 shadow-sm", popupSurface],
    title: "pr-10 font-display text-lg font-extrabold leading-tight",
    description: "text-sm",
    close: "absolute top-2 right-2",
  },
  variants: {
    size: {
      sm: { popup: "w-56" },
      md: { popup: "w-72" },
      lg: { popup: "w-96" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type PopoverVariants = VariantProps<typeof popover>;
