"use client";

import { NumberField } from "@base-ui/react/number-field";
import { numberInput, type NumberInputVariants } from "@beton-ui/recipes";
import { useId, type ReactNode } from "react";
import { MinusIcon, PlusIcon } from "../utils/icons.tsx";

export interface NumberInputProps
  extends Omit<NumberField.Root.Props, "className" | "children">, NumberInputVariants {
  className?: string;
  /** Visible label. Without it, pass `aria-label`. */
  label?: ReactNode;
  decrementLabel?: string;
  incrementLabel?: string;
}

/** A numeric field with stepper buttons. Arrow keys step, Shift+Arrow takes large steps. */
export function NumberInput({
  size = "md",
  label,
  decrementLabel = "Decrease",
  incrementLabel = "Increase",
  className,
  id,
  "aria-label": ariaLabel,
  ...props
}: NumberInputProps) {
  const styles = numberInput({ size });
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <NumberField.Root
      {...props}
      id={inputId}
      data-size={size}
      className={styles.root({ class: className })}
    >
      {label ? (
        <label htmlFor={inputId} className={styles.label()}>
          {label}
        </label>
      ) : null}
      <NumberField.Group className={styles.group()}>
        <NumberField.Decrement
          aria-label={decrementLabel}
          className={styles.button({ class: styles.decrement() })}
        >
          <MinusIcon width={18} height={18} />
        </NumberField.Decrement>
        <NumberField.Input aria-label={label ? undefined : ariaLabel} className={styles.input()} />
        <NumberField.Increment
          aria-label={incrementLabel}
          className={styles.button({ class: styles.increment() })}
        >
          <PlusIcon width={18} height={18} />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}
