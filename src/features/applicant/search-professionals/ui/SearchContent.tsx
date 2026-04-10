import {
  searchProfessionalsCountQuery,
  searchProfessionalsQuery,
} from "../api/professional.queries";
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
    searchProfessionalsQuery({
      query: q,
      size: jobsPerPage,
      page: currentPage,
    }),
    searchProfessionalsCountQuery({ query: q }),
  ]);

  const hasResults = results.data && results.data?.length > 0;

  return (
    <div className="flex h-full w-full flex-col gap-6">
      {hasResults && (
        <>
          <SearchResults professionals={results.data || []} />
          <SearchPagination
            currentPage={currentPage}
            totalPages={Math.ceil((totalResults.data || 0) / jobsPerPage)}
            query={q}
          />
        </>
      )}
      {!hasResults && <EmptyPlaceholder />}
    </div>
  );
}
