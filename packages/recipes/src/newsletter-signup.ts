import { tv, type VariantProps } from "./tv.ts";

export const newsletterSignup = tv({
  slots: {
    form: "flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-start",
    field: "min-w-0 flex-1",
    note: "max-w-prose font-mono text-xs font-bold",
  },
});

export type NewsletterSignupVariants = VariantProps<typeof newsletterSignup>;
