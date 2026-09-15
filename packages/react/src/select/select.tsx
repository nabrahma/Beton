"use client";

import { Select as BaseSelect } from "@base-ui/react/select";
import { select, type SelectVariants } from "@beton-ui/recipes";
import { createContext, useContext, type ReactNode } from "react";
import { CheckIcon, ChevronDownIcon } from "../utils/icons.tsx";

const SelectContext = createContext<NonNullable<SelectVariants["size"]>>("md");

function useStyles() {
  return select({ size: useContext(SelectContext) });
}

export type SelectProps<
  Value,
  Multiple extends boolean | undefined = false,
> = BaseSelect.Root.Props<Value, Multiple> & SelectVariants;

function SelectRoot<Value, Multiple extends boolean | undefined = false>({
  size = "md",
  ...props
}: SelectProps<Value, Multiple>) {
  return (
    <SelectContext.Provider value={size}>
      <BaseSelect.Root {...props} />
    </SelectContext.Provider>
  );
}

export interface SelectTriggerProps extends Omit<
  BaseSelect.Trigger.Props,
  "className" | "children"
> {
  className?: string;
  /** Shown when nothing is selected. */
  placeholder?: ReactNode;
  /** Custom rendering of the selected value. */
  children?: BaseSelect.Value.Props["children"];
}

function SelectTrigger({ className, placeholder, children, ...props }: SelectTriggerProps) {
  const styles = useStyles();
  return (
    <BaseSelect.Trigger {...props} className={styles.trigger({ class: className })}>
      <BaseSelect.Value className={styles.value()} placeholder={placeholder}>
        {children}
      </BaseSelect.Value>
      <BaseSelect.Icon className={styles.icon()}>
        <ChevronDownIcon width={18} height={18} />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

export interface SelectContentProps extends Omit<BaseSelect.Popup.Props, "className"> {
  className?: string;
  side?: BaseSelect.Positioner.Props["side"];
  align?: BaseSelect.Positioner.Props["align"];
  sideOffset?: number;
  /** Overlap the trigger with the selected item, like a native select. Off by default. */
  alignItemWithTrigger?: boolean;
}

function SelectContent({
  className,
  children,
  side = "bottom",
  align = "start",
  sideOffset = 8,
  alignItemWithTrigger = false,
  ...props
}: SelectContentProps) {
  const styles = useStyles();
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className={styles.positioner()}
      >
        <BaseSelect.Popup {...props} className={styles.popup({ class: className })}>
          <BaseSelect.List className={styles.list()}>{children}</BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export interface SelectItemProps extends Omit<BaseSelect.Item.Props, "className"> {
  className?: string;
}

function SelectItem({ className, children, ...props }: SelectItemProps) {
  const styles = useStyles();
  return (
    <BaseSelect.Item {...props} className={styles.item({ class: className })}>
      <span className={styles.itemIndicator()}>
        <BaseSelect.ItemIndicator>
          <CheckIcon width={16} height={16} />
        </BaseSelect.ItemIndicator>
      </span>
      <BaseSelect.ItemText className={styles.itemText()}>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

function SelectGroup(props: BaseSelect.Group.Props) {
  return <BaseSelect.Group {...props} />;
}

function SelectGroupLabel({
  className,
  ...props
}: Omit<BaseSelect.GroupLabel.Props, "className"> & { className?: string }) {
  return (
    <BaseSelect.GroupLabel {...props} className={useStyles().groupLabel({ class: className })} />
  );
}

function SelectSeparator({
  className,
  ...props
}: Omit<BaseSelect.Separator.Props, "className"> & { className?: string }) {
  return (
    <BaseSelect.Separator {...props} className={useStyles().separator({ class: className })} />
  );
}

function SelectLabel({
  className,
  ...props
}: Omit<BaseSelect.Label.Props, "className"> & { className?: string }) {
  return <BaseSelect.Label {...props} className={useStyles().label({ class: className })} />;
}

/** Choose one option, or several with `multiple`, from a list. */
export const Select = Object.assign(SelectRoot, {
  Label: SelectLabel,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
  Separator: SelectSeparator,
});
