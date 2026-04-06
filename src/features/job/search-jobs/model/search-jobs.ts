import { Job } from "@/entities/job";
import { searchJobs, searchJobsCount } from "../api/actions";

export interface FilterQuery {
  searchQuery: string;
  employmentType: string;
  salary: string;
  locationType: string;
  size?: number;
  page?: number;
}

export async function filterJobs(searchParams: FilterQuery): Promise<Job[]> {
  try {
    const jobs = await searchJobs(searchParams);

    return jobs;
  } catch (error) {
    return [];
  }
}

export const filterJobsCount = async (
  searchParams: FilterQuery,
): Promise<number> => {
  try {
    const jobsCount = await searchJobsCount(searchParams);

    return jobsCount;
  } catch (error) {
    return 0;
  }
};
