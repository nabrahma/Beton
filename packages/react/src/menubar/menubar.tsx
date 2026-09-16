"use client";

import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { Menu } from "@base-ui/react/menu";
import { menubar, type MenubarVariants } from "@beton-ui/recipes";
import { createContext, useContext } from "react";
import { DropdownMenu } from "../dropdown-menu/dropdown-menu.tsx";

const MenubarContext = createContext<NonNullable<MenubarVariants["size"]>>("md");

export interface MenubarProps extends Omit<BaseMenubar.Props, "className">, MenubarVariants {
  className?: string;
}

function MenubarRoot({ size = "md", className, ...props }: MenubarProps) {
  return (
    <MenubarContext.Provider value={size}>
      <BaseMenubar {...props} className={menubar({ size }).root({ class: className })} />
    </MenubarContext.Provider>
  );
}

export type MenubarMenuProps = Menu.Root.Props;

function MenubarMenu(props: MenubarMenuProps) {
  return <Menu.Root {...props} />;
}

export interface MenubarTriggerProps extends Omit<Menu.Trigger.Props, "className"> {
  className?: string;
}

function MenubarTrigger({ className, ...props }: MenubarTriggerProps) {
  const size = useContext(MenubarContext);
  return <Menu.Trigger {...props} className={menubar({ size }).trigger({ class: className })} />;
}

/** A row of menus along the top of an application, as in a desktop app. */
export const Menubar = Object.assign(MenubarRoot, {
  Menu: MenubarMenu,
  Trigger: MenubarTrigger,
  Content: DropdownMenu.Content,
  Item: DropdownMenu.Item,
  Link: DropdownMenu.Link,
  CheckboxItem: DropdownMenu.CheckboxItem,
  RadioGroup: DropdownMenu.RadioGroup,
  RadioItem: DropdownMenu.RadioItem,
  Group: DropdownMenu.Group,
  GroupLabel: DropdownMenu.GroupLabel,
  Separator: DropdownMenu.Separator,
  Submenu: DropdownMenu.Submenu,
  SubmenuTrigger: DropdownMenu.SubmenuTrigger,
});
