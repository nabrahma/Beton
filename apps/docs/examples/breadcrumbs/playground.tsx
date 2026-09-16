"use client";

import { Breadcrumbs, type BreadcrumbsProps } from "@beton-ui/react";

export default function BreadcrumbsPlayground(props: BreadcrumbsProps) {
  return (
    <Breadcrumbs {...props}>
      <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Docs</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Components</Breadcrumbs.Item>
      <Breadcrumbs.Item current>Breadcrumbs</Breadcrumbs.Item>
    </Breadcrumbs>
  );
}
