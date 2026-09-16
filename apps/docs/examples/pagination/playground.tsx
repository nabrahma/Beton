"use client";

import { Pagination, type PaginationProps } from "@beton-ui/react";
import { useState } from "react";

export default function PaginationPlayground(props: Partial<PaginationProps>) {
  const [page, setPage] = useState(4);
  return <Pagination {...props} page={page} count={12} onPageChange={setPage} />;
}
