/**
 * Images only
 * accept filters both the picker and dropped files.
 */
"use client";

import { FileUpload } from "@beton-ui/react";

export default function FileUploadImages() {
  return (
    <FileUpload
      name="gallery"
      title="Drop images or browse"
      hint="PNG, JPG or SVG"
      accept="image/png,image/jpeg,image/svg+xml"
      multiple
      className="max-w-md"
    />
  );
}
