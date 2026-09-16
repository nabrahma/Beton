import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "code-block",
  title: "Code Block",
  description: "A block of code with a copy button and a scrolling region you can reach.",
  category: "data-display",
  status: "stable",
  exports: ["CodeBlock"],
  accessibility: {
    keyboard: [
      {
        keys: "Tab",
        action: "Moves to the copy button, then into the code, which scrolls with the keyboard.",
      },
      { keys: "ArrowLeft and ArrowRight", action: "Scroll the code sideways once it has focus." },
    ],
    aria: [
      "The scrolling region is focusable and named after the file, as a scrollable region must be.",
      "Line numbers are decoration and are hidden from screen readers.",
    ],
    notes: [
      "Pass the code as a string, so the copy button has something to copy.",
      "Line numbers never end up in the copied text.",
      "No highlighting is shipped. Pass language and hand the markup to Prism or Shiki if you want colour.",
    ],
  },
  related: ["kbd", "scroll-area", "button"],
  playground: { recipe: "codeBlock", controls: ["size"], toggles: ["lineNumbers"] },
};
