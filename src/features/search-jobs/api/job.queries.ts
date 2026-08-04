import { unstable_cache } from "next/cache";

import type { Job } from "@/entities/job";

import {
  type JobSort,
  normalizeLocation,
  searchJobs,
  searchJobsCount,
} from "./job.service";

/**
 * Invalidated by every action that changes what the search can return. Kept
 * here rather than in the actions' own slices so the producer of the cache owns
 * the name.
 */
export const JOBS_SEARCH_TAG = "jobs-search";

/**
 * The count behind the results header, memoized across requests.
 *
 * Selecting a job re-renders the whole route — `?job=` is a fresh URL, so the
 * results panel is rebuilt even though its filters did not change. The list
 * query has to re-run (see below), but the COUNT does not, and it is the
 * expensive half: it scans the whole matching set rather than one page of it.
 *
 * A number survives the cache's JSON round trip intact, which is exactly what
 * makes this safe to cache and the list query not.
 */
const cachedSearchJobsCount = unstable_cache(
  searchJobsCount,
  ["search-jobs-count"],
  // The tag covers job mutations; the window bounds everything else that can
  // move a count without going through them — an employer editing its industry,
  // or a row changed outside the app.
  { tags: [JOBS_SEARCH_TAG], revalidate: 60 },
);

/**
 * The facets the results page filters on. Kept as one type so the list query
 * and the count query cannot take different sets — a count that disagrees with
 * the page it labels is worse than either being wrong alone.
 */
interface JobSearchFilters {
  query: string;
  employmentType: string;
  salary: string;
  locationType: string;
  location: string;
  industry: string;
}

/**
 * Deliberately not wrapped in `unstable_cache`, unlike the count beside it: the
 * cache serializes through JSON, which would hand back `createdAt` as a string
 * while the `Job` type still claims `Date`. `relativeDate` passes it straight to
 * date-fns, which stopped coercing strings in v3 — every card's "Posted …" would
 * render Invalid Date, and nothing in the types would say so.
 */
export async function searchJobsQuery(
  queryParams: JobSearchFilters & {
    size: number;
    page: number;
    sort: JobSort;
  },
): Promise<{ success: boolean; data: Job[] | null; message: string }> {
  try {
    // Destructure query parameters
    const {
      query = "",
      employmentType = "",
      salary = "",
      locationType = "",
      location = "",
      industry = "",
      size = 10,
      page = 1,
      sort = "newest",
    } = queryParams;

    // Calculate the number of rows to skip
    const skip = (page - 1) * size;

    // Passed through as plain text: the service uses `plainto_tsquery`, which
    // tokenizes and ANDs the terms itself. Pre-joining with " & " would leave
    // literal ampersands in the search text.
    const searchString = query?.trim() ?? "";

    const results = await searchJobs({
      query: searchString,
      employmentType,
      salary,
      locationType,
      location: normalizeLocation(location),
      industry,
      take: size,
      skip,
      sort,
    });

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: [], message: "Query failed" };
  }
}

export async function searchJobsCountQuery(
  queryParams: JobSearchFilters,
): Promise<{ success: boolean; data: number | null; message: string }> {
  try {
    // Destructure query parameters
    const {
      query = "",
      employmentType = "",
      salary = "",
      locationType = "",
      location = "",
      industry = "",
    } = queryParams;

    // See searchJobsQuery — plain text, not to_tsquery syntax.
    const searchString = query?.trim() ?? "";

    const results = await cachedSearchJobsCount({
      query: searchString,
      employmentType,
      salary,
      locationType,
      location: normalizeLocation(location),
      industry,
    });

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: 0, message: "Query failed" };
  }
}
