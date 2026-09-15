import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="mb-10 flex flex-col gap-4 border-b-3 border-border pb-8">
      {eyebrow ? (
        <p className="w-fit border-2 border-border bg-primary px-2 py-0.5 font-mono text-xs font-bold tracking-widest uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-display text-5xl leading-[0.95] font-black tracking-tight text-balance sm:text-6xl">
        {title}
      </h1>
      {description ? <p className="max-w-2xl text-xl leading-relaxed">{description}</p> : null}
      {children}
    </header>
  );
}

export function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mb-5 scroll-mt-24 font-display text-3xl font-black tracking-tight">
      <a href={`#${id}`} className="hover:underline">
        {children}
      </a>
    </h2>
  );
}
