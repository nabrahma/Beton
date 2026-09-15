export type ComponentCategory =
  "foundation" | "forms" | "overlays" | "navigation" | "data-display" | "motion";

export interface KeyboardInteraction {
  keys: string;
  action: string;
}

/**
 * Human-written documentation for a component. Everything that can be derived
 * from source (dependencies, files, props) is generated, not listed here.
 */
export interface ComponentMeta {
  /** Registry name, kebab-case. Matches the folder name. */
  name: string;
  title: string;
  /** One sentence, shown under the title and in the registry. */
  description: string;
  category: ComponentCategory;
  status: "stable" | "beta";
  /** Exported component names documented on the page, in order. */
  exports: string[];
  accessibility: {
    keyboard: KeyboardInteraction[];
    /** ARIA roles and attributes the component renders or manages. */
    aria: string[];
    notes: string[];
    limitations?: string[];
  };
  related: string[];
}
