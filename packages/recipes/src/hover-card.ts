import { popupSurface } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const hoverCard = tv({
  slots: {
    positioner: "z-50 outline-none",
    popup: ["flex max-w-(--available-width) flex-col gap-3 p-5 shadow-lg", popupSurface],
  },
  variants: {
    size: {
      sm: { popup: "w-60" },
      md: { popup: "w-80" },
      lg: { popup: "w-[26rem]" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type HoverCardVariants = VariantProps<typeof hoverCard>;
