"use client";

import { Menu } from "@base-ui/react/menu";
import { button, menu, type ButtonVariants, type MenuVariants } from "@beton-ui/recipes";
import { createContext, useContext, type ReactNode } from "react";
import { CheckIcon, ChevronDownIcon } from "../utils/icons.tsx";

const MenuContext = createContext<Pick<MenuVariants, "size">>({ size: "md" });

function useStyles(danger = false) {
  return menu({ ...useContext(MenuContext), danger });
}

export interface DropdownMenuProps extends Menu.Root.Props, Pick<MenuVariants, "size"> {}

function DropdownMenuRoot({ size = "md", ...props }: DropdownMenuProps) {
  return (
    <MenuContext.Provider value={{ size }}>
      <Menu.Root {...props} />
    </MenuContext.Provider>
  );
}

export interface DropdownMenuTriggerProps
  extends Omit<Menu.Trigger.Props, "className">, Pick<ButtonVariants, "variant" | "size"> {
  className?: string;
}

function DropdownMenuTrigger({
  variant = "secondary",
  size = "md",
  className,
  ...props
}: DropdownMenuTriggerProps) {
  return <Menu.Trigger {...props} className={button({ variant, size, class: className })} />;
}

export interface DropdownMenuContentProps extends Omit<Menu.Popup.Props, "className"> {
  className?: string;
  side?: Menu.Positioner.Props["side"];
  align?: Menu.Positioner.Props["align"];
  sideOffset?: number;
}

function DropdownMenuContent({
  className,
  children,
  side = "bottom",
  align = "start",
  sideOffset = 8,
  ...props
}: DropdownMenuContentProps) {
  const styles = useStyles();
  return (
    <Menu.Portal>
      <Menu.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={styles.positioner()}
      >
        <Menu.Popup {...props} className={styles.popup({ class: className })}>
          {children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
}

export interface DropdownMenuItemProps extends Omit<Menu.Item.Props, "className"> {
  className?: string;
  /** Styles the item as destructive. */
  danger?: boolean;
  /** Keyboard shortcut shown on the right. Display only: bind the key yourself. */
  shortcut?: ReactNode;
}

function DropdownMenuItem({
  className,
  children,
  danger = false,
  shortcut,
  ...props
}: DropdownMenuItemProps) {
  const styles = useStyles(danger);
  return (
    <Menu.Item {...props} className={styles.item({ class: className })}>
      {children}
      {shortcut ? <span className={styles.shortcut()}>{shortcut}</span> : null}
    </Menu.Item>
  );
}

export interface DropdownMenuLinkProps extends Omit<Menu.LinkItem.Props, "className"> {
  className?: string;
}

function DropdownMenuLink({ className, ...props }: DropdownMenuLinkProps) {
  return <Menu.LinkItem {...props} className={useStyles().item({ class: className })} />;
}

function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: Omit<Menu.CheckboxItem.Props, "className"> & { className?: string }) {
  const styles = useStyles();
  return (
    <Menu.CheckboxItem {...props} className={styles.item({ class: className })}>
      <span className={styles.indicator()}>
        <Menu.CheckboxItemIndicator>
          <CheckIcon width={16} height={16} />
        </Menu.CheckboxItemIndicator>
      </span>
      {children}
    </Menu.CheckboxItem>
  );
}

function DropdownMenuRadioGroup(props: Menu.RadioGroup.Props) {
  return <Menu.RadioGroup {...props} />;
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: Omit<Menu.RadioItem.Props, "className"> & { className?: string }) {
  const styles = useStyles();
  return (
    <Menu.RadioItem {...props} className={styles.item({ class: className })}>
      <span className={styles.indicator()}>
        <Menu.RadioItemIndicator>
          <CheckIcon width={16} height={16} />
        </Menu.RadioItemIndicator>
      </span>
      {children}
    </Menu.RadioItem>
  );
}

function DropdownMenuGroup(props: Menu.Group.Props) {
  return <Menu.Group {...props} />;
}

function DropdownMenuGroupLabel({
  className,
  ...props
}: Omit<Menu.GroupLabel.Props, "className"> & { className?: string }) {
  return <Menu.GroupLabel {...props} className={useStyles().groupLabel({ class: className })} />;
}

function DropdownMenuSeparator({
  className,
  ...props
}: Omit<Menu.Separator.Props, "className"> & { className?: string }) {
  return <Menu.Separator {...props} className={useStyles().separator({ class: className })} />;
}

function DropdownMenuSubmenu(props: Menu.SubmenuRoot.Props) {
  return <Menu.SubmenuRoot {...props} />;
}

function DropdownMenuSubmenuTrigger({
  className,
  children,
  ...props
}: Omit<Menu.SubmenuTrigger.Props, "className"> & { className?: string }) {
  const styles = useStyles();
  return (
    <Menu.SubmenuTrigger {...props} className={styles.item({ class: className })}>
      {children}
      <ChevronDownIcon className={styles.chevron()} />
    </Menu.SubmenuTrigger>
  );
}

/**
 * A menu of actions opened from a button. Arrow keys move between items,
 * Escape closes, and focus returns to the trigger.
 */
export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  Link: DropdownMenuLink,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Group: DropdownMenuGroup,
  GroupLabel: DropdownMenuGroupLabel,
  Separator: DropdownMenuSeparator,
  Submenu: DropdownMenuSubmenu,
  SubmenuTrigger: DropdownMenuSubmenuTrigger,
});
