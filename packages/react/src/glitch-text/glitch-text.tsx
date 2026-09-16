import { glitchText, type GlitchTextVariants } from "@beton-ui/recipes";
import type { ComponentProps } from "react";

export interface GlitchTextProps
  extends Omit<ComponentProps<"span">, "children">, GlitchTextVariants {
  /** The words. Passed as a string so the layers can repeat them. */
  children: string;
}

/**
 * Text with two coloured copies jittering behind it. The copies are hidden
 * from screen readers, and disappear entirely under reduced motion.
 */
export function GlitchText({ size = "md", children, className, ...props }: GlitchTextProps) {
  const styles = glitchText({ size });
  return (
    <span {...props} data-text={children} className={styles.root({ class: className })}>
      <span aria-hidden="true" className={styles.layer({ class: styles.a() })}>
        {children}
      </span>
      <span aria-hidden="true" className={styles.layer({ class: styles.b() })}>
        {children}
      </span>
      <span className={styles.body()}>{children}</span>
    </span>
  );
}
