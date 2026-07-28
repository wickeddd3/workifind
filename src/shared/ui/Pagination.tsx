import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/shared/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** Builds the href for a page. The only thing that varied between the three
   *  copies this replaces, so it is the one thing callers supply. */
  getPageHref: (page: number) => string;
  /** Names the landmark, e.g. "Job results pages". */
  label: string;
  /** Split-pane lists pass false to keep the detail pane where it is. */
  scroll?: boolean;
  className?: string;
}

/**
 * Page numbers around the current page, with ellipses standing in for the runs
 * they replace. Always yields the first and last page, so the ends of a long
 * result set stay one click away.
 */
function pageWindow(currentPage: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages]);
  for (let page = currentPage - 1; page <= currentPage + 1; page++) {
    if (page >= 1 && page <= totalPages) pages.add(page);
  }

  const ordered = Array.from(pages).sort((a, b) => a - b);

  return ordered.flatMap((page, index) => {
    const previous = ordered[index - 1];
    // A single missing page is worth rendering outright — an ellipsis standing
    // in for exactly one number costs a click and saves no space.
    if (previous && page - previous === 2) return [previous + 1, page];
    if (previous && page - previous > 2) return ["ellipsis" as const, page];
    return [page];
  });
}

const stepClasses =
  "inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-muted hover:text-primary md:text-sm";

/**
 * The pager for every paginated list in the app.
 *
 * There were three of these: the jobs pager, and a pair under search-companies
 * and search-professionals that were identical but for a route string — so a
 * fix like "hide it on a single page" had to be made in each, and the two
 * search lists never gained the numbered pages the jobs list had.
 */
export function Pagination({
  currentPage,
  totalPages,
  getPageHref,
  label,
  scroll = true,
  className,
}: PaginationProps) {
  // A single page needs no pager — "Page 1 of 1" beside two dead arrows is
  // chrome that states the obvious.
  if (totalPages <= 1) return null;

  return (
    <nav
      className={cn("flex items-center justify-between gap-2 pt-2", className)}
      aria-label={label}
    >
      <Link
        href={getPageHref(currentPage - 1)}
        scroll={scroll}
        className={cn(
          stepClasses,
          currentPage <= 1 && "pointer-events-none invisible",
        )}
        aria-disabled={currentPage <= 1}
      >
        <ArrowLeft size={16} aria-hidden="true" />
        <span className="hidden sm:inline">Previous</span>
      </Link>

      <ol className="flex items-center gap-1">
        {pageWindow(currentPage, totalPages).map((page, index) =>
          page === "ellipsis" ? (
            <li
              key={`gap-${index}`}
              className="px-1 text-sm text-muted-foreground"
              aria-hidden="true"
            >
              …
            </li>
          ) : (
            <li key={page}>
              <Link
                href={getPageHref(page)}
                scroll={scroll}
                aria-current={page === currentPage ? "page" : undefined}
                className={cn(
                  "tabular inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2.5 text-sm font-semibold transition-colors",
                  page === currentPage
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {page}
              </Link>
            </li>
          ),
        )}
      </ol>

      <Link
        href={getPageHref(currentPage + 1)}
        scroll={scroll}
        className={cn(
          stepClasses,
          currentPage >= totalPages && "pointer-events-none invisible",
        )}
        aria-disabled={currentPage >= totalPages}
      >
        <span className="hidden sm:inline">Next</span>
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </nav>
  );
}
