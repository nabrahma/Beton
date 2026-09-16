"use client";

import { confetti } from "@beton-ui/recipes";
import { useEffect, useState, type ComponentProps } from "react";
import { useReducedMotion } from "../utils/use-reduced-motion.ts";

const COLOURS = ["bg-primary", "bg-secondary", "bg-danger", "bg-success"] as const;

interface Piece {
  id: number;
  x: number;
  y: number;
  rotate: number;
  colour: (typeof COLOURS)[number];
}

export interface ConfettiProps extends Omit<ComponentProps<"div">, "children"> {
  /** Throw a new burst whenever this number goes up. */
  fire: number;
  /** How many pieces are thrown. */
  count?: number;
  /** How long the pieces stay, in milliseconds. */
  duration?: number;
  /** Called once the pieces have gone. */
  onDone?: () => void;
}

/**
 * A burst of hard paper squares. It throws nothing at all for anyone who has
 * asked for less motion, and it is decoration: say what happened in words too.
 */
export function Confetti({
  fire,
  count = 40,
  duration = 1400,
  onDone,
  className,
  ...props
}: ConfettiProps) {
  const reduced = useReducedMotion();
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    // useReducedMotion only knows the answer after the first paint, so clear
    // anything that was thrown before it did.
    if (reduced) {
      setPieces([]);
      return;
    }
    if (!fire) return;
    setPieces(
      Array.from({ length: Math.max(1, Math.trunc(count)) }, (_, id) => ({
        id: fire * 1000 + id,
        x: Math.random() * 100,
        y: Math.random() * 40,
        rotate: Math.round(Math.random() * 8) * 45,
        colour: COLOURS[id % COLOURS.length] as (typeof COLOURS)[number],
      })),
    );
    const timer = setTimeout(() => {
      setPieces([]);
      onDone?.();
    }, duration);
    return () => clearTimeout(timer);
    // onDone is deliberately not a dependency: a new function each render
    // would throw the confetti again.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, duration, fire, reduced]);

  const styles = confetti();
  if (pieces.length === 0) return null;

  return (
    <div {...props} aria-hidden="true" className={styles.root({ class: className })}>
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className={styles.piece({ class: piece.colour })}
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: 14,
            height: 14,
            rotate: `${piece.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}
