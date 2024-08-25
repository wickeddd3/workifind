import { searchCompanies, searchCompaniesCount } from "@/actions/companies";
import CompanySearchResultItem from "@/components/companies/CompanySearchResultItem";
import { cn } from "@/lib/utils";
import { CompanyFilterValues } from "@/lib/validation";
import { Employer } from "@prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CompanySearchResultsProps {
  filterValues: CompanyFilterValues;
  page?: number;
}

export default async function CompanySearchResults({
  filterValues,
  page = 1,
}: CompanySearchResultsProps) {
  const { q } = filterValues;
  const jobsPerPage = 10;
  const skip = (page - 1) * jobsPerPage;
  const query = {
    query: q ?? "",
    take: jobsPerPage,
    skip,
  };

  const [companies, totalResults] = await Promise.all([
    searchCompanies(query),
    searchCompaniesCount(q ?? ""),
  ]);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col space-y-4">
        {companies.map((company: Employer) => (
          <Link href={`/companies/${company.slug}`} key={company.slug}>
            <CompanySearchResultItem company={company} />
          </Link>
        ))}
      </div>
      {companies.length === 0 && (
        <p className="m-auto text-center">No companies found.</p>
      )}
      {companies.length > 0 && (
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
  filterValues: CompanyFilterValues;
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

    return `/companies/search?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
