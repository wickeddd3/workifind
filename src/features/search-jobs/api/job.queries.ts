import type { Job } from "@/entities/job";

import { searchJobs, searchJobsCount } from "./job.service";

export async function searchJobsQuery(queryParams: {
  query: string;
  employmentType: string;
  salary: string;
  locationType: string;
  size: number;
  page: number;
}): Promise<{ success: boolean; data: Job[] | null; message: string }> {
  try {
    // Destructure query parameters
    const {
      query = "",
      employmentType = "",
      salary = "",
      locationType = "",
      size = 10,
      page = 1,
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
      take: size,
      skip,
    });

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: [], message: "Query failed" };
  }
}

export async function searchJobsCountQuery(queryParams: {
  query: string;
  employmentType: string;
  salary: string;
  locationType: string;
}): Promise<{ success: boolean; data: number | null; message: string }> {
  try {
    // Destructure query parameters
    const {
      query = "",
      employmentType = "",
      salary = "",
      locationType = "",
    } = queryParams;

    // See searchJobsQuery — plain text, not to_tsquery syntax.
    const searchString = query?.trim() ?? "";

    const results = await searchJobsCount({
      query: searchString,
      employmentType,
      salary,
      locationType,
    });

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: 0, message: "Query failed" };
  }
}
