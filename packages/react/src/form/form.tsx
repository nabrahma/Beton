"use client";

import { Form as BaseForm } from "@base-ui/react/form";
import { form, type FormVariants } from "@beton-ui/recipes";

export interface FormProps extends Omit<BaseForm.Props, "className">, FormVariants {
  className?: string;
}

/**
 * A form that consolidates validation for its fields and focuses the first
 * invalid one on submit. Pass server errors through `errors`, keyed by field name.
 */
export function Form({ size = "md", className, ...props }: FormProps) {
  return <BaseForm {...props} data-size={size} className={form({ size, class: className })} />;
}
