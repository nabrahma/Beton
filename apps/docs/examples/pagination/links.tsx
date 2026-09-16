/**
 * As links
 * Pass href and the pages become links: they work before JavaScript loads and
 * can be opened in a new tab.
 */
"use client";

import { Pagination } from "@beton-ui/react";

export default function PaginationLinks() {
  return <Pagination page={3} count={9} href={(page) => "?page=" + page} />;
}
