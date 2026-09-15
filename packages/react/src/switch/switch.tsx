"use client";

import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { switchStyles, type SwitchVariants } from "@beton-ui/recipes";

export interface SwitchProps
  extends Omit<BaseSwitch.Root.Props, "className" | "children">, SwitchVariants {
  className?: string;
}

/** An on/off control that takes effect immediately. Name it with a wrapping `<label>` or `aria-label`. */
export function Switch({ variant = "primary", size = "md", className, ...props }: SwitchProps) {
  const styles = switchStyles({ variant, size });
  return (
    <BaseSwitch.Root
      {...props}
      data-variant={variant}
      data-size={size}
      className={styles.root({ class: className })}
    >
      <BaseSwitch.Thumb className={styles.thumb()} />
    </BaseSwitch.Root>
  );
}
