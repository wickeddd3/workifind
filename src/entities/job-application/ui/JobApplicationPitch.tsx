"use client";

import { useState } from "react";

import { cn } from "@/shared/lib/utils";

/**
 * Roughly how much pitch fits in the two clamped lines the card shows. Anything
 * under it is already fully visible, so offering to expand it would be a button
 * that does nothing.
 */
const CLAMP_THRESHOLD = 180;

/**
 * What the applicant wrote, on the employer's list.
 *
 * Shown inline and clamped rather than hidden behind a collapsed drawer. The
 * pitch is the one thing on the card that is not on the applicant's profile, so
 * a list where every pitch starts closed is a list you have to open item by
 * item to triage at all.
 */
export function JobApplicationPitch({ pitch }: { pitch: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!pitch?.trim()) return null;

  const isLong = pitch.length > CLAMP_THRESHOLD;

  return (
    <div className="flex flex-col items-start gap-1.5 rounded-xl bg-muted/60 p-3">
      <p
        className={cn(
          "whitespace-pre-wrap break-words text-sm text-foreground",
          isLong && !isExpanded && "line-clamp-2",
        )}
      >
        {pitch}
      </p>
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
