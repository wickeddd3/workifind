import { Lock } from "lucide-react";

import { cn } from "@/shared/lib/utils";

/**
 * Stands in for a value the current visitor may not read.
 *
 * The blur is decoration and nothing else — the real value was dropped on the
 * server and never reached this render. That ordering matters: a component that
 * blurred a value it had been handed would leave it sitting in the HTML for
 * anyone who opens devtools, and the page would look protected while not being
 * so. What gets blurred here is a run of filler glyphs.
 *
 * `select-none` and `aria-hidden` on the filler keep it out of a copy-paste and
 * out of a screen reader; the label beside it is what actually says why there is
 * nothing to read.
 */
export function RedactedField({
  label,
  width = "8rem",
  className,
}: {
  /** What is being withheld, e.g. "Email hidden". Read out to assistive tech. */
  label: string;
  /** Roughly how long the real value would have been. */
  width?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground",
        className,
      )}
    >
      <Lock size={14} className="shrink-0" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="select-none truncate rounded bg-muted/80 text-transparent blur-[3px]"
        style={{ width }}
      >
        ••••••••••••
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}
