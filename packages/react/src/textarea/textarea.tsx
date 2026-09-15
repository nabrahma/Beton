"use client";

import { Field } from "@base-ui/react/field";
import { textarea, type TextareaVariants } from "@beton-ui/recipes";
import type { ComponentProps } from "react";

export interface TextareaProps
  extends Omit<ComponentProps<"textarea">, "className" | "defaultValue">, TextareaVariants {
  className?: string;
  defaultValue?: string;
}

/** A multi-line text field. Inside `Field`, it is labelled and validated automatically. */
export function Textarea({ size = "md", className, ...props }: TextareaProps) {
  return (
    <Field.Control
      {...(props as Field.Control.Props)}
      render={<textarea />}
      data-size={size}
      className={textarea({ size, class: className })}
    />
  );
}
