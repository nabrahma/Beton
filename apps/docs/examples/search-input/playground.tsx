"use client";

import { SearchInput, type SearchInputProps } from "@beton-ui/react";

export default function SearchInputPlayground(props: SearchInputProps) {
  return (
    <SearchInput
      {...props}
      aria-label="Search components"
      placeholder="Search components"
      className="max-w-sm"
    />
  );
}
