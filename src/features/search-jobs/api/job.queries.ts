import type { Job } from "@/entities/job";

import {
  type JobSort,
  normalizeLocation,
  searchJobs,
  searchJobsCount,
} from "./job.service";

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

    const results = await searchJobsCount({
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
