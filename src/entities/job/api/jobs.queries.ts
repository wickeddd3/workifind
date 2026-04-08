"use server";

import prisma from "@/shared/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { Job } from "@/entities/job";

export async function searchJobs(searchParams: {
  searchQuery: string;
  employmentType: string;
  salary: string;
  locationType: string;
  size?: number;
  page?: number;
}): Promise<Job[]> {
  try {
    // Destructure query parameters
    const {
      searchQuery = "",
      employmentType = "",
      salary = "",
      locationType = "",
      size = 10,
      page = 1,
    } = searchParams;
    // Calculate the number of rows to skip
    const rowsToSkip = (page - 1) * size;
    // Construct the search query
    const searchString = searchQuery
      ?.split(" ")
      .filter((word) => word.length > 0)
      .join(" & ");
    // Construct the search filter
    const searchFilter: Prisma.JobWhereInput = searchString
      ? {
          OR: [
            { title: { search: searchString } },
            { location: { search: searchString } },
          ],
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
    const jobs = await prisma.job.findMany({
      where, // Apply the where clause
      orderBy: { createdAt: "desc" }, // Sort by createdAt in descending order
      include: {
        employer: true, // Include employer details
      },
      take: size || 10, // limit,
      skip: rowsToSkip, // offset,
    });

    // Return the list of jobs
    return jobs;
  } catch (error) {
    return [];
  }
}

export async function searchJobsCount(searchParams: {
  searchQuery: string;
  employmentType: string;
  salary: string;
  locationType: string;
}): Promise<number> {
  try {
    // Destructure query parameters
    const {
      searchQuery = "",
      employmentType = "",
      salary = "",
      locationType = "",
    } = searchParams;
    // Construct the search query
    const searchString = searchQuery
      ?.split(" ")
      .filter((word) => word.length > 0)
      .join(" & ");
    // Construct the search filter
    const searchFilter: Prisma.JobWhereInput = searchString
      ? {
          OR: [
            { title: { search: searchString } },
            { location: { search: searchString } },
          ],
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
    const jobsCount = await prisma.job.count({ where });

    // Return the jobs count
    return jobsCount;
  } catch (error) {
    return 0;
  }
}

export async function getJobs(
  userId: string,
  searchParams: {
    size?: number;
    page?: number;
  },
): Promise<Job[]> {
  try {
    // Destructure query parameters
    const { size = 10, page = 1 } = searchParams;
    // Calculate the number of rows to skip
    const rowsToSkip = (page - 1) * size;
    // Fetch jobs from the database that match to userId
    const jobs = await prisma.job.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, // Sort by createdAt in descending order
      include: {
        employer: true,
        jobApplications: true,
      },
      take: size, // limit,
      skip: rowsToSkip, // offset,
    });

    return jobs;
  } catch (error) {
    return [];
  }
}

export async function getJobsCount(userId: string): Promise<number> {
  try {
    const jobsCount = await prisma.job.count({
      where: { userId },
    });

    return jobsCount;
  } catch (error) {
    return 0;
  }
}
