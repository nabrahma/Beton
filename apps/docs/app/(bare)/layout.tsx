import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f5f5dc",
  colorScheme: "light",
};

/**
 * Previews are shown inside an iframe so a block meets the breakpoints of the
 * frame rather than those of the page around it. No header, no footer, no skip
 * link: the page it is embedded in has all three.
 */
export default function BareLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-surface text-foreground">{children}</body>
    </html>
  );
}
