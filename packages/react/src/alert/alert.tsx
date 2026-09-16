import { alert, type AlertVariants } from "@beton-ui/recipes";
import type { ComponentProps, ReactNode } from "react";

export interface AlertProps extends Omit<ComponentProps<"div">, "title">, AlertVariants {
  /** The headline of the message. */
  title?: ReactNode;
  /** A mark before the text. Decorative: it is hidden from screen readers. */
  icon?: ReactNode;
  /** Buttons under the text. */
  actions?: ReactNode;
  /** A dismiss button at the end of the banner. */
  onClose?: ReactNode;
  /**
   * Announces the message as it appears. Use "assertive" only for something
   * that has gone wrong right now.
   */
  live?: "off" | "polite" | "assertive";
}

/** A message that stays on the page: a warning, a result, a piece of context. */
export function Alert({
  variant = "info",
  size = "md",
  title,
  icon,
  actions,
  onClose,
  live,
  className,
  children,
  ...props
}: AlertProps) {
  const styles = alert({ variant, size });
  const assertive = live === "assertive" || (live === undefined && variant === "danger");
  return (
    <div
      {...props}
      role={assertive ? "alert" : "status"}
      aria-live={live === "off" ? "off" : assertive ? "assertive" : "polite"}
      data-variant={variant}
      className={styles.root({ class: className })}
    >
      {icon ? (
        <span aria-hidden="true" className={styles.icon()}>
          {icon}
        </span>
      ) : null}
      <div className={styles.content()}>
        {title ? <p className={styles.title()}>{title}</p> : null}
        {children ? <div className={styles.description()}>{children}</div> : null}
        {actions ? <div className={styles.actions()}>{actions}</div> : null}
      </div>
      {onClose ? <div className={styles.close()}>{onClose}</div> : null}
    </div>
  );
}
