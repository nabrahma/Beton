import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "calendar",
  title: "Calendar",
  description: "A month of dates, one of which can be chosen.",
  category: "data-display",
  status: "stable",
  exports: ["Calendar"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Moves to the one day that is a tab stop, as the grid pattern asks." },
      { keys: "ArrowLeft and ArrowRight", action: "Move a day at a time." },
      { keys: "ArrowUp and ArrowDown", action: "Move a week at a time." },
      { keys: "Home and End", action: "Jump to the start or end of the week." },
      { keys: "Page Up and Page Down", action: "Move a month at a time." },
      { keys: "Shift + Page Up or Page Down", action: "Move a year at a time." },
      { keys: "Enter or Space", action: "Chooses the focused day." },
    ],
    aria: [
      'role="grid" with one gridcell per day, named in full rather than by its number.',
      "The selected day is reported on its cell, and today carries aria-current.",
      "The month heading is a live region, so moving month is announced.",
    ],
    notes: [
      "Arrowing past the end of a month brings the next one into view and keeps the focus.",
      "Six weeks are always drawn, so the grid never changes height.",
      "Pass min, max or isDateDisabled to rule dates out. A ruled-out day stays focusable so it can be announced.",
      "Dates are plain Date objects at midnight local time.",
    ],
  },
  related: ["select", "popover", "field"],
};
