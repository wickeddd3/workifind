import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  try {
    // Parse the URL
    const { searchParams } = new URL(request.url);
    // Destructure query parameters
    const {
      searchQuery = "",
      employmentType = "",
      salary = "",
      locationType = "",
    } = Object.fromEntries(searchParams);
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
    // If no jobs count are found, return a 404 response
    if (!jobsCount) {
      return NextResponse.json(
        { error: "No jobs count found" },
        { status: 404 },
      );
    }
    // Return the jobs count
    return NextResponse.json(jobsCount, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while fetching jobs count" },
      { status: 500 },
    );
  }
}
