"use client";

import { newsletterSignup } from "@beton-ui/recipes";
import { useId, type FormEvent, type ReactNode } from "react";
import { Button } from "../button/button.tsx";
import { Field } from "../field/field.tsx";
import { Input } from "../input/input.tsx";
import { Section, type SectionProps } from "../section/section.tsx";

export interface NewsletterSignupProps extends Omit<SectionProps, "children" | "onSubmit"> {
  /** What the address is for. */
  label?: ReactNode;
  /** Shown in the empty field. */
  placeholder?: string;
  /** The word on the button. */
  submitLabel?: ReactNode;
  /** The small print under the field. */
  note?: ReactNode;
  /** Where the form posts, for the case where JavaScript never arrives. */
  action?: string;
  /** Called with the address that was entered. */
  onSubscribe?: (email: string) => void;
}

/** One field and one button: the least you can ask for. */
export function NewsletterSignup({
  label = "Email address",
  placeholder = "you@example.com",
  submitLabel = "Subscribe",
  note,
  action,
  onSubscribe,
  ...props
}: NewsletterSignupProps) {
  const styles = newsletterSignup();
  const id = useId();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (!onSubscribe) return;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubscribe(String(data.get("email") ?? ""));
  }

  return (
    <Section {...props}>
      <form action={action} method="post" onSubmit={onSubmit} className={styles.form()}>
        <Field className={styles.field()}>
          <Field.Label htmlFor={id}>{label}</Field.Label>
          <Input
            id={id}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={placeholder}
          />
          <Field.Error />
        </Field>
        <Button type="submit">{submitLabel}</Button>
      </form>
      {note ? <p className={styles.note()}>{note}</p> : null}
    </Section>
  );
}
