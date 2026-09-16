"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Dialog } from "@base-ui/react/dialog";
import { commandPalette, kbd } from "@beton-ui/recipes";
import { useCallback, useEffect, useState, type ReactElement, type ReactNode } from "react";
import { SearchIcon } from "../utils/icons.tsx";

export interface CommandItem {
  /** Stable identifier. */
  value: string;
  label: string;
  /** Extra words to match while searching, such as synonyms. */
  keywords?: string[];
  /** Shown on the right, usually a shortcut. */
  hint?: ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface CommandGroup {
  label: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  /** Groups of commands. Filtering matches the label and any keywords. */
  groups: CommandGroup[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** An element that opens the palette, for people who do not know the shortcut. */
  trigger?: ReactElement;
  placeholder?: string;
  /** Accessible name of the dialog and its input. */
  label?: string;
  emptyText?: ReactNode;
  /** Global shortcut that toggles the palette. Pass false to disable it. */
  shortcut?: string | false;
  /** Replaces the hint bar at the bottom. Pass null to remove it. */
  footer?: ReactNode | null;
  className?: string;
}

/** Matches a keyboard event against a shortcut such as "mod+k" or "shift+/". */
export function matchesShortcut(event: KeyboardEvent, shortcut: string): boolean {
  const parts = shortcut.toLowerCase().split("+");
  const key = parts[parts.length - 1] ?? "";
  const modifier = event.metaKey || event.ctrlKey;
  const needs = (name: string) => parts.includes(name);

  if (needs("mod") && !modifier) return false;
  if (needs("meta") && !event.metaKey) return false;
  if (needs("ctrl") && !event.ctrlKey) return false;
  if (needs("alt") !== event.altKey) return false;
  if (needs("shift") !== event.shiftKey) return false;
  if (!needs("mod") && !needs("meta") && !needs("ctrl") && modifier) return false;
  return event.key.toLowerCase() === key;
}

const searchText = (item: CommandItem) => [item.label, ...(item.keywords ?? [])].join(" ");

/**
 * A searchable list of commands in a modal dialog. Opens with a keyboard
 * shortcut, filters as you type, and runs the highlighted command on Enter.
 */
export function CommandPalette({
  groups,
  open,
  defaultOpen = false,
  onOpenChange,
  trigger,
  placeholder = "Type a command or search…",
  label = "Command palette",
  emptyText = "No matching commands.",
  shortcut = "mod+k",
  footer,
  className,
}: CommandPaletteProps) {
  const styles = commandPalette();
  const keys = kbd({ size: "sm" });
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const isOpen = open ?? uncontrolled;

  const setOpen = useCallback(
    (next: boolean) => {
      if (open === undefined) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );

  useEffect(() => {
    if (!shortcut) return;
    function onKeyDown(event: KeyboardEvent) {
      if (matchesShortcut(event, shortcut as string)) {
        event.preventDefault();
        setOpen(!isOpen);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [shortcut, isOpen, setOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      {trigger ? <Dialog.Trigger render={trigger} /> : null}
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop()} />
        <Dialog.Viewport className={styles.viewport()}>
          <Dialog.Popup
            aria-label={label}
            className={styles.popup({ class: className })}
            // The list inside is always open, so it would otherwise swallow Escape.
            onKeyDownCapture={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                setOpen(false);
              }
            }}
          >
            <Autocomplete.Root
              open
              items={groups}
              autoHighlight="always"
              keepHighlight
              itemToStringValue={(item: CommandItem) => searchText(item)}
            >
              <div className={styles.inputGroup()}>
                <SearchIcon className={styles.icon()} />
                <Autocomplete.Input
                  aria-label={label}
                  placeholder={placeholder}
                  className={styles.input()}
                />
              </div>
              <Autocomplete.Empty className={styles.empty()}>{emptyText}</Autocomplete.Empty>
              <Autocomplete.List className={styles.list()}>
                {(group: CommandGroup) => (
                  <Autocomplete.Group
                    key={group.label}
                    items={group.items}
                    className={styles.group()}
                  >
                    <Autocomplete.GroupLabel className={styles.groupLabel()}>
                      {group.label}
                    </Autocomplete.GroupLabel>
                    <Autocomplete.Collection>
                      {(item: CommandItem) => (
                        <Autocomplete.Item
                          key={item.value}
                          value={item}
                          disabled={item.disabled}
                          className={styles.item()}
                          onClick={() => {
                            item.onSelect?.();
                            setOpen(false);
                          }}
                        >
                          <span>{item.label}</span>
                          {item.hint ? (
                            <span className={styles.itemHint()}>{item.hint}</span>
                          ) : null}
                        </Autocomplete.Item>
                      )}
                    </Autocomplete.Collection>
                  </Autocomplete.Group>
                )}
              </Autocomplete.List>
              {footer === null ? null : (
                <div className={styles.footer()}>
                  {footer ?? (
                    <>
                      <span>
                        <kbd className={keys}>↑</kbd> <kbd className={keys}>↓</kbd> to navigate
                      </span>
                      <span>
                        <kbd className={keys}>Enter</kbd> to run
                      </span>
                      <span>
                        <kbd className={keys}>Esc</kbd> to close
                      </span>
                    </>
                  )}
                </div>
              )}
            </Autocomplete.Root>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
