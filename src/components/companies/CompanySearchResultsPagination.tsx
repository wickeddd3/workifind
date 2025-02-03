import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CompanyFilterSchemaType } from "@/schema/company-filter";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: CompanyFilterSchemaType;
}

export default function CompanySearchResultsPagination({
  currentPage,
  totalPages,
  filterValues: { q },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(page && { page: page.toString() }),
    });

    return `/companies/search?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 text-sm font-semibold text-gray-950 md:text-md",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="text-sm font-semibold text-gray-950 md:text-md">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 text-sm font-semibold text-gray-950 md:text-md",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
