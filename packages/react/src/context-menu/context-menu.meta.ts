import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "context-menu",
  title: "Context Menu",
  description: "A menu opened by right-clicking an area, with the same items as a dropdown menu.",
  category: "overlays",
  status: "stable",
  exports: ["ContextMenu"],
  accessibility: {
    keyboard: [
      { keys: "Menu key or Shift+F10", action: "Opens the menu for the focused area." },
      { keys: "ArrowUp and ArrowDown", action: "Move between items." },
      { keys: "Enter", action: "Runs the focused item." },
      { keys: "Escape", action: "Closes the menu." },
    ],
    aria: ['role="menu" anchored to the pointer.', "The trigger area reports its pressed state."],
    notes: [
      "Every action in a context menu must also be reachable another way, such as a toolbar or dropdown menu.",
      "Make the trigger area focusable so keyboard users can open the menu.",
    ],
    limitations: [
      "Right-click is not discoverable on its own. Treat it as a shortcut, not the only path.",
    ],
  },
  related: ["dropdown-menu"],
};
