"use client";

import { faq } from "@beton-ui/recipes";
import type { ReactNode } from "react";
import { Accordion } from "../accordion/accordion.tsx";
import { Section, type SectionProps } from "../section/section.tsx";

export interface FaqItem {
  /** The question, as someone would ask it. */
  question: ReactNode;
  /** The answer, as short as it can honestly be. */
  answer: ReactNode;
}

export interface FaqProps extends Omit<SectionProps, "children"> {
  /** The questions, in the order people ask them. */
  items: FaqItem[];
  /** Let several answers stay open at once. */
  multiple?: boolean;
  /** Anything to put beside the questions, such as a way to get in touch. */
  aside?: ReactNode;
}

/** The questions people actually ask, with the answers. */
export function Faq({ items, multiple = false, aside, ...props }: FaqProps) {
  const styles = faq();
  const questions = (
    <Accordion multiple={multiple} className={styles.list()}>
      {items.map((item, index) => (
        <Accordion.Item key={index} value={String(index)}>
          <Accordion.Trigger>{item.question}</Accordion.Trigger>
          <Accordion.Panel>{item.answer}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );

  if (!aside) return <Section {...props}>{questions}</Section>;

  return (
    <Section {...props}>
      <div className={styles.layout()}>
        <div className={styles.aside()}>{aside}</div>
        {questions}
      </div>
    </Section>
  );
}
