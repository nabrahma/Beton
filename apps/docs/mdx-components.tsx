import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { isValidElement, type ReactElement, type ReactNode } from "react";
import { CodeBlock } from "@/components/code-block";

function slugify(children: ReactNode): string {
  const text =
    typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const components: MDXComponents = {
  h2: ({ children }) => {
    const id = slugify(children);
    return (
      <h2 id={id} className="scroll-mt-24">
        <a href={`#${id}`} className="no-underline! hover:underline!">
          {children}
        </a>
      </h2>
    );
  },
  h3: ({ children }) => <h3 id={slugify(children)}>{children}</h3>,
  a: ({ href = "", children }) =>
    href.startsWith("/") ? <Link href={href}>{children}</Link> : <a href={href}>{children}</a>,
  pre: ({ children }) => {
    const code = isValidElement(children)
      ? (children as ReactElement<{ className?: string; children?: string }>)
      : null;
    const lang = code?.props.className?.replace("language-", "") ?? "tsx";
    return (
      <CodeBlock code={String(code?.props.children ?? "")} lang={lang} className="not-prose my-6" />
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
