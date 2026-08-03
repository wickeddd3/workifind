"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isActiveLink } from "@/shared/lib/is-active-link";
import { cn } from "@/shared/lib/utils";

const TABS = [
  // `/applicant/jobs` is a prefix of the saved list's path, so it can only
  // match exactly — otherwise both tabs light up on the saved page.
  { title: "Applications", link: "/applicant/jobs", exact: true },
  { title: "Saved", link: "/applicant/jobs/saved" },
];

/**
 * The applicant's two job lists, as tabs.
 *
 * Links rather than ARIA tabs on purpose: each list is its own route, so it
 * paginates independently, deep-links, and renders on the server. A tablist
 * would claim the panels are already in the document, which they are not.
 *
 * The two lists reached each other through the dashboard sidebar before. With
 * that gone they have to reach each other directly, and a pair of tabs says
 * they are two views of the same thing in a way a sidebar never did.
 */
export function ApplicantJobsTabs({ description }: { description: string }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold text-foreground md:text-xl">
          Your jobs
        </h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <nav
        aria-label="Job lists"
        className="flex w-fit items-center gap-1 rounded-full border border-border bg-muted/60 p-1"
      >
        {TABS.map(({ title, link, exact }) => {
          const isActive = isActiveLink(pathname, link, exact);

          return (
            <Link
              key={title}
              href={link}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                isActive
                  ? "bg-card text-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
