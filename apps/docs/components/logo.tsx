export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect x="2" y="2" width="24" height="24" fill="var(--color-ink)" />
      <rect
        x="6"
        y="6"
        width="24"
        height="24"
        fill="var(--color-secondary)"
        stroke="var(--color-ink)"
        strokeWidth="3"
      />
      <rect x="11" y="11" width="6" height="6" fill="var(--color-ink)" />
      <rect x="19" y="19" width="6" height="6" fill="var(--color-ink)" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="size-8 shrink-0" />
      <span className="font-display text-2xl leading-none font-black tracking-tight uppercase font-stretch-wide">
        Béton
      </span>
    </span>
  );
}
