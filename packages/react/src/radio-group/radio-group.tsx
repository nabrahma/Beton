"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { radioGroup, type RadioGroupVariants } from "@beton-ui/recipes";
import { createContext, useContext, type ComponentProps, type ReactNode, type Ref } from "react";

type Context = Pick<RadioGroupVariants, "variant" | "size">;
const RadioGroupContext = createContext<Context>({ variant: "primary", size: "md" });

export interface RadioGroupProps
  extends Omit<BaseRadioGroup.Props, "className">, RadioGroupVariants {
  className?: string;
}

function RadioGroupRoot({
  variant = "primary",
  size = "md",
  orientation = "vertical",
  className,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ variant, size }}>
      <BaseRadioGroup
        {...props}
        aria-orientation={orientation}
        data-orientation={orientation}
        data-size={size}
        className={radioGroup({ orientation }).root({ class: className })}
      />
    </RadioGroupContext.Provider>
  );
}

export interface RadioGroupItemProps extends Omit<ComponentProps<"label">, "children"> {
  /** The value submitted when this option is selected. */
  value: string;
  disabled?: boolean;
  readOnly?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  children: ReactNode;
}

function RadioGroupItem({
  value,
  disabled,
  readOnly,
  inputRef,
  className,
  children,
  ...props
}: RadioGroupItemProps) {
  const { variant, size } = useContext(RadioGroupContext);
  const styles = radioGroup({ variant, size });
  return (
    <label {...props} className={styles.item({ class: className })}>
      <Radio.Root
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        inputRef={inputRef}
        className={styles.radio()}
      >
        <Radio.Indicator className={styles.indicator()} />
      </Radio.Root>
      {children}
    </label>
  );
}

/** A set of mutually exclusive options. Label the group with `aria-labelledby` or a `Fieldset`. */
export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
});
