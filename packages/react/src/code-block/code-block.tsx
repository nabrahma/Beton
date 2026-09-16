"use client";

import { codeBlock, type CodeBlockVariants } from "@beton-ui/recipes";
import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { Button } from "../button/button.tsx";
import { CheckIcon } from "../utils/icons.tsx";

export interface CodeBlockProps extends Omit<ComponentProps<"div">, "children">, CodeBlockVariants {
  /** The code itself. Passed as a string so it can also be copied. */
  children: string;
  /** Shown in the header, usually a file name. */
  filename?: ReactNode;
  /** The language, written to the code element as a class for highlighters. */
  language?: string;
  /** Number the lines down the left. Numbers are hidden from screen readers. */
  lineNumbers?: boolean;
  /** Show the copy button. On by default. */
  copyable?: boolean;
  /** Names the scrolling region. Defaults to the filename, or "Code". */
  label?: string;
}

/** A block of code with a copy button and a scrolling region you can reach. */
export function CodeBlock({
  size = "md",
  children,
  filename,
  language,
  lineNumbers = false,
  copyable = true,
  label,
  className,
  ...props
}: CodeBlockProps) {
  const styles = codeBlock({ size });
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const code = children.replace(/\n$/, "");
  const lines = code.split("\n");
  const name = label ?? (typeof filename === "string" ? filename : "Code");
  // A hook for syntax highlighters such as Prism or Shiki, not a utility class.
  const languageClass = language ? `language-${language}` : undefined;

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be refused. Saying nothing is better than lying.
      setCopied(false);
    }
  }

  return (
    <div {...props} className={styles.root({ class: className })}>
      {filename || copyable ? (
        <div className={styles.header()}>
          <span className={styles.filename()}>{filename}</span>
          {copyable ? (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className={styles.copy()}
              onClick={copy}
            >
              {copied ? <CheckIcon width={16} height={16} /> : null}
              {copied ? "Copied" : "Copy"}
            </Button>
          ) : null}
        </div>
      ) : null}
      {/* The code scrolls sideways, so it needs a name and a tab stop. */}
      <div tabIndex={0} role="group" aria-label={name} className={styles.scroller()}>
        <pre className={styles.pre()}>
          <code data-language={language} className={styles.code({ class: languageClass })}>
            {lineNumbers
              ? lines.map((line, index) => (
                  <span key={index}>
                    <span aria-hidden="true" className={styles.lineNumbers()}>
                      {String(index + 1).padStart(String(lines.length).length, " ")}
                    </span>
                    {line}
                    {index < lines.length - 1 ? "\n" : null}
                  </span>
                ))
              : code}
          </code>
        </pre>
      </div>
    </div>
  );
}
