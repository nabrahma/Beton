import type { ReactNode } from "react";

export default function GuidesLayout({ children }: { children: ReactNode }) {
  return <article className="prose-beton">{children}</article>;
}
