import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;
    // Parse the URL
    const { searchParams } = new URL(request.url);
    // Destructure query parameters
    const { jobsPerPage = "10", page = "1" } = Object.fromEntries(searchParams);
    // Calculate the number of rows to skip
    const rowsToSkip = (parseInt(page) - 1) * parseInt(jobsPerPage);
    // Fetch saved jobs from the database that match to userId
    const savedJobs = await prisma.savedJob.findMany({
      where: { userId },
      include: {
        job: {
          include: {
            employer: true,
          },
        },
      },
      take: jobsPerPage ? parseInt(jobsPerPage) : 10, // limit,
      skip: rowsToSkip, // offset,
    });

    if (!savedJobs) {
      return NextResponse.json(
        { error: "Saved Jobs not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(savedJobs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while fetching saved jobs data" },
      { status: 500 },
    );
  }
}
