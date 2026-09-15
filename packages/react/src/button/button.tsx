"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import { button, type ButtonVariants } from "@beton-ui/recipes";
import type { ReactNode } from "react";
import { Spinner } from "../spinner/spinner.tsx";
import { dataAttr } from "../utils/render-element.ts";

export interface ButtonProps extends Omit<BaseButton.Props, "className">, ButtonVariants {
  className?: string;
  /** Shows a spinner, keeps focus, and blocks activation while an action runs. */
  loading?: boolean;
  /** Accessible text announced while loading. */
  loadingLabel?: string;
  /** Renders a square button for a single icon. Requires `aria-label`. */
  iconOnly?: boolean;
  children?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  iconOnly = false,
  loading = false,
  loadingLabel = "Loading",
  disabled = false,
  focusableWhenDisabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      {...props}
      disabled={disabled || loading}
      focusableWhenDisabled={focusableWhenDisabled ?? loading}
      aria-busy={loading || undefined}
      data-variant={variant}
      data-size={size}
      data-loading={dataAttr(loading)}
      className={button({ variant, size, iconOnly, class: className })}
    >
      {loading ? <Spinner role="none" size="sm" label={loadingLabel} /> : null}
      {loading && iconOnly ? null : children}
    </BaseButton>
  );
}
