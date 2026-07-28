import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/shared/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  query: string;
}

export function SearchPagination({
  currentPage,
  totalPages,
  query,
}: PaginationProps) {
  // A single page of results needs no pager — "Page 1 of 1" beside two dead
  // arrows is chrome that states the obvious. Matches the jobs pager.
  if (totalPages <= 1) return null;

  const q = query;

  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(page && { page: page.toString() }),
    });

    return `/professionals/search?${searchParams.toString()}`;
  }

  return (
    <div className="flex items-center justify-between pt-2">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-border hover:bg-muted hover:text-primary md:text-sm",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Previous
      </Link>
      <span className="text-xs font-medium text-muted-foreground md:text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-border hover:bg-muted hover:text-primary md:text-sm",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}
