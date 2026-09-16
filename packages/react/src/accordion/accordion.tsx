"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { accordion, type AccordionVariants } from "@beton-ui/recipes";
import { createContext, useContext } from "react";
import { ChevronDownIcon } from "../utils/icons.tsx";

interface AccordionState {
  styles: ReturnType<typeof accordion>;
  size: NonNullable<AccordionVariants["size"]>;
}

const AccordionContext = createContext<AccordionState>({ styles: accordion(), size: "md" });

function useStyles() {
  return useContext(AccordionContext).styles;
}

export interface AccordionProps
  extends Omit<BaseAccordion.Root.Props, "className">, AccordionVariants {
  className?: string;
}

function AccordionRoot({ size = "md", className, ...props }: AccordionProps) {
  const styles = accordion({ size });
  return (
    <AccordionContext.Provider value={{ styles, size }}>
      <BaseAccordion.Root {...props} className={styles.root({ class: className })} />
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends Omit<BaseAccordion.Item.Props, "className"> {
  className?: string;
}

function AccordionItem({ className, ...props }: AccordionItemProps) {
  return <BaseAccordion.Item {...props} className={useStyles().item({ class: className })} />;
}

export interface AccordionTriggerProps extends Omit<BaseAccordion.Trigger.Props, "className"> {
  className?: string;
  /** The heading level the trigger sits in. Defaults to `h3`. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** Show the chevron that turns when the panel opens. On by default. */
  icon?: boolean;
}

function AccordionTrigger({
  className,
  children,
  headingLevel = 3,
  icon = true,
  ...props
}: AccordionTriggerProps) {
  const { styles, size } = useContext(AccordionContext);
  const Heading = `h${headingLevel}` as const;
  return (
    <BaseAccordion.Header className={styles.header()} render={<Heading />}>
      <BaseAccordion.Trigger
        {...props}
        data-size={size}
        className={styles.trigger({ class: className })}
      >
        {children}
        {icon ? <ChevronDownIcon className={styles.icon()} /> : null}
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

export interface AccordionPanelProps extends Omit<BaseAccordion.Panel.Props, "className"> {
  className?: string;
  /** Classes for the inner element that holds the content. */
  contentClassName?: string;
}

function AccordionPanel({ className, contentClassName, children, ...props }: AccordionPanelProps) {
  const styles = useStyles();
  return (
    <BaseAccordion.Panel {...props} className={styles.panel({ class: className })}>
      <div className={styles.content({ class: contentClassName })}>{children}</div>
    </BaseAccordion.Panel>
  );
}

/** Sections of content that open one at a time, or several at once with `multiple`. */
export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Panel: AccordionPanel,
});
