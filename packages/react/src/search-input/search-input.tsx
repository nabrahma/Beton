"use client";

import { Input as BaseInput } from "@base-ui/react/input";
import { button, searchInput, type SearchInputVariants } from "@beton-ui/recipes";
import { useRef, useState, type KeyboardEvent, type Ref } from "react";
import { CloseIcon, SearchIcon } from "../utils/icons.tsx";

export interface SearchInputProps
  extends
    Omit<
      BaseInput.Props,
      "className" | "size" | "type" | "value" | "defaultValue" | "onValueChange" | "ref"
    >,
    SearchInputVariants {
  className?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called after the clear button or Escape empties the field. */
  onClear?: () => void;
  /** Accessible name for the clear button. */
  clearLabel?: string;
  /** Ref to the underlying input. `ref` points at the wrapper. */
  inputRef?: Ref<HTMLInputElement>;
  ref?: Ref<HTMLDivElement>;
}

/** A search field with an icon and a clear button. Escape clears it. */
export function SearchInput({
  size = "md",
  value,
  defaultValue = "",
  onValueChange,
  onClear,
  clearLabel = "Clear search",
  disabled,
  className,
  inputRef,
  ref,
  onKeyDown,
  ...props
}: SearchInputProps) {
  const styles = searchInput({ size });
  const [inner, setInner] = useState(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : inner;
  const localRef = useRef<HTMLInputElement | null>(null);

  function change(next: string) {
    if (!controlled) setInner(next);
    onValueChange?.(next);
  }

  function clear() {
    change("");
    onClear?.();
  }

  return (
    <div ref={ref} data-size={size} className={styles.root({ class: className })}>
      <SearchIcon className={styles.icon()} />
      <BaseInput
        {...props}
        ref={(element) => {
          const node = element as HTMLInputElement | null;
          localRef.current = node;
          if (typeof inputRef === "function") inputRef(node);
          else if (inputRef) inputRef.current = node;
        }}
        type="search"
        value={current}
        disabled={disabled}
        onValueChange={(next) => change(next)}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Escape" && current) {
            event.preventDefault();
            clear();
          }
          onKeyDown?.(event as never);
        }}
        className={styles.input()}
      />
      {current && !disabled ? (
        <button
          type="button"
          data-size="sm"
          aria-label={clearLabel}
          onClick={() => {
            clear();
            localRef.current?.focus();
          }}
          className={button({
            variant: "ghost",
            size: "sm",
            iconOnly: true,
            class: styles.clear(),
          })}
        >
          <CloseIcon width={16} height={16} />
        </button>
      ) : null}
    </div>
  );
}
