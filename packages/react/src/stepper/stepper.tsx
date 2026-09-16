import { stepper, visuallyHidden, type StepperVariants } from "@beton-ui/recipes";
import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";
import { CheckIcon } from "../utils/icons.tsx";

export type StepState = "complete" | "current" | "upcoming";

export interface StepperProps extends Omit<ComponentProps<"ol">, "children">, StepperVariants {
  children?: ReactNode;
  /** The step being worked on, counting from 0. Earlier steps read as done. */
  activeStep?: number;
}

function StepperRoot({
  activeStep = 0,
  orientation = "horizontal",
  size = "md",
  className,
  children,
  "aria-label": ariaLabel = "Progress",
  ...props
}: StepperProps) {
  const styles = stepper({ orientation, size });
  const steps = Children.toArray(children).filter(isValidElement);
  return (
    <ol
      {...props}
      aria-label={ariaLabel}
      data-orientation={orientation}
      className={styles.root({ class: className })}
    >
      {steps.map((step, index) =>
        cloneElement(step as ReactElement<StepProps>, {
          index,
          orientation,
          size,
          state:
            (step as ReactElement<StepProps>).props.state ??
            (index < activeStep ? "complete" : index === activeStep ? "current" : "upcoming"),
          last: index === steps.length - 1,
        }),
      )}
    </ol>
  );
}

export interface StepProps extends Omit<ComponentProps<"li">, "title">, StepperVariants {
  /** The name of the step. */
  title: ReactNode;
  /** A line of detail under the title. */
  description?: ReactNode;
  /** What is shown in the marker. Defaults to the step number, or a tick once done. */
  marker?: ReactNode;
  /** Overrides what Stepper worked out from `activeStep`. */
  state?: StepState;
  /** Set by Stepper. */
  index?: number;
  /** Set by Stepper. */
  last?: boolean;
}

function Step({
  title,
  description,
  marker,
  state = "upcoming",
  index = 0,
  last = false,
  orientation = "horizontal",
  size = "md",
  className,
  children,
  ...props
}: StepProps) {
  const styles = stepper({ orientation, size });
  return (
    <li
      {...props}
      data-state={state}
      aria-current={state === "current" ? "step" : undefined}
      className={styles.item({ class: className })}
    >
      <span data-state={state} className={styles.marker()}>
        {marker ?? (state === "complete" ? <CheckIcon width={20} height={20} /> : index + 1)}
        <span className={visuallyHidden}>
          {state === "complete" ? " (done)" : state === "current" ? " (current step)" : ""}
        </span>
      </span>
      <span className={styles.content()}>
        <span className={styles.title()}>{title}</span>
        {description ? <span className={styles.description()}>{description}</span> : null}
        {children}
      </span>
      {last ? null : <span aria-hidden="true" data-state={state} className={styles.connector()} />}
    </li>
  );
}

/** Shows where someone is in a task that runs over several steps. */
export const Stepper = Object.assign(StepperRoot, { Step });
