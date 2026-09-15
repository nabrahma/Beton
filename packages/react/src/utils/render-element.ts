import { mergeProps } from "@base-ui/react/merge-props";
import { cn } from "@beton-ui/recipes";
import {
  cloneElement,
  createElement,
  isValidElement,
  type HTMLAttributes,
  type JSX,
  type ReactElement,
  type Ref,
  type RefCallback,
} from "react";

export type HTMLProps = HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> };

/**
 * The `render` prop, with Base UI semantics: pass an element to replace the
 * rendered tag, or a function that receives the props to spread.
 */
export type RenderProp<State = Record<string, never>> =
  ReactElement | ((props: HTMLProps, state: State) => ReactElement);

function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return (value) => {
    const cleanups = refs.map((ref) => {
      if (typeof ref === "function") return ref(value);
      if (ref) (ref as { current: T | null }).current = value;
      return undefined;
    });
    return () => {
      cleanups.forEach((cleanup, i) => {
        const ref = refs[i];
        if (typeof cleanup === "function") cleanup();
        else if (typeof ref === "function") ref(null);
        else if (ref) (ref as { current: T | null }).current = null;
      });
    };
  };
}

/**
 * Renders a presentational element with support for the `render` prop.
 * Uses no hooks, so it is safe inside React Server Components.
 */
export function renderElement<State = Record<string, never>>(
  tag: keyof JSX.IntrinsicElements,
  props: Record<string, unknown>,
  render: RenderProp<State> | undefined,
  state: State = {} as State,
): ReactElement {
  if (typeof render === "function") {
    return render(props as HTMLProps, state);
  }

  if (isValidElement<Record<string, unknown>>(render)) {
    const own = render.props;
    const merged: Record<string, unknown> = mergeProps(props, own);
    merged.className = cn(props.className as string, own.className as string);
    const ownRef = own.ref as Ref<unknown> | undefined;
    const ref = props.ref as Ref<unknown> | undefined;
    if (ref && ownRef) merged.ref = mergeRefs(ref, ownRef);
    return cloneElement(render, merged);
  }

  return createElement(tag, props);
}

/** Converts a boolean into a present-or-absent data attribute value. */
export function dataAttr(condition: boolean | undefined): "" | undefined {
  return condition ? "" : undefined;
}
