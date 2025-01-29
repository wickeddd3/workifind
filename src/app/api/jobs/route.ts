import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
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
      jobsPerPage = "10",
      page = "1",
    } = Object.fromEntries(searchParams);
    // Calculate the number of rows to skip
    const rowsToSkip = (parseInt(page) - 1) * parseInt(jobsPerPage);
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
      take: jobsPerPage ? parseInt(jobsPerPage) : 10, // limit,
      skip: rowsToSkip, // offset,
    });
    // If no jobs are found, return a 404 response
    if (!jobs) {
      return NextResponse.json({ error: "No jobs found" }, { status: 404 });
    }
    // Return the list of jobs
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while fetching list of jobs" },
      { status: 500 },
    );
  }
}
