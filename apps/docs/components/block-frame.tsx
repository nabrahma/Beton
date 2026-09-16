"use client";

import { button } from "@beton-ui/recipes";
import { useEffect, useRef, useState } from "react";

const WIDTHS = [
  { id: "phone", label: "Phone", width: 390 },
  { id: "tablet", label: "Tablet", width: 768 },
  { id: "full", label: "Full", width: 0 },
] as const;

type WidthId = (typeof WIDTHS)[number]["id"];

/**
 * A block drawn in an iframe, so its breakpoints answer to the width of the
 * frame rather than the width of the documentation page around it. The frame
 * grows to fit its content, and the buttons narrow it to a phone or a tablet.
 */
export function BlockFrame({ slug, title }: { slug: string; title: string }) {
  const [width, setWidth] = useState<WidthId>("full");
  const [height, setHeight] = useState(360);
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = frame.current;
    if (!iframe) return;

    function measure() {
      const document_ = iframe?.contentDocument;
      if (!document_) return;
      // The body, not the document: the document is as tall as the frame, so
      // measuring it would only ever confirm the height the frame already has.
      const content = document_.body.getBoundingClientRect().height;
      setHeight(Math.max(64, Math.ceil(content)));
    }

    iframe.addEventListener("load", measure);
    // The content can reflow after fonts land or the width changes.
    const timer = setInterval(measure, 500);
    return () => {
      iframe.removeEventListener("load", measure);
      clearInterval(timer);
    };
  }, [width]);

  const chosen = WIDTHS.find((option) => option.id === width);

  return (
    <div className="flex flex-col gap-3">
      <div role="group" aria-label="Preview width" className="flex flex-wrap gap-2">
        {WIDTHS.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={width === option.id}
            onClick={() => setWidth(option.id)}
            className={button({
              size: "sm",
              variant: width === option.id ? "primary" : "secondary",
            })}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto border-3 border-border bg-raised">
        <iframe
          ref={frame}
          title={`${title} preview`}
          src={`/preview/${slug}`}
          loading="lazy"
          style={{
            width: chosen?.width ? `${chosen.width}px` : "100%",
            height: `${height}px`,
            margin: chosen?.width ? "0 auto" : undefined,
            display: "block",
            border: "0",
          }}
        />
      </div>
    </div>
  );
}
