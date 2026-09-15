"use client";

import { Input as BaseInput } from "@base-ui/react/input";
import { input, type InputVariants } from "@beton-ui/recipes";

export interface InputProps extends Omit<BaseInput.Props, "className" | "size">, InputVariants {
  className?: string;
  /** Native `size` attribute (visible width in characters). Use `size` for the visual size. */
  htmlSize?: number;
}

export function Input({ size = "md", htmlSize, className, ...props }: InputProps) {
  return (
    <BaseInput
      {...props}
      size={htmlSize}
      data-size={size}
      className={input({ size, class: className })}
    />
  );
}
