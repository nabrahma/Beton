import { logoCloud, type LogoCloudVariants } from "@beton-ui/recipes";
import type { ReactNode } from "react";
import { Section, type SectionProps } from "../section/section.tsx";

export interface LogoCloudProps extends Omit<SectionProps, "children">, LogoCloudVariants {
  /** The names, as words or as marks. */
  logos: ReactNode[];
  /** Classes for the row itself. */
  listClassName?: string;
}

/** A row of the names that use the thing. */
export function LogoCloud({ logos, size = "md", listClassName, ...props }: LogoCloudProps) {
  const styles = logoCloud({ size });
  return (
    <Section align="center" {...props}>
      <ul className={styles.list({ class: listClassName })}>
        {logos.map((logo, index) => (
          <li key={index} className={styles.item()}>
            {logo}
          </li>
        ))}
      </ul>
    </Section>
  );
}
