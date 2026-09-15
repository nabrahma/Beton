"use client";

import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { field, type FieldVariants } from "@beton-ui/recipes";
import { createContext, useContext } from "react";

const FieldsetContext = createContext<NonNullable<FieldVariants["size"]>>("md");

export interface FieldsetProps extends Omit<BaseFieldset.Root.Props, "className">, FieldVariants {
  className?: string;
}

function FieldsetRoot({ size = "md", className, ...props }: FieldsetProps) {
  return (
    <FieldsetContext.Provider value={size}>
      <BaseFieldset.Root
        {...props}
        data-size={size}
        className={field({ size }).fieldset({ class: className })}
      />
    </FieldsetContext.Provider>
  );
}

function FieldsetLegend({
  className,
  ...props
}: Omit<BaseFieldset.Legend.Props, "className"> & { className?: string }) {
  const size = useContext(FieldsetContext);
  return (
    <BaseFieldset.Legend {...props} className={field({ size }).legend({ class: className })} />
  );
}

/** Groups related controls, such as radio buttons or checkboxes, under a shared legend. */
export const Fieldset = Object.assign(FieldsetRoot, {
  Legend: FieldsetLegend,
});
