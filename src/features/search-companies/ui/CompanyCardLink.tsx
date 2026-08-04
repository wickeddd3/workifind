"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

/**
 * The anchor wrapping a company in the results list. Same rules as
 * `JobCardLink`: a real link to the canonical page, intercepted on a wide
 * viewport so a plain left click updates the preview pane instead.
 */
export function CompanyCardLink({
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
