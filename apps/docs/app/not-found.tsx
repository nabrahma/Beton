import type { Metadata } from "next";
import { button } from "@beton-ui/recipes";
import { GridBackground, NotFoundPage } from "@beton-ui/react";
import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found · Béton",
};

export default function NotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-surface text-foreground">
        <NotFoundPage
          background={<GridBackground weight="light" />}
          title="Nothing poured here."
          description="The page you are looking for does not exist, or it moved."
          actions={
            <>
              <Link href="/" className={button()}>
                Go home
              </Link>
              <Link href="/docs/components" className={button({ variant: "secondary" })}>
                Browse components
              </Link>
            </>
          }
        />
      </body>
    </html>
  );
}
