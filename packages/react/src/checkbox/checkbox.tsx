"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { checkbox, type CheckboxVariants } from "@beton-ui/recipes";
import { CheckIcon, MinusIcon } from "../utils/icons.tsx";

export interface CheckboxProps
  extends Omit<BaseCheckbox.Root.Props, "className" | "children">, CheckboxVariants {
  className?: string;
}

/**
 * A checkbox. Name it by wrapping it in a `<label>` with text, placing it in a
 * `Field`, or passing `aria-label`.
 */
export function Checkbox({ variant = "primary", size = "md", className, ...props }: CheckboxProps) {
  const styles = checkbox({ variant, size });
  return (
    <BaseCheckbox.Root
      {...props}
      data-variant={variant}
      data-size={size}
      className={styles.root({ class: className })}
    >
      <BaseCheckbox.Indicator
        className={styles.indicator()}
        render={(indicatorProps, state) => (
          <span {...indicatorProps}>
            {state.indeterminate ? (
              <MinusIcon className={styles.icon()} />
            ) : (
              <CheckIcon className={styles.icon()} />
            )}
          </span>
        )}
      />
    </BaseCheckbox.Root>
  );
}
