import {
  searchProfessionalsProfile,
  searchProfessionalsProfileCount,
} from "../model/search-professionals";
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
    searchProfessionalsProfile({
      query: q,
      size: jobsPerPage,
      page: currentPage,
    }),
    searchProfessionalsProfileCount({ query: q }),
  ]);

  const hasResults = results && results?.length > 0;

  return (
    <div className="flex h-full w-full flex-col gap-6">
      {hasResults && (
        <>
          <SearchResults professionals={results} />
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
