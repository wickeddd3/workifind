"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

/**
 * The anchor wrapping a professional in the results list.
 *
 * Same rules as `JobCardLink`, and for the same reasons: `href` is always the
 * canonical profile URL, so the card is a real link — a tab stop, a
 * cmd/middle-click target, something a crawler can follow. A plain left click
 * on a wide viewport is intercepted and routed to the preview param instead, so
 * the split pane updates in place. Below the split-pane breakpoint there is no
 * pane to fill, so the click falls through to the profile.
 */
export function ProfessionalCardLink({
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
      aria-current={isSelected ? "true" : undefined}
      className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      onClick={(event) => {
        if (
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return;
        }
        if (!window.matchMedia("(min-width: 768px)").matches) return;

        event.preventDefault();
        router.push(previewHref, { scroll: false });
      }}
    >
      {children}
    </Link>
  );
}
