/**
 * Icon only
 * Square buttons for a single icon. The aria-label is required.
 */
import { Button } from "@beton-ui/react";

export default function ButtonIconOnly() {
  return (
    <div className="flex items-center gap-4">
      <Button iconOnly aria-label="Add item">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M12 4v16M4 12h16" />
        </svg>
      </Button>
      <Button iconOnly variant="secondary" aria-label="Close">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      </Button>
    </div>
  );
}
