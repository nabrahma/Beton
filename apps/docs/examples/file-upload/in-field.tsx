/**
 * With a size limit
 * Validate files in onFilesChange and mark the upload invalid.
 */
"use client";

import { FileUpload, Text } from "@beton-ui/react";
import { useState } from "react";

const LIMIT = 1024 * 1024;

export default function FileUploadInField() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <FileUpload
        title="Upload your CV"
        hint="PDF, up to 1 MB"
        accept=".pdf"
        size="sm"
        invalid={Boolean(error)}
        aria-errormessage="cv-error"
        onFilesChange={(files) =>
          setError(files.some((f) => f.size > LIMIT) ? "That file is larger than 1 MB." : null)
        }
      />
      <Text id="cv-error" size="sm" weight="bold" aria-live="polite">
        {error}
      </Text>
    </div>
  );
}
