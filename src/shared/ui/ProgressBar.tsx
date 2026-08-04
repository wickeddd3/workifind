import { cn } from "@/shared/lib/utils";

/**
 * How far along something is.
 *
 * Deliberately not a Radix primitive — this reports on work in progress and
 * takes no input, so there is no keyboard or focus behaviour to get right. The
 * ARIA roles below are the whole accessibility surface.
 */
export function ProgressBar({
  value,
  label,
  className,
}: {
  /** 0–100. Clamped, because a caller computing a percentage can overshoot. */
  value: number;
  /** Announced to screen readers, which cannot see the bar. */
  label: string;
  className?: string;
}) {
  const percent = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-muted",
        className,
      )}
    >
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-200 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
