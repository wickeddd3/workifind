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
  const q = query;

  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(page && { page: page.toString() }),
    });

    return `/companies/search?${searchParams.toString()}`;
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
