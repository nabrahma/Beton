import { button } from "@beton-ui/recipes";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-grid flex flex-1 items-center justify-center px-4 py-24">
      <div className="flex max-w-xl flex-col items-start gap-6 border-3 border-border bg-raised p-8 shadow-lg sm:p-12">
        <p className="border-3 border-border bg-danger px-3 py-1 font-mono text-sm font-bold">
          404
        </p>
        <h1 className="font-display text-5xl leading-none font-black tracking-tight sm:text-6xl">
          Nothing poured here.
        </h1>
        <p className="text-lg">The page you are looking for does not exist, or it moved.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/" className={button()}>
            Go home
          </Link>
          <Link href="/docs/components" className={button({ variant: "secondary" })}>
            Browse components
          </Link>
        </div>
      </div>
    </main>
  );
}
