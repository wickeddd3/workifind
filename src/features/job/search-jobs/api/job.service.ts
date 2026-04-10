import db from "@/shared/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { Job } from "@/entities/job";

export async function searchJobs(queryParams: {
  query: string;
  employmentType: string;
  salary: string;
  locationType: string;
  take: number;
  skip: number;
}): Promise<Job[]> {
  try {
    const { query, employmentType, salary, locationType, take, skip } =
      queryParams;

    // Construct the search filter
    const searchFilter: Prisma.JobWhereInput = query
      ? {
          OR: [{ title: { search: query } }, { location: { search: query } }],
        }
      : {};

    // Parse salary to integer
    const salaryInt = parseInt(salary || "");

    // Construct the salary filter
    const salaryFilter: Prisma.JobWhereInput = salaryInt
      ? {
          OR: [
            {
              minSalary: {
                lte: salaryInt, // Find jobs where minSalary is less than or equal to the input salary
              },
              maxSalary: {
                gte: salaryInt, // And maxSalary is greater than or equal to the input salary
              },
            },
            {
              minSalary: 0, // Handle cases where minSalary is not set (optional)
              maxSalary: {
                gte: salaryInt, // maxSalary is greater than or equal to the input salary
              },
            },
            {
              minSalary: {
                lte: salaryInt, // Find jobs where minSalary is less than or equal to the input salary
              },
              maxSalary: 0, // Handle cases where maxSalary is not set (optional)
            },
          ],
        }
      : {};

    // Construct the where clause
    const where: Prisma.JobWhereInput = {
      AND: [
        searchFilter,
        salaryFilter,
        employmentType ? { employmentType } : {},
        locationType ? { locationType } : {},
        { approved: true },
      ],
    };

    // Fetch jobs from the database
    return await db.job.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        employer: true,
      },
      take, // limit,
      skip, // offset,
    });
  } catch (error) {
    return [];
  }
}

export async function searchJobsCount(queryParams: {
  query: string;
  employmentType: string;
  salary: string;
  locationType: string;
}): Promise<number> {
  try {
    const { query, employmentType, salary, locationType } = queryParams;

    // Construct the search filter
    const searchFilter: Prisma.JobWhereInput = query
      ? {
          OR: [{ title: { search: query } }, { location: { search: query } }],
        }
      : {};

    // Parse salary to integer
    const salaryInt = parseInt(salary || "");

    // Construct the salary filter
    const salaryFilter: Prisma.JobWhereInput = salaryInt
      ? {
          OR: [
            {
              minSalary: {
                lte: salaryInt, // Find jobs where minSalary is less than or equal to the input salary
              },
              maxSalary: {
                gte: salaryInt, // And maxSalary is greater than or equal to the input salary
              },
            },
            {
              minSalary: 0, // Handle cases where minSalary is not set (optional)
              maxSalary: {
                gte: salaryInt, // maxSalary is greater than or equal to the input salary
              },
            },
            {
              minSalary: {
                lte: salaryInt, // Find jobs where minSalary is less than or equal to the input salary
              },
              maxSalary: 0, // Handle cases where maxSalary is not set (optional)
            },
          ],
        }
      : {};

    // Construct the where clause
    const where: Prisma.JobWhereInput = {
      AND: [
        searchFilter,
        salaryFilter,
        employmentType ? { employmentType } : {},
        locationType ? { locationType } : {},
        { approved: true },
      ],
    };

    // Count the number of jobs that match the search criteria
    return await db.job.count({ where });
  } catch (error) {
    return 0;
  }
}
