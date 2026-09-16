"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { button, dialog, type ButtonVariants, type DialogVariants } from "@beton-ui/recipes";
import { createContext, useContext, type ComponentProps, type ReactNode } from "react";
import { CloseIcon } from "../utils/icons.tsx";

const DialogContext = createContext<DialogVariants>({ variant: "ghost", size: "md" });

function useStyles() {
  return dialog(useContext(DialogContext));
}

export interface DialogProps extends BaseDialog.Root.Props, DialogVariants {}

function DialogRoot({ variant = "ghost", size = "md", ...props }: DialogProps) {
  return (
    <DialogContext.Provider value={{ variant, size }}>
      <BaseDialog.Root {...props} />
    </DialogContext.Provider>
  );
}

export interface DialogTriggerProps
  extends Omit<BaseDialog.Trigger.Props, "className">, Pick<ButtonVariants, "variant" | "size"> {
  className?: string;
}

function DialogTrigger({
  variant = "primary",
  size = "md",
  className,
  ...props
}: DialogTriggerProps) {
  return <BaseDialog.Trigger {...props} className={button({ variant, size, class: className })} />;
}

export interface DialogContentProps extends Omit<BaseDialog.Popup.Props, "className"> {
  className?: string;
  /** Shows the close button in the corner. */
  showClose?: boolean;
  closeLabel?: string;
}

function DialogContent({
  className,
  children,
  showClose = true,
  closeLabel = "Close dialog",
  ...props
}: DialogContentProps) {
  const styles = useStyles();
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={styles.backdrop()} />
      <BaseDialog.Viewport className={styles.viewport()}>
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
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  );
}

function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={useStyles().header({ class: className })} />;
}

function DialogTitle({
  className,
  ...props
}: Omit<BaseDialog.Title.Props, "className"> & { className?: string }) {
  return <BaseDialog.Title {...props} className={useStyles().title({ class: className })} />;
}

function DialogDescription({
  className,
  ...props
}: Omit<BaseDialog.Description.Props, "className"> & { className?: string }) {
  return (
    <BaseDialog.Description {...props} className={useStyles().description({ class: className })} />
  );
}

function DialogBody({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={useStyles().body({ class: className })} />;
}

function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={useStyles().footer({ class: className })} />;
}

export interface DialogCloseProps
  extends Omit<BaseDialog.Close.Props, "className">, Pick<ButtonVariants, "variant" | "size"> {
  className?: string;
  children?: ReactNode;
}

function DialogClose({
  variant = "secondary",
  size = "md",
  className,
  ...props
}: DialogCloseProps) {
  return <BaseDialog.Close {...props} className={button({ variant, size, class: className })} />;
}

/**
 * A modal dialog. Focus is trapped inside while open, Escape and an outside
 * click close it, and focus returns to the trigger.
 */
export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
});
