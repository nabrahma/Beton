"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { button, dialog, type ButtonVariants, type DialogVariants } from "@beton-ui/recipes";
import { createContext, useContext, type ComponentProps, type ReactNode } from "react";

const AlertDialogContext = createContext<DialogVariants>({ variant: "danger", size: "sm" });

function useStyles() {
  return dialog(useContext(AlertDialogContext));
}

export interface AlertDialogProps extends BaseAlertDialog.Root.Props, DialogVariants {}

function AlertDialogRoot({ variant = "danger", size = "sm", ...props }: AlertDialogProps) {
  return (
    <AlertDialogContext.Provider value={{ variant, size }}>
      <BaseAlertDialog.Root {...props} />
    </AlertDialogContext.Provider>
  );
}

export interface AlertDialogTriggerProps
  extends
    Omit<BaseAlertDialog.Trigger.Props, "className">,
    Pick<ButtonVariants, "variant" | "size"> {
  className?: string;
}

function AlertDialogTrigger({
  variant = "danger",
  size = "md",
  className,
  ...props
}: AlertDialogTriggerProps) {
  return (
    <BaseAlertDialog.Trigger {...props} className={button({ variant, size, class: className })} />
  );
}

export interface AlertDialogContentProps extends Omit<BaseAlertDialog.Popup.Props, "className"> {
  className?: string;
}

function AlertDialogContent({ className, children, ...props }: AlertDialogContentProps) {
  const styles = useStyles();
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop className={styles.backdrop()} />
      <BaseAlertDialog.Viewport className={styles.viewport()}>
        <BaseAlertDialog.Popup {...props} className={styles.popup({ class: className })}>
          {children}
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Viewport>
    </BaseAlertDialog.Portal>
  );
}

function AlertDialogHeader({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={useStyles().header({ class: className })} />;
}

function AlertDialogTitle({
  className,
  ...props
}: Omit<BaseAlertDialog.Title.Props, "className"> & { className?: string }) {
  return <BaseAlertDialog.Title {...props} className={useStyles().title({ class: className })} />;
}

function AlertDialogDescription({
  className,
  ...props
}: Omit<BaseAlertDialog.Description.Props, "className"> & { className?: string }) {
  return (
    <BaseAlertDialog.Description
      {...props}
      className={useStyles().description({ class: className })}
    />
  );
}

function AlertDialogBody({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={useStyles().body({ class: className })} />;
}

function AlertDialogFooter({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={useStyles().footer({ class: className })} />;
}

export interface AlertDialogCloseProps
  extends Omit<BaseAlertDialog.Close.Props, "className">, Pick<ButtonVariants, "variant" | "size"> {
  className?: string;
  children?: ReactNode;
}

/** Dismisses the dialog. Use it for both the cancel and the confirm action. */
function AlertDialogClose({
  variant = "secondary",
  size = "md",
  className,
  ...props
}: AlertDialogCloseProps) {
  return (
    <BaseAlertDialog.Close {...props} className={button({ variant, size, class: className })} />
  );
}

/**
 * A dialog that interrupts to confirm a consequential action. Unlike Dialog it
 * cannot be dismissed by clicking outside, so the choice has to be explicit.
 */
export const AlertDialog = Object.assign(AlertDialogRoot, {
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Header: AlertDialogHeader,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Body: AlertDialogBody,
  Footer: AlertDialogFooter,
  Close: AlertDialogClose,
});
