"use client";

import { Field as BaseField } from "@base-ui/react/field";
import { field, input, type FieldVariants } from "@beton-ui/recipes";
import { createContext, useContext } from "react";

const FieldContext = createContext<NonNullable<FieldVariants["size"]>>("md");

export interface FieldProps extends Omit<BaseField.Root.Props, "className">, FieldVariants {
  className?: string;
}

function FieldRoot({ size = "md", className, ...props }: FieldProps) {
  return (
    <FieldContext.Provider value={size}>
      <BaseField.Root
        {...props}
        data-size={size}
        className={field({ size }).root({ class: className })}
      />
    </FieldContext.Provider>
  );
}

type WithClassName<P> = Omit<P, "className"> & { className?: string };

function FieldLabel({ className, ...props }: WithClassName<BaseField.Label.Props>) {
  const size = useContext(FieldContext);
  return <BaseField.Label {...props} className={field({ size }).label({ class: className })} />;
}

function FieldDescription({ className, ...props }: WithClassName<BaseField.Description.Props>) {
  const size = useContext(FieldContext);
  return (
    <BaseField.Description
      {...props}
      className={field({ size }).description({ class: className })}
    />
  );
}

function FieldError({ className, ...props }: WithClassName<BaseField.Error.Props>) {
  const size = useContext(FieldContext);
  return <BaseField.Error {...props} className={field({ size }).error({ class: className })} />;
}

/** A text input wired to the field's label, description, error and validation. */
function FieldControl({ className, ...props }: WithClassName<BaseField.Control.Props>) {
  const size = useContext(FieldContext);
  return (
    <BaseField.Control {...props} data-size={size} className={input({ size, class: className })} />
  );
}

/**
 * Groups a label, control, description and error message, and runs native or
 * custom validation. Works with Input, Textarea, Select, Checkbox and the other form controls.
 */
export const Field = Object.assign(FieldRoot, {
  Label: FieldLabel,
  Control: FieldControl,
  Description: FieldDescription,
  Error: FieldError,
});
