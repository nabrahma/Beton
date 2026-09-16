"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { button, sheet, type ButtonVariants, type SheetVariants } from "@beton-ui/recipes";
import { createContext, useContext, type ComponentProps, type ReactNode } from "react";
import { CloseIcon } from "../utils/icons.tsx";

const SheetContext = createContext<SheetVariants>({ side: "right", size: "md", variant: "ghost" });

function useStyles() {
  return sheet(useContext(SheetContext));
}

export interface SheetProps extends BaseDialog.Root.Props, SheetVariants {}

function SheetRoot({ side = "right", size = "md", variant = "ghost", ...props }: SheetProps) {
  return (
    <SheetContext.Provider value={{ side, size, variant }}>
      <BaseDialog.Root {...props} />
    </SheetContext.Provider>
  );
}

export interface SheetTriggerProps
  extends Omit<BaseDialog.Trigger.Props, "className">, Pick<ButtonVariants, "variant" | "size"> {
  className?: string;
}

function SheetTrigger({
  variant = "secondary",
  size = "md",
  className,
  ...props
}: SheetTriggerProps) {
  return <BaseDialog.Trigger {...props} className={button({ variant, size, class: className })} />;
}

export interface SheetContentProps extends Omit<BaseDialog.Popup.Props, "className"> {
  className?: string;
  showClose?: boolean;
  closeLabel?: string;
}

function SheetContent({
  className,
  children,
  showClose = true,
  closeLabel = "Close panel",
  ...props
}: SheetContentProps) {
  const styles = useStyles();
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={styles.backdrop()} />
      <BaseDialog.Popup {...props} className={styles.popup({ class: className })}>
        {children}
        {showClose ? (
          <BaseDialog.Close
            aria-label={closeLabel}
            className={button({
              variant: "ghost",
              size: "sm",
              iconOnly: true,
              class: styles.close(),
            })}
          >
            <CloseIcon width={18} height={18} />
          </BaseDialog.Close>
        ) : null}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

function SheetHeader({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={useStyles().header({ class: className })} />;
}

function SheetTitle({
  className,
  ...props
}: Omit<BaseDialog.Title.Props, "className"> & { className?: string }) {
  return <BaseDialog.Title {...props} className={useStyles().title({ class: className })} />;
}

function SheetDescription({
  className,
  ...props
}: Omit<BaseDialog.Description.Props, "className"> & { className?: string }) {
  return (
    <BaseDialog.Description {...props} className={useStyles().description({ class: className })} />
  );
}

function SheetBody({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={useStyles().body({ class: className })} />;
}

function SheetFooter({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={useStyles().footer({ class: className })} />;
}

export interface SheetCloseProps
  extends Omit<BaseDialog.Close.Props, "className">, Pick<ButtonVariants, "variant" | "size"> {
  className?: string;
  children?: ReactNode;
}

function SheetClose({ variant = "secondary", size = "md", className, ...props }: SheetCloseProps) {
  return <BaseDialog.Close {...props} className={button({ variant, size, class: className })} />;
}

/**
 * A panel anchored to an edge of the screen. Behaves like a dialog: focus is
 * trapped, Escape and an outside click close it, and focus returns to the trigger.
 */
export const Sheet = Object.assign(SheetRoot, {
  Trigger: SheetTrigger,
  Content: SheetContent,
  Header: SheetHeader,
  Title: SheetTitle,
  Description: SheetDescription,
  Body: SheetBody,
  Footer: SheetFooter,
  Close: SheetClose,
});
