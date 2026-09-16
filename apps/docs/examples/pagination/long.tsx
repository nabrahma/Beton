/**
 * Long lists
 * The row keeps its width however far in you are, so nothing shifts under the
 * pointer as you move through it.
 */
"use client";

import { Pagination } from "@beton-ui/react";
import { useState } from "react";

export default function PaginationLong() {
  const [page, setPage] = useState(1);
  return (
    <div className="flex w-full flex-col gap-6">
      <Pagination page={page} count={120} onPageChange={setPage} aria-label="Top" />
      <Pagination page={page} count={120} siblings={2} onPageChange={setPage} aria-label="Wider" />
    </div>
  );
}
