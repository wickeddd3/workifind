import { baseUrl } from "@/config/base-url";

export interface FilterQuery {
  searchQuery: string;
  employmentType: string;
  salary: string;
  locationType: string;
  jobsPerPage?: number;
  page?: number;
}

export const filterJobs = async ({
  searchQuery,
  employmentType,
  salary,
  locationType,
  jobsPerPage,
  page,
}: FilterQuery) => {
  try {
    const searchParams = new URLSearchParams({
      ...(searchQuery && { searchQuery: searchQuery.trim() }),
      ...(employmentType && { employmentType }),
      ...(salary && { salary }),
      ...(locationType && { locationType }),
      ...(jobsPerPage && { jobsPerPage: jobsPerPage.toString() }),
      ...(page && { page: page.toString() }),
    });

    const response = await fetch(
      `${baseUrl}/api/jobs?${searchParams.toString()}`,
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const filterJobsCount = async ({
  searchQuery,
  employmentType,
  salary,
  locationType,
}: FilterQuery) => {
  try {
    const searchParams = new URLSearchParams({
      ...(searchQuery && { searchQuery: searchQuery.trim() }),
      ...(employmentType && { employmentType }),
      ...(salary && { salary }),
      ...(locationType && { locationType }),
    });

    const response = await fetch(
      `${baseUrl}/api/jobs/count?${searchParams.toString()}`,
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
