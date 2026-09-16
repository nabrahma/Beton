import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "back-to-top",
  title: "Back to Top",
  description: "A button that returns to the top of a long page, and moves focus there too.",
  category: "navigation",
  status: "stable",
  exports: ["BackToTop"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Reaches the button once the page has scrolled past the threshold." },
      {
        keys: "Enter or Space",
        action: "Scrolls to the top and moves focus to the first heading.",
      },
    ],
    aria: ["A labelled icon button, out of the tab order until it is visible."],
    notes: [
      "Scrolling alone leaves the keyboard where it was, so focus moves with the page.",
      "Pass targetId to send focus somewhere other than the first heading.",
      "The scroll is instant under reduced motion.",
    ],
  },
  related: ["button", "scroll-area"],
};
