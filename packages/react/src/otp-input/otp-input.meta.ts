import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "otp-input",
  title: "OTP Input",
  description: "Single-character slots for one-time codes, with paste and SMS autofill.",
  category: "forms",
  status: "stable",
  exports: ["OtpInput"],
  accessibility: {
    keyboard: [
      { keys: "Type", action: "Fills the slot and moves to the next." },
      {
        keys: "Backspace",
        action: "Clears the slot, or the previous one when empty, and moves back.",
      },
      { keys: "Arrow keys", action: "Move between slots." },
      { keys: "Paste", action: "Fills every slot at once." },
    ],
    aria: [
      'role="group" containing one text input per character.',
      'The first slot takes the field label; the others are announced as "Character 2 of 6".',
      'autocomplete="one-time-code" enables SMS autofill.',
    ],
    notes: ["Label it with <label htmlFor> pointing at id, or pass aria-label."],
  },
  related: ["input", "field"],
  playground: { recipe: "otpInput", controls: ["size"], toggles: ["disabled"] },
};
