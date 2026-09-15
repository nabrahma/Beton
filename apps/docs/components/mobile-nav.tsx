"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { docsNav } from "@/lib/site";

export function MobileNav({
  links,
  components,
}: {
  links: { href: string; label: string }[];
  components: { name: string; title: string }[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex size-11 items-center justify-center border-3 border-border bg-raised shadow-sm active:translate-x-1 active:translate-y-1 active:shadow-none md:hidden"
      >
        <MenuIcon className="size-5" />
      </button>
      <dialog
        ref={dialog}
        aria-label="Menu"
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === dialog.current) setOpen(false);
        }}
        className="m-0 ml-auto h-dvh max-h-dvh w-[min(22rem,100vw)] max-w-none border-0 border-l-3 border-border bg-surface p-0 backdrop:bg-ink/40"
      >
        <div className="flex h-16 items-center justify-between border-b-3 border-border bg-raised px-4">
          <span className="font-display font-black uppercase">Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex size-11 items-center justify-center border-3 border-border bg-raised"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-col gap-8 overflow-y-auto p-5">
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-display text-xl font-black uppercase">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {docsNav.map((section) => (
            <div key={section.title}>
              <p className="mb-2 font-mono text-xs font-bold uppercase">{section.title}</p>
              <ul className="flex flex-col gap-1.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="font-medium">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="mb-2 font-mono text-xs font-bold uppercase">Components</p>
            <ul className="flex flex-col gap-1.5">
              {components.map((c) => (
                <li key={c.name}>
                  <Link href={`/docs/components/${c.name}`} className="font-medium">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </dialog>
    </>
  );
}
