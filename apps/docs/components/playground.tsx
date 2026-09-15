"use client";

import * as recipes from "@beton-ui/recipes";
import { type ComponentType, useId, useState } from "react";

type Recipe = {
  variants?: Record<string, Record<string, unknown>>;
  defaultVariants?: Record<string, unknown>;
};

export function Playground({
  component: Component,
  exportName,
  recipe,
  controls,
  toggles = [],
}: {
  component: ComponentType<Record<string, unknown>>;
  exportName: string;
  recipe: string;
  controls: string[];
  toggles?: string[];
}) {
  const id = useId();
  const source = (recipes as unknown as Record<string, Recipe>)[recipe];
  const variants = source?.variants ?? {};
  const defaults = source?.defaultVariants ?? {};

  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      controls.map((key) => [
        key,
        String(defaults[key] ?? Object.keys(variants[key] ?? {})[0] ?? ""),
      ]),
    ),
  );
  const [flags, setFlags] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(toggles.map((key) => [key, false])),
  );

  const props = {
    ...values,
    ...Object.fromEntries(Object.entries(flags).filter(([, on]) => on)),
  };
  const snippet = `<${exportName}${Object.entries(values)
    .filter(([key, value]) => String(defaults[key]) !== value)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join("")}${Object.entries(flags)
    .filter(([, on]) => on)
    .map(([key]) => ` ${key}`)
    .join("")} />`;

  return (
    <div className="grid border-3 border-border bg-raised shadow-lg lg:grid-cols-[1fr_16rem]">
      <div className="bg-grid flex min-h-72 items-center justify-center overflow-x-auto border-b-3 border-border p-8 lg:border-r-3 lg:border-b-0">
        {/* Remount on change so uncontrolled props such as defaultChecked apply. */}
        <Component key={snippet} {...props} />
      </div>
      <form
        aria-label="Props"
        className="flex flex-col gap-5 p-5"
        onSubmit={(e) => e.preventDefault()}
      >
        {controls.map((key) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-${key}`} className="font-mono text-xs font-bold uppercase">
              {key}
            </label>
            <select
              id={`${id}-${key}`}
              value={values[key]}
              onChange={(event) => setValues((prev) => ({ ...prev, [key]: event.target.value }))}
              className="h-11 border-3 border-border bg-raised px-2 font-display font-bold shadow-sm"
            >
              {Object.keys(variants[key] ?? {}).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
        {toggles.length ? (
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-1.5 font-mono text-xs font-bold uppercase">State</legend>
            {toggles.map((key) => (
              <label
                key={key}
                className="flex min-h-11 cursor-pointer items-center gap-3 font-display font-bold"
              >
                <input
                  type="checkbox"
                  checked={flags[key] ?? false}
                  onChange={(event) =>
                    setFlags((prev) => ({ ...prev, [key]: event.target.checked }))
                  }
                  className="size-5 accent-ink"
                />
                {key}
              </label>
            ))}
          </fieldset>
        ) : null}
        <output
          htmlFor={controls.map((key) => `${id}-${key}`).join(" ")}
          className="mt-auto block border-2 border-border bg-ink p-3 font-mono text-xs break-all text-paper"
        >
          {snippet}
        </output>
      </form>
    </div>
  );
}
