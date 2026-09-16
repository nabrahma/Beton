/**
 * A different separator
 * Anything can go between the crumbs. Whatever you pass is hidden from screen
 * readers, which hear the list structure instead.
 */
"use client";

import { Breadcrumbs } from "@beton-ui/react";

export default function BreadcrumbsSeparator() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs separator="/" aria-label="Slash">
        <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
        <Breadcrumbs.Item href="#">Projects</Breadcrumbs.Item>
        <Breadcrumbs.Item current>Site 4</Breadcrumbs.Item>
      </Breadcrumbs>
      <Breadcrumbs separator={String.fromCharCode(8250)} aria-label="Chevron">
        <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
        <Breadcrumbs.Item href="#">Projects</Breadcrumbs.Item>
        <Breadcrumbs.Item current>Site 4</Breadcrumbs.Item>
      </Breadcrumbs>
      <Breadcrumbs separator={String.fromCharCode(8212)} aria-label="Dash">
        <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
        <Breadcrumbs.Item href="#">Projects</Breadcrumbs.Item>
        <Breadcrumbs.Item current>Site 4</Breadcrumbs.Item>
      </Breadcrumbs>
    </div>
  );
}
