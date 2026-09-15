import type { ComponentMeta } from "../meta.types.ts";

export const meta: ComponentMeta = {
  name: "file-upload",
  title: "File Upload",
  description: "A drop zone backed by a native file input, with a removable file list.",
  category: "forms",
  status: "stable",
  exports: ["FileUpload"],
  accessibility: {
    keyboard: [
      { keys: "Tab", action: "Moves focus to the file input inside the drop zone." },
      { keys: "Enter / Space", action: "Opens the system file picker." },
      { keys: "Tab to Remove", action: "Each selected file has a remove button." },
    ],
    aria: [
      'A native <input type="file"> named by the drop zone text and described by the hint.',
      "A status region announces how many files are selected.",
    ],
    notes: [
      "Dropping is a convenience; the file picker works without a pointer.",
      "Dropped files are filtered by accept, like the picker.",
      "The native input keeps the selection, so it submits with a regular form.",
    ],
  },
  related: ["field", "button"],
  playground: {
    recipe: "fileUpload",
    controls: ["size"],
    toggles: ["multiple", "disabled", "invalid"],
  },
};
