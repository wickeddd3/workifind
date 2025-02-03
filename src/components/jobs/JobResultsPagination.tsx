import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { JobFilterSchemaType } from "@/schema/job-filter";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterSchemaType;
  jobSlug?: string;
}

export default function JobResultsPagination({
  currentPage,
  totalPages,
  filterValues: { q, employmentType, salary, locationType },
  jobSlug,
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(employmentType && { employmentType }),
      ...(salary && { salary }),
      ...(locationType && { locationType }),
      ...(jobSlug && { job: jobSlug }),
      ...(page && { page: page.toString() }),
    });

    return `/jobs?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 text-xs font-semibold text-gray-950 md:text-sm lg:text-md",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="text-xs font-semibold text-gray-950 md:text-sm lg:text-md">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 text-xs font-semibold text-gray-950 md:text-sm lg:text-md",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
