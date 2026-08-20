"use client";

import { useState } from "react";

import { cn } from "@/shared/lib/utils";
import Markdown from "@/shared/ui/Markdown";

/**
 * Roughly how much pitch fits in the two lines the card shows collapsed.
 * Anything under it is already fully visible, so offering to expand it would be
 * a button that does nothing.
 *
 * The measure is the Markdown source, which counts syntax the reader never
 * sees, so it errs towards offering the button. A pitch that breaks across
 * blocks — a second paragraph, a list — is past two lines whatever its length,
 * since each block carries the renderer's spacing with it.
 */
const CLAMP_THRESHOLD = 180;

/**
 * The collapsed preview, at four lines of `text-sm` (line height 1.25rem).
 *
 * Deeper than the two lines this used to clamp to, because Markdown arrives in
 * blocks with spacing between them: at two lines a pitch that opened with a
 * sentence and a heading cut eight pixels into the second block, leaving a
 * sliver of half-faded text that read as a rendering fault rather than as more
 * to come.
 */
const COLLAPSED_MAX_HEIGHT = "max-h-20";

/**
 * What the applicant wrote, on the employer's list.
 *
 * Rendered as Markdown, which is what the application form writes and what the
 * job and profile pages already show. Before, the card printed the source into
 * a `<p>`, so a pitch with any formatting in it reached the employer as literal
 * `**bold**` and `- item`.
 *
 * Shown inline and clamped rather than hidden behind a collapsed drawer. The
 * pitch is the one thing on the card that is not on the applicant's profile, so
 * a list where every pitch starts closed is a list you have to open item by
 * item to triage at all.
 */
export function JobApplicationPitch({ pitch }: { pitch: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!pitch?.trim()) return null;

  const isLong = pitch.length > CLAMP_THRESHOLD || pitch.includes("\n");
  const isCollapsed = isLong && !isExpanded;

  return (
    <div className="flex flex-col items-start gap-1.5 rounded-xl bg-muted/60 p-3">
      <div
        className={cn(
          "break-words text-sm text-foreground",
          // A height cut rather than `line-clamp`, which needs
          // `display: -webkit-box` and would flatten the renderer's paragraphs
          // and lists into a single run of text. The mask fades the cut out
          // instead of slicing a line in half, and works over the card's
          // translucent fill without having to restate it as a gradient.
          isCollapsed &&
            `${COLLAPSED_MAX_HEIGHT} overflow-hidden [mask-image:linear-gradient(to_bottom,black_75%,transparent)]`,
        )}
      >
        <Markdown>{pitch}</Markdown>
      </div>
      {isLong && (
        <button
          type="button"
          onClick={() => setIsExpanded((open) => !open)}
          className="rounded text-xs font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {isExpanded ? "Show less" : "Read full pitch"}
        </button>
      )}
    </div>
  );
}
