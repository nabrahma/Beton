/**
 * Select all
 * The parent checkbox is indeterminate while only some items are selected.
 */
"use client";

import { Checkbox } from "@beton-ui/react";
import { useState } from "react";

const items = ["Tokens", "Recipes", "Components"];

export default function CheckboxSelectAll() {
  const [selected, setSelected] = useState<string[]>(["Tokens"]);
  const all = selected.length === items.length;
  const some = selected.length > 0 && !all;

  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-3 font-display font-bold">
        <Checkbox
          checked={all}
          indeterminate={some}
          onCheckedChange={(checked) => setSelected(checked ? items : [])}
        />
        All packages
      </label>
      <div className="flex flex-col gap-3 border-l-3 border-border pl-6">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-3 font-medium">
            <Checkbox
              checked={selected.includes(item)}
              onCheckedChange={(checked) =>
                setSelected((prev) => (checked ? [...prev, item] : prev.filter((i) => i !== item)))
              }
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
