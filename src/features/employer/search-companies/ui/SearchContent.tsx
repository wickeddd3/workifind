import { searchCompanies, searchCompaniesCount } from "@/entities/employer";
import { EmptyPlaceholder } from "./EmptyPlaceholder";
import { SearchPagination } from "./SearchPagination";
import { SearchResults } from "./SearchResults";

export async function SearchContent({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { q, page } = searchParams;
  const jobsPerPage = 10;
  const currentPage = page ? parseInt(page) : 1;

  const [results, totalResults] = await Promise.all([
    searchCompanies({
      query: q,
      size: jobsPerPage,
      page: currentPage,
    }),
    searchCompaniesCount({ query: q }),
  ]);

  const hasResults = results && results.length > 0;

  return (
    <div className="flex h-full w-full flex-col gap-6">
      {hasResults && (
        <>
          <SearchResults companies={results} />
          <SearchPagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalResults / jobsPerPage)}
            query={q}
          />
        </>
      )}
      {!hasResults && <EmptyPlaceholder />}
    </div>
  );
}
