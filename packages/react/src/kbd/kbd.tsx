import { kbd, type KbdVariants } from "@beton-ui/recipes";
import type { ComponentProps } from "react";

export interface KbdProps extends ComponentProps<"kbd">, KbdVariants {}

export function Kbd({ size = "md", className, ...props }: KbdProps) {
  return <kbd {...props} data-size={size} className={kbd({ size, class: className })} />;
}
