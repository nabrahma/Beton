import { label, type LabelVariants } from "@beton-ui/recipes";
import type { ComponentProps } from "react";
import { dataAttr } from "../utils/render-element.ts";

export interface LabelProps extends ComponentProps<"label">, LabelVariants {
  /** Shows a required marker. Also set `required` on the associated control. */
  required?: boolean;
  /** Styles the label as disabled. */
  disabled?: boolean;
}

export function Label({
  size = "md",
  required = false,
  disabled = false,
  className,
  children,
  ...props
}: LabelProps) {
  const styles = label({ size });
  return (
    <label
      {...props}
      data-size={size}
      data-disabled={dataAttr(disabled)}
      className={styles.root({ class: className })}
    >
      {children}
      {required ? (
        <span aria-hidden="true" className={styles.indicator()}>
          *
        </span>
      ) : null}
    </label>
  );
}
