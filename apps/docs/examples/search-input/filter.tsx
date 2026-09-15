/**
 * Filtering a list
 * Results update as you type. Escape clears the search.
 */
"use client";

import { SearchInput, Text } from "@beton-ui/react";
import { useState } from "react";

const components = [
  "Button",
  "Badge",
  "Card",
  "Checkbox",
  "Dialog",
  "Select",
  "Slider",
  "Switch",
  "Tabs",
];

export default function SearchInputFilter() {
  const [query, setQuery] = useState("");
  const results = components.filter((c) => c.toLowerCase().includes(query.toLowerCase()));

  return (
    <search className="flex w-full max-w-sm flex-col gap-4">
      <SearchInput
        aria-label="Filter components"
        placeholder="Filter components"
        value={query}
        onValueChange={setQuery}
      />
      <Text size="sm" mono aria-live="polite">
        {results.length} {results.length === 1 ? "result" : "results"}
      </Text>
      <ul className="flex flex-wrap gap-2">
        {results.map((result) => (
          <li
            key={result}
            className="border-2 border-border bg-raised px-2 py-1 font-mono text-sm font-bold"
          >
            {result}
          </li>
        ))}
      </ul>
    </search>
  );
}
