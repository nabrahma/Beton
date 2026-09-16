"use client";

import { Toast as BaseToast } from "@base-ui/react/toast";
import { button, toast } from "@beton-ui/recipes";
import type { ReactNode } from "react";
import { CloseIcon } from "../utils/icons.tsx";

export interface ToastProviderProps extends Omit<BaseToast.Provider.Props, "children"> {
  children: ReactNode;
  /** Accessible name of each toast's dismiss button. */
  closeLabel?: string;
}

/**
 * Hosts the toast queue and renders the stack. Put it once, near the root of
 * your app, then call useToast() anywhere below it.
 */
export function ToastProvider({
  children,
  closeLabel = "Dismiss notification",
  ...props
}: ToastProviderProps) {
  const styles = toast();
  return (
    <BaseToast.Provider {...props}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className={styles.viewport()}>
          <ToastList closeLabel={closeLabel} />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

function ToastList({ closeLabel }: { closeLabel: string }) {
  const styles = toast();
  const { toasts } = BaseToast.useToastManager();

  return toasts.map((item) => (
    <BaseToast.Root key={item.id} toast={item} className={styles.root()}>
      <BaseToast.Content className={styles.content()}>
        <BaseToast.Title className={styles.title()} />
        <BaseToast.Description className={styles.description()} />
        {item.actionProps ? (
          <div className={styles.actions()}>
            <BaseToast.Action className={button({ variant: "secondary", size: "sm" })} />
          </div>
        ) : null}
      </BaseToast.Content>
      <BaseToast.Close
        aria-label={closeLabel}
        className={button({
          variant: "ghost",
          size: "sm",
          iconOnly: true,
          class: styles.close(),
        })}
      >
        <CloseIcon width={16} height={16} />
      </BaseToast.Close>
    </BaseToast.Root>
  ));
}

/**
 * Adds, updates and closes toasts. Set `type` to "success", "error",
 * "warning" or "info" to colour the toast.
 */
export const useToast = BaseToast.useToastManager;

/** Creates a manager for showing toasts from outside React. */
export const createToastManager = BaseToast.createToastManager;
