import { tv, type VariantProps } from "./tv.ts";

export const stepper = tv({
  slots: {
    root: "flex w-full",
    item: "relative flex min-w-0 flex-1 gap-3",
    marker: [
      "z-10 flex shrink-0 items-center justify-center border-3 border-border bg-raised",
      "font-display font-black text-foreground",
      "data-[state=complete]:bg-primary data-[state=current]:bg-secondary",
    ],
    content: "flex min-w-0 flex-col gap-0.5",
    title: "font-display font-extrabold text-foreground",
    description: "text-caption text-foreground",
    connector: "bg-border data-[state=complete]:bg-primary",
  },
  variants: {
    orientation: {
      horizontal: {
        root: "flex-row items-start gap-2",
        item: "flex-col items-center text-center",
        connector:
          "absolute top-(--connector-offset) right-[calc(-50%+var(--marker-half))] left-[calc(50%+var(--marker-half))] h-1",
      },
      vertical: {
        root: "flex-col gap-6",
        item: "flex-row items-start pb-6 last:pb-0",
        connector: "absolute top-(--marker-size) bottom-0 left-(--connector-offset) w-1",
      },
    },
    size: {
      sm: {
        root: "[--marker-size:2.25rem] [--marker-half:1.125rem] [--connector-offset:1rem]",
        marker: "size-9 text-sm",
        title: "text-sm",
      },
      md: {
        root: "[--marker-size:2.75rem] [--marker-half:1.375rem] [--connector-offset:1.25rem]",
        marker: "size-11 text-base",
        title: "text-base",
      },
      lg: {
        root: "[--marker-size:3.5rem] [--marker-half:1.75rem] [--connector-offset:1.625rem]",
        marker: "size-14 text-lg",
        title: "text-lg",
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

export type StepperVariants = VariantProps<typeof stepper>;
