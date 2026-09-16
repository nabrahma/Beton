import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "newsletter-signup",
  title: "Newsletter Signup",
  description: "One field and one button: the least you can ask for.",
  category: "marketing",
  kind: "block",
  status: "stable",
  exports: ["NewsletterSignup"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Moves to the field, then to the button." },
      { keys: "Enter", action: "Submits from the field." },
    ],
    aria: [
      "The field is labelled and typed as an email address, so the right keyboard appears.",
      "Errors are announced by Field, not left to a red outline.",
    ],
    notes: [
      "Pass action as well as onSubscribe: the form still works if JavaScript never arrives.",
      "Say what you will send and how often. That is the note under the field.",
    ],
  },
  related: ["field", "cta-band", "form"],
};
