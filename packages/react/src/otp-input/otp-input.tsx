"use client";

import { OTPField } from "@base-ui/react/otp-field";
import { otpInput, type OtpInputVariants } from "@beton-ui/recipes";
import { Fragment, useId } from "react";

export interface OtpInputProps
  extends Omit<OTPField.Root.Props, "className" | "children" | "length">, OtpInputVariants {
  className?: string;
  /** Number of characters. */
  length?: number;
  /** Inserts a separator after every `groupSize` characters, e.g. 3 for "123-456". */
  groupSize?: number;
  /** Accessible name for each slot after the first. */
  slotLabel?: (index: number, length: number) => string;
}

/**
 * A one-time code entry split into single-character slots. Supports paste,
 * autofill from SMS and arrow-key navigation. Label it with a `<label htmlFor>`
 * pointing at `id`, with `aria-labelledby`, or with `aria-label`.
 */
export function OtpInput({
  length = 6,
  groupSize,
  size = "md",
  className,
  slotLabel = (index, total) => `Character ${index + 1} of ${total}`,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: OtpInputProps) {
  const styles = otpInput({ size });
  const labelId = useId();
  // Base UI names the first slot only through aria-labelledby, so an
  // aria-label is rendered as a hidden label element and referenced instead.
  const labelledBy = ariaLabelledBy ?? (ariaLabel ? labelId : undefined);

  return (
    <>
      {ariaLabel && !ariaLabelledBy ? (
        <span id={labelId} hidden>
          {ariaLabel}
        </span>
      ) : null}
      <OTPField.Root
        {...props}
        aria-labelledby={labelledBy}
        length={length}
        data-size={size}
        className={styles.root({ class: className })}
      >
        {Array.from({ length }, (_, index) => (
          <Fragment key={index}>
            {groupSize && index > 0 && index % groupSize === 0 ? (
              <OTPField.Separator className={styles.separator()} />
            ) : null}
            <OTPField.Input
              aria-label={index === 0 ? undefined : slotLabel(index, length)}
              aria-labelledby={index === 0 ? labelledBy : undefined}
              className={styles.input()}
            />
          </Fragment>
        ))}
      </OTPField.Root>
    </>
  );
}
