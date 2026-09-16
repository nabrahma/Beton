import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "menubar",
  title: "Menubar",
  description: "A row of menus along the top of an application, as in a desktop app.",
  category: "navigation",
  status: "stable",
  exports: ["Menubar"],
  accessibility: {
    keyboard: [
      { keys: "ArrowLeft and ArrowRight", action: "Move between the menus in the bar." },
      {
        keys: "ArrowDown or Enter",
        action: "Opens the focused menu and highlights its first item.",
      },
      { keys: "ArrowUp and ArrowDown", action: "Move between items in an open menu." },
      { keys: "Escape", action: "Closes the menu and leaves focus on its trigger." },
      { keys: "Type a letter", action: "Jumps to the next item starting with it." },
    ],
    aria: [
      'role="menubar" holding triggers with aria-haspopup and aria-expanded.',
      'Each menu is a role="menu" with the same items as a dropdown menu.',
    ],
    notes: [
      "Once a menu is open, moving along the bar opens the next one straight away.",
      "Every command in the bar should also be reachable another way.",
      "Use it for applications. A website wants a Navbar.",
    ],
  },
  related: ["dropdown-menu", "navbar", "context-menu"],
  playground: { recipe: "menubar", controls: ["size"] },
};
