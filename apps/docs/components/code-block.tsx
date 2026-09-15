import { CopyButton } from "@/components/copy-button";
import { highlight } from "@/lib/highlight";

export async function CodeBlock({
  code,
  lang = "tsx",
  title,
  className = "",
}: {
  code: string;
  lang?: string;
  title?: string;
  className?: string;
}) {
  const html = await highlight(code.trimEnd(), lang);
  return (
    <figure className={`code-block min-w-0 border-3 border-border bg-ink text-paper ${className}`}>
      <figcaption className="flex min-h-11 items-center justify-between gap-3 border-b-2 border-paper/40 py-1 pr-1.5 pl-4">
        <span className="truncate font-mono text-xs font-bold tracking-wide text-paper">
          {title ?? lang}
        </span>
        <CopyButton value={code.trimEnd()} />
      </figcaption>
      <div
        tabIndex={0}
        role="region"
        aria-label={title ? `Code: ${title}` : "Code"}
        className="max-h-[32rem] overflow-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}

export function InlineCommand({ command }: { command: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3 border-3 border-border bg-ink py-1.5 pr-1.5 pl-4 text-paper shadow-sm">
      <span aria-hidden="true" className="font-mono text-secondary">
        $
      </span>
      <code className="min-w-0 flex-1 truncate font-mono text-sm">{command}</code>
      <CopyButton value={command} label={`Copy: ${command}`} />
    </div>
  );
}
