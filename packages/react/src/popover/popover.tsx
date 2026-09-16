"use client";

import { Popover as BasePopover } from "@base-ui/react/popover";
import { button, popover, type ButtonVariants, type PopoverVariants } from "@beton-ui/recipes";
import { createContext, useContext, type ReactNode } from "react";
import { CloseIcon } from "../utils/icons.tsx";

const PopoverContext = createContext<PopoverVariants>({ size: "md" });

function useStyles() {
  return popover(useContext(PopoverContext));
}

export interface PopoverProps extends BasePopover.Root.Props, PopoverVariants {}

function PopoverRoot({ size = "md", ...props }: PopoverProps) {
  return (
    <PopoverContext.Provider value={{ size }}>
      <BasePopover.Root {...props} />
    </PopoverContext.Provider>
  );
}

export interface PopoverTriggerProps
  extends Omit<BasePopover.Trigger.Props, "className">, Pick<ButtonVariants, "variant" | "size"> {
  className?: string;
}

function PopoverTrigger({
  variant = "secondary",
  size = "md",
  className,
  ...props
}: PopoverTriggerProps) {
  return <BasePopover.Trigger {...props} className={button({ variant, size, class: className })} />;
}

export interface PopoverContentProps extends Omit<BasePopover.Popup.Props, "className"> {
  className?: string;
  side?: BasePopover.Positioner.Props["side"];
  align?: BasePopover.Positioner.Props["align"];
  sideOffset?: number;
  /** Shows a close button in the corner. */
  showClose?: boolean;
  closeLabel?: string;
}

function PopoverContent({
  className,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  showClose = false,
  closeLabel = "Close",
  ...props
}: PopoverContentProps) {
  const styles = useStyles();
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={styles.positioner()}
      >
        <BasePopover.Popup {...props} className={styles.popup({ class: className })}>
          {children}
          {showClose ? (
            <BasePopover.Close
              aria-label={closeLabel}
              className={button({
                variant: "ghost",
                size: "sm",
                iconOnly: true,
                class: styles.close(),
              })}
            >
              <CloseIcon width={16} height={16} />
            </BasePopover.Close>
          ) : null}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

function PopoverTitle({
  className,
  ...props
}: Omit<BasePopover.Title.Props, "className"> & { className?: string }) {
  return <BasePopover.Title {...props} className={useStyles().title({ class: className })} />;
}

function PopoverDescription({
  className,
  ...props
}: Omit<BasePopover.Description.Props, "className"> & { className?: string }) {
  return (
    <BasePopover.Description {...props} className={useStyles().description({ class: className })} />
  );
}

export interface PopoverCloseProps
  extends Omit<BasePopover.Close.Props, "className">, Pick<ButtonVariants, "variant" | "size"> {
  className?: string;
  children?: ReactNode;
}

function PopoverClose({
  variant = "secondary",
  size = "sm",
  className,
  ...props
}: PopoverCloseProps) {
  return <BasePopover.Close {...props} className={button({ variant, size, class: className })} />;
}

/**
 * A non-modal panel anchored to its trigger. Escape closes it, an outside click
 * closes it, and focus returns to the trigger.
 */
export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Title: PopoverTitle,
  Description: PopoverDescription,
  Close: PopoverClose,
});
