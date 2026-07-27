"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

/**
 * The anchor wrapping a job card in the results list.
 *
 * `href` is always the canonical job URL. That matters for three reasons the
 * previous `<Link legacyBehavior>` around an `<article>` could not satisfy:
 * crawlers get a real link to every listing, the card is a tab stop, and
 * cmd/middle-click opens the job in a new tab.
 *
 * On a wide viewport a plain left click is intercepted and routed to the
 * preview query param instead, so the split-pane keeps its in-place behaviour.
 * Below the split-pane breakpoint there is no detail pane to update, so the
 * click falls through to the canonical URL — which is what makes tapping a
 * card on a phone go somewhere at all.
 */
export function JobCardLink({
  href,
  previewHref,
  isSelected,
  children,
}: {
  href: string;
  previewHref: string;
  isSelected: boolean;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <Link
      href={href}
      // Marks the previewed row for assistive tech, and drives the card's
      // selected styling without a second source of truth.
      aria-current={isSelected ? "true" : undefined}
      className={cn(
        "block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
      onClick={(event) => {
        // Never swallow a click the user meant to open elsewhere.
        if (
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return;
        }
        // Matches the `md:` breakpoint at which JobsPage reveals the detail
        // pane. Without a pane to fill, preview routing would be a dead end.
        if (!window.matchMedia("(min-width: 768px)").matches) return;

        event.preventDefault();
        router.push(previewHref, { scroll: false });
      }}
    >
      {children}
    </Link>
  );
}
