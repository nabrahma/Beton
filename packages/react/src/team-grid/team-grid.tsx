import { teamGrid, type TeamGridVariants } from "@beton-ui/recipes";
import type { ReactNode } from "react";
import { Section, type SectionProps } from "../section/section.tsx";

export interface TeamMember {
  /** Their name. */
  name: ReactNode;
  /** What they do. */
  role: ReactNode;
  /** A line or two about them. */
  bio?: ReactNode;
  /** A picture or an avatar. */
  portrait?: ReactNode;
  /** Links to wherever they are. */
  links?: ReactNode;
}

export interface TeamGridProps extends Omit<SectionProps, "children">, TeamGridVariants {
  /** The people, in order. */
  members: TeamMember[];
  /** The heading level of each name. One below the section heading. */
  itemHeadingLevel?: 3 | 4 | 5;
  /** Classes for the grid itself. */
  listClassName?: string;
}

/** Who made it, with faces and roles. */
export function TeamGrid({
  members,
  columns = 3,
  itemHeadingLevel = 3,
  listClassName,
  ...props
}: TeamGridProps) {
  const styles = teamGrid({ columns });
  const Heading = `h${itemHeadingLevel}` as const;

  return (
    <Section {...props}>
      <ul className={styles.list({ class: listClassName })}>
        {members.map((member, index) => (
          <li key={index} className={styles.item()}>
            <div className={styles.portrait()}>
              {member.portrait}
              <div>
                <Heading className={styles.name()}>{member.name}</Heading>
                <p className={styles.role()}>{member.role}</p>
              </div>
            </div>
            {member.bio ? <p className={styles.bio()}>{member.bio}</p> : null}
            {member.links ? <div className={styles.links()}>{member.links}</div> : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
