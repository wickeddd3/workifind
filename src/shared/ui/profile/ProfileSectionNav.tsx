"use client";

import { useEffect, useState } from "react";

import { cn } from "@/shared/lib/utils";

/** Clears the sticky navbar, and matches the sections' own `scroll-mt-24`. */
const NAVBAR_OFFSET = 96;

export interface ProfileNavSection {
  id: string;
  title: string;
}

/**
 * Jump links down a profile, with the section currently in view marked.
 *
 * Takes its sections rather than knowing any: the applicant's profile and the
 * company's are the same instrument over different content, and the list each
 * one passes is the same list it renders, so the rail and the page cannot
 * disagree about what exists.
 *
 * Desktop only. On a narrow screen the rail sits above the content rather than
 * beside it, so a list of links to things further down the same column is just
 * a second table of contents to scroll past.
 *
 * The highlight follows the scroll rather than the clicked link: arriving by
 * anchor and then scrolling on would otherwise leave the rail insisting you
 * were still where you landed.
 */
export function ProfileSectionNav({
  sections,
}: {
  sections: readonly ProfileNavSection[];
}) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Topmost of whatever is currently in the band, so scrolling down
        // hands off one section at a time instead of jumping to whichever
        // entry the callback happened to report last.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];

        if (visible) setActiveId(visible.target.id);
      },
      // A band just under the navbar: a section counts as "current" once its
      // top reaches the reading position, not when it first peeks into view
      // at the bottom of a tall screen.
      { rootMargin: `-${NAVBAR_OFFSET}px 0px -55% 0px` },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Profile sections"
      className="hidden rounded-2xl border border-border bg-card p-2 shadow-card lg:block"
    >
      <ul className="flex flex-col gap-0.5">
        {sections.map(({ id, title }) => {
          const isActive = activeId === id;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-0.5 shrink-0 rounded-full transition-colors",
                    isActive ? "bg-primary" : "bg-transparent",
                  )}
                />
                {title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
