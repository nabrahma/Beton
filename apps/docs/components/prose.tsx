import type { ReactNode } from "react";

export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose-beton">{children}</div>;
}

export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="border-3 border-border bg-secondary p-5 shadow-sm">
      {title ? <p className="font-display text-lg font-extrabold">{title}</p> : null}
      <div className="mt-1">{children}</div>
    </aside>
  );
}
