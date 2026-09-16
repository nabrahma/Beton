"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import { hoverCard, type HoverCardVariants } from "@beton-ui/recipes";
import { createContext, useContext } from "react";

const HoverCardContext = createContext<HoverCardVariants>({ size: "md" });

function useStyles() {
  return hoverCard(useContext(HoverCardContext));
}

export interface HoverCardProps extends PreviewCard.Root.Props, HoverCardVariants {}

function HoverCardRoot({ size = "md", ...props }: HoverCardProps) {
  return (
    <HoverCardContext.Provider value={{ size }}>
      <PreviewCard.Root {...props} />
    </HoverCardContext.Provider>
  );
}

/** The link that reveals the card. Renders an anchor. */
function HoverCardTrigger(props: PreviewCard.Trigger.Props) {
  return <PreviewCard.Trigger {...props} />;
}

export interface HoverCardContentProps extends Omit<PreviewCard.Popup.Props, "className"> {
  className?: string;
  side?: PreviewCard.Positioner.Props["side"];
  align?: PreviewCard.Positioner.Props["align"];
  sideOffset?: number;
}

function HoverCardContent({
  className,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  ...props
}: HoverCardContentProps) {
  const styles = useStyles();
  return (
    <PreviewCard.Portal>
      <PreviewCard.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={styles.positioner()}
      >
        <PreviewCard.Popup {...props} className={styles.popup({ class: className })}>
          {children}
        </PreviewCard.Popup>
      </PreviewCard.Positioner>
    </PreviewCard.Portal>
  );
}

/**
 * A preview panel shown when a link is hovered or focused. Everything inside it
 * must also be reachable another way, since touch users never see it.
 */
export const HoverCard = Object.assign(HoverCardRoot, {
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
});
