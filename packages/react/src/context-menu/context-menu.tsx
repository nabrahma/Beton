"use client";

import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { menu, type MenuVariants } from "@beton-ui/recipes";
import { createContext, useContext, type ReactNode } from "react";
import { CheckIcon, ChevronDownIcon } from "../utils/icons.tsx";

const ContextMenuContext = createContext<Pick<MenuVariants, "size">>({ size: "md" });

function useStyles(danger = false) {
  return menu({ ...useContext(ContextMenuContext), danger });
}

export interface ContextMenuProps extends BaseContextMenu.Root.Props, Pick<MenuVariants, "size"> {}

function ContextMenuRoot({ size = "md", ...props }: ContextMenuProps) {
  return (
    <ContextMenuContext.Provider value={{ size }}>
      <BaseContextMenu.Root {...props} />
    </ContextMenuContext.Provider>
  );
}

/** The area that opens the menu on right-click, long-press or the Menu key. */
function ContextMenuTrigger(props: BaseContextMenu.Trigger.Props) {
  return <BaseContextMenu.Trigger {...props} />;
}

export interface ContextMenuContentProps extends Omit<BaseContextMenu.Popup.Props, "className"> {
  className?: string;
}

function ContextMenuContent({ className, children, ...props }: ContextMenuContentProps) {
  const styles = useStyles();
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner className={styles.positioner()}>
        <BaseContextMenu.Popup {...props} className={styles.popup({ class: className })}>
          {children}
        </BaseContextMenu.Popup>
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  );
}

export interface ContextMenuItemProps extends Omit<BaseContextMenu.Item.Props, "className"> {
  className?: string;
  danger?: boolean;
  shortcut?: ReactNode;
}

function ContextMenuItem({
  className,
  children,
  danger = false,
  shortcut,
  ...props
}: ContextMenuItemProps) {
  const styles = useStyles(danger);
  return (
    <BaseContextMenu.Item {...props} className={styles.item({ class: className })}>
      {children}
      {shortcut ? <span className={styles.shortcut()}>{shortcut}</span> : null}
    </BaseContextMenu.Item>
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  ...props
}: Omit<BaseContextMenu.CheckboxItem.Props, "className"> & { className?: string }) {
  const styles = useStyles();
  return (
    <BaseContextMenu.CheckboxItem {...props} className={styles.item({ class: className })}>
      <span className={styles.indicator()}>
        <BaseContextMenu.CheckboxItemIndicator>
          <CheckIcon width={16} height={16} />
        </BaseContextMenu.CheckboxItemIndicator>
      </span>
      {children}
    </BaseContextMenu.CheckboxItem>
  );
}

function ContextMenuRadioGroup(props: BaseContextMenu.RadioGroup.Props) {
  return <BaseContextMenu.RadioGroup {...props} />;
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: Omit<BaseContextMenu.RadioItem.Props, "className"> & { className?: string }) {
  const styles = useStyles();
  return (
    <BaseContextMenu.RadioItem {...props} className={styles.item({ class: className })}>
      <span className={styles.indicator()}>
        <BaseContextMenu.RadioItemIndicator>
          <CheckIcon width={16} height={16} />
        </BaseContextMenu.RadioItemIndicator>
      </span>
      {children}
    </BaseContextMenu.RadioItem>
  );
}

function ContextMenuGroup(props: BaseContextMenu.Group.Props) {
  return <BaseContextMenu.Group {...props} />;
}

function ContextMenuGroupLabel({
  className,
  ...props
}: Omit<BaseContextMenu.GroupLabel.Props, "className"> & { className?: string }) {
  return (
    <BaseContextMenu.GroupLabel
      {...props}
      className={useStyles().groupLabel({ class: className })}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: Omit<BaseContextMenu.Separator.Props, "className"> & { className?: string }) {
  return (
    <BaseContextMenu.Separator {...props} className={useStyles().separator({ class: className })} />
  );
}

function ContextMenuSubmenu(props: BaseContextMenu.SubmenuRoot.Props) {
  return <BaseContextMenu.SubmenuRoot {...props} />;
}

function ContextMenuSubmenuTrigger({
  className,
  children,
  ...props
}: Omit<BaseContextMenu.SubmenuTrigger.Props, "className"> & { className?: string }) {
  const styles = useStyles();
  return (
    <BaseContextMenu.SubmenuTrigger {...props} className={styles.item({ class: className })}>
      {children}
      <ChevronDownIcon className={styles.chevron()} />
    </BaseContextMenu.SubmenuTrigger>
  );
}

/**
 * A menu opened by right-clicking an area. Keyboard users open it with the
 * Menu key or Shift+F10, so never make it the only way to reach an action.
 */
export const ContextMenu = Object.assign(ContextMenuRoot, {
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  CheckboxItem: ContextMenuCheckboxItem,
  RadioGroup: ContextMenuRadioGroup,
  RadioItem: ContextMenuRadioItem,
  Group: ContextMenuGroup,
  GroupLabel: ContextMenuGroupLabel,
  Separator: ContextMenuSeparator,
  Submenu: ContextMenuSubmenu,
  SubmenuTrigger: ContextMenuSubmenuTrigger,
});
