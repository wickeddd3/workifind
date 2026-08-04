import {
  searchCompaniesCountQuery,
  searchCompaniesQuery,
} from "../api/companies.queries";
import type { CompanySort } from "../api/companies.service";
import { ActiveFilters } from "./ActiveFilters";
import { EmptyPlaceholder } from "./EmptyPlaceholder";
import { SearchPagination } from "./SearchPagination";
import { SearchResults } from "./SearchResults";
import { SearchResultsHeader } from "./SearchResultsHeader";

/** Anything the URL offers that we do not implement falls back to recency. */
function parseSort(sort?: string): CompanySort {
  if (sort === "jobs") return "jobs";
  if (sort === "name") return "name";
  return "newest";
}

export async function SearchContent({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { q, page, location, industry, hiring, sort } = searchParams;

  const perPage = 10;
  const currentPage = page ? parseInt(page) : 1;
  const filters = {
    query: q ?? "",
    location: location ?? "",
    industry: industry ?? "",
    hiring: hiring ?? "",
  };

  const [results, totalResults] = await Promise.all([
    searchCompaniesQuery({
      ...filters,
      size: perPage,
      page: currentPage,
      sort: parseSort(sort),
    }),
    searchCompaniesCountQuery(filters),
  ]);

  const companies = results.data ?? [];
  const total = totalResults.data ?? 0;

  // The chips stay visible on an empty result set — they are both the
  // explanation for it and the way back out.
  return (
    <div className="flex flex-col gap-4">
      <ActiveFilters searchParams={searchParams} />

      {companies.length === 0 ? (
        <EmptyPlaceholder />
      ) : (
        <>
          <SearchResultsHeader
            totalResults={total}
            searchParams={searchParams}
          />
          <SearchResults
            companies={companies}
            searchParams={searchParams}
            page={currentPage}
          />
          <SearchPagination
            currentPage={currentPage}
            totalPages={Math.ceil(total / perPage)}
            searchParams={searchParams}
          />
        </>
      )}
    </div>
  );
}
