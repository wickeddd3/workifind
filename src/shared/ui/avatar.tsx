import Image from "next/image";

import { cn } from "@/shared/lib/utils";

/**
 * Square avatar with a lettermark fallback.
 *
 * Falling back to a shared placeholder image meant every record without an
 * upload rendered the same grey "broken image" glyph, which reads as a failure
 * rather than an absence. Initials on a tinted ground look deliberate, stay
 * legible at 48px, and distinguish adjacent rows from each other.
 *
 * No domain knowledge — it takes a name and an optional URL, so entities and
 * widgets can both use it without importing sideways.
 */

/**
 * Tints are drawn from the brand's own hue family so a grid of fallbacks reads
 * as one set. Paired foreground/background rather than opacity, so contrast
 * holds in both themes.
 */
const TINTS = [
  "bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-200",
  "bg-feature-subtle text-feature-subtle-foreground",
  "bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-100",
  "bg-warn-subtle text-warn-subtle-foreground",
  "bg-brand-50 text-brand-600 dark:bg-brand-900 dark:text-brand-100",
] as const;

/**
 * Stable per name, so a company keeps the same colour between renders and
 * across pages. A sum of char codes is enough — this only needs to spread
 * names across five buckets, not resist collisions.
 */
function tintFor(name: string) {
  let total = 0;
  for (let i = 0; i < name.length; i++) total += name.charCodeAt(i);
  return TINTS[total % TINTS.length];
}

/** First letters of the first two words — "Atlas Design Studio" gives "AD". */
function initialsFor(name: string) {
  const letters = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return letters.toUpperCase() || "?";
}

export function Avatar({
  name,
  src,
  size = 48,
  className,
}: {
  name: string;
  src?: string | null;
  size?: number;
  className?: string;
}) {
  const shared = cn(
    "flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border",
    className,
  );

  if (src) {
    return (
      <div
        className={cn(shared, "bg-card")}
        style={{ width: size, height: size }}
      >
        <Image
          src={src}
          alt={`${name} logo`}
          width={size}
          height={size}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(shared, tintFor(name), "font-heading font-bold")}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
      // The name is always rendered beside the avatar, so announcing the
      // initials as well would just repeat it.
      aria-hidden="true"
    >
      {initialsFor(name)}
    </div>
  );
}
