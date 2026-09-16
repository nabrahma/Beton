import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "command-palette",
  title: "Command Palette",
  description: "A searchable list of commands in a dialog, opened with a keyboard shortcut.",
  category: "overlays",
  status: "stable",
  exports: ["CommandPalette"],
  accessibility: {
    keyboard: [
      { keys: "Ctrl/Cmd + K", action: "Opens and closes the palette." },
      { keys: "Type", action: "Filters commands by label and keywords." },
      { keys: "ArrowUp and ArrowDown", action: "Move the highlight." },
      { keys: "Enter", action: "Runs the highlighted command." },
      { keys: "Escape", action: "Closes the palette." },
    ],
    aria: [
      "A modal dialog containing a combobox and a filtered listbox.",
      "The highlighted option is announced through aria-activedescendant.",
    ],
    notes: [
      "Give people a visible way in as well: pass a trigger, since a shortcut alone is not discoverable.",
      "Every command should also exist in the interface.",
      "Change the shortcut with the shortcut prop, or pass false to bind it yourself.",
    ],
  },
  related: ["dialog", "search-input"],
};
