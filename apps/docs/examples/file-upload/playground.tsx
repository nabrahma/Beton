"use client";

import { FileUpload, type FileUploadProps } from "@beton-ui/react";

export default function FileUploadPlayground(props: FileUploadProps) {
  return <FileUpload {...props} hint="Any file type" className="max-w-md" />;
}
