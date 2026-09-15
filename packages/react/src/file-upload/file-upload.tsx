"use client";

import { button, fileUpload, type FileUploadVariants } from "@beton-ui/recipes";
import {
  useId,
  useRef,
  useState,
  type ComponentProps,
  type DragEvent,
  type ReactNode,
} from "react";
import { CloseIcon, UploadIcon } from "../utils/icons.tsx";
import { dataAttr } from "../utils/render-element.ts";

export interface FileUploadProps
  extends
    Omit<
      ComponentProps<"input">,
      "className" | "size" | "type" | "value" | "defaultValue" | "onChange" | "title"
    >,
    FileUploadVariants {
  className?: string;
  /** Main text in the drop zone. */
  title?: ReactNode;
  /** Supporting text, such as accepted types and size limits. */
  hint?: ReactNode;
  /** Called with the full list of selected files after every change. */
  onFilesChange?: (files: File[]) => void;
  /** Marks the selection as invalid. */
  invalid?: boolean;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unit]}`;
}

/** Checks a file against an `accept` attribute value such as "image/*,.pdf". */
export function matchesAccept(file: File, accept: string | undefined): boolean {
  if (!accept) return true;
  return accept
    .split(",")
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean)
    .some((rule) =>
      rule.startsWith(".")
        ? file.name.toLowerCase().endsWith(rule)
        : rule.endsWith("/*")
          ? file.type.toLowerCase().startsWith(rule.slice(0, -1))
          : file.type.toLowerCase() === rule,
    );
}

/**
 * Pick files with the system dialog or by dropping them. The native input
 * stays in the form, so the selection submits with it.
 */
export function FileUpload({
  size = "md",
  title = "Drop files here or browse",
  hint,
  onFilesChange,
  invalid = false,
  multiple = false,
  accept,
  disabled = false,
  id,
  className,
  ...props
}: FileUploadProps) {
  const styles = fileUpload({ size });
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  function update(next: File[]) {
    setFiles(next);
    onFilesChange?.(next);
    const input = inputRef.current;
    if (input && typeof DataTransfer !== "undefined") {
      const transfer = new DataTransfer();
      next.forEach((file) => transfer.items.add(file));
      input.files = transfer.files;
    }
  }

  function add(incoming: File[]) {
    const accepted = incoming.filter((file) => matchesAccept(file, accept));
    update(multiple ? [...files, ...accepted] : accepted.slice(0, 1));
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    if (!disabled) add([...event.dataTransfer.files]);
  }

  return (
    <div data-size={size} className={styles.root({ class: className })}>
      <label
        htmlFor={inputId}
        data-dragging={dataAttr(dragging)}
        data-disabled={dataAttr(disabled)}
        data-invalid={dataAttr(invalid)}
        className={styles.dropzone()}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <UploadIcon className={styles.icon()} />
        <span className={styles.title()}>{title}</span>
        {hint ? (
          <span id={hintId} className={styles.hint()}>
            {hint}
          </span>
        ) : null}
        <input
          {...props}
          ref={inputRef}
          id={inputId}
          type="file"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={hint ? hintId : undefined}
          className={styles.input()}
          onChange={(event) => add([...(event.currentTarget.files ?? [])])}
        />
      </label>

      <p role="status" className={styles.input()}>
        {files.length === 0
          ? ""
          : `${files.length} ${files.length === 1 ? "file" : "files"} selected`}
      </p>

      {files.length ? (
        <ul aria-label="Selected files" className={styles.list()}>
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className={styles.file()}>
              <span className={styles.fileName()}>{file.name}</span>
              <span className={styles.fileSize()}>{formatBytes(file.size)}</span>
              <button
                type="button"
                data-size="sm"
                aria-label={`Remove ${file.name}`}
                disabled={disabled}
                onClick={() => update(files.filter((_, i) => i !== index))}
                className={button({ variant: "ghost", size: "sm", iconOnly: true })}
              >
                <CloseIcon width={16} height={16} />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
