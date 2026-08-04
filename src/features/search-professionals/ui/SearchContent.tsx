import { getAuthUser } from "@/shared/lib/clerk.server";

import {
  searchProfessionalsCountQuery,
  searchProfessionalsQuery,
} from "../api/professional.queries";
import type { ProfessionalSort } from "../api/professional.service";
import { ActiveFilters } from "./ActiveFilters";
import { EmptyPlaceholder } from "./EmptyPlaceholder";
import { SearchPagination } from "./SearchPagination";
import { SearchResults } from "./SearchResults";
import { SearchResultsHeader } from "./SearchResultsHeader";

/** Anything the URL offers that we do not implement falls back to recency. */
function parseSort(sort?: string): ProfessionalSort {
  if (sort === "availability") return "availability";
  if (sort === "name") return "name";
  return "newest";
}

export async function SearchContent({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const {
    q,
    page,
    location,
    employmentType,
    locationType,
    availability,
    experienced,
    sort,
  } = searchParams;

  const perPage = 10;
  const currentPage = page ? parseInt(page) : 1;
  const filters = {
    query: q ?? "",
    location: location ?? "",
    employmentType: employmentType ?? "",
    locationType: locationType ?? "",
    availability: availability ?? "",
    experienced: experienced ?? "",
  };

  // `getAuthUser` is `cache`d per request, so resolving it here as well as in
  // the detail pane costs one lookup between them.
  const [results, totalResults, { userId, role }] = await Promise.all([
    searchProfessionalsQuery({
      ...filters,
      size: perPage,
      page: currentPage,
      sort: parseSort(sort),
    }),
    searchProfessionalsCountQuery(filters),
    getAuthUser(),
  ]);

  const professionals = results.data ?? [];
  const total = totalResults.data ?? 0;

  // The chips stay visible on an empty result set — they are both the
  // explanation for it and the way back out.
  return (
    <div className="flex flex-col gap-4">
      <ActiveFilters searchParams={searchParams} />

      {professionals.length === 0 ? (
        <EmptyPlaceholder />
      ) : (
        <>
          <SearchResultsHeader
            totalResults={total}
            searchParams={searchParams}
          />
          <SearchResults
            professionals={professionals}
            searchParams={searchParams}
            page={currentPage}
            viewerUserId={userId}
            viewerRole={role}
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
