import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "dropdown-menu",
  title: "Dropdown Menu",
  description: "A menu of actions opened from a button, with checkboxes, radios and submenus.",
  category: "overlays",
  status: "stable",
  exports: ["DropdownMenu"],
  accessibility: {
    keyboard: [
      { keys: "Enter, Space or ArrowDown", action: "Opens the menu and focuses the first item." },
      { keys: "ArrowUp and ArrowDown", action: "Move between items." },
      { keys: "ArrowRight", action: "Opens a submenu; ArrowLeft closes it." },
      { keys: "Enter", action: "Runs the focused item and closes the menu." },
      { keys: "Escape", action: "Closes the menu and returns focus to the trigger." },
      { keys: "Type a letter", action: "Jumps to the next item starting with it." },
    ],
    aria: [
      'role="menu" with menuitem, menuitemcheckbox and menuitemradio items.',
      "The trigger exposes aria-expanded and aria-haspopup.",
    ],
    notes: [
      "Disabled items stay focusable so they can be found and announced.",
      "Shortcut text in an item is display only: bind the key yourself.",
      "Use a menu for actions. For choosing a value in a form, use Select.",
    ],
  },
  related: ["context-menu", "select", "popover"],
};
