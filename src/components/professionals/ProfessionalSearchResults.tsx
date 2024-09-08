import {
  searchProfessionals,
  searchProfessionalsCount,
} from "@/actions/professionals";
import ProfessionalSearchResultItem from "@/components/professionals/ProfessionalSearchResultItem";
import { cn } from "@/lib/utils";
import { ProfessionalFilterValues } from "@/lib/validation";
import { Applicant } from "@prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProfessionalSearchEmptyPlaceholder from "@/components/professionals/ProfessionalSearchEmptyPlaceholder";

interface ProfessionalSearchResultsProps {
  filterValues: ProfessionalFilterValues;
  page?: number;
}

export default async function ProfessionalSearchResults({
  filterValues,
  page = 1,
}: ProfessionalSearchResultsProps) {
  const { q } = filterValues;
  const jobsPerPage = 10;
  const skip = (page - 1) * jobsPerPage;
  const query = {
    query: q ?? "",
    take: jobsPerPage,
    skip,
  };

  const [professionals, totalResults] = await Promise.all([
    searchProfessionals(query),
    searchProfessionalsCount(q ?? ""),
  ]);

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <div className="flex h-full w-full flex-col gap-4">
        {professionals.map((professional: Applicant) => (
          <Link
            href={`/professionals/${professional.id}`}
            key={professional.id}
          >
            <ProfessionalSearchResultItem professional={professional} />
          </Link>
        ))}
      </div>
      {professionals.length === 0 && <ProfessionalSearchEmptyPlaceholder />}
      {professionals.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / jobsPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: ProfessionalFilterValues;
}

function Pagination({
  currentPage,
  totalPages,
  filterValues: { q },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(page && { page: page.toString() }),
    });

    return `/professionals/search?${searchParams.toString()}`;
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
