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
    // Fetch jobs from the database that match to userId
    const jobs = await prisma.job.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, // Sort by createdAt in descending order
      include: {
        jobApplications: true,
      },
      take: jobsPerPage ? parseInt(jobsPerPage) : 10, // limit,
      skip: rowsToSkip, // offset,
    });

    if (!jobs) {
      return NextResponse.json({ error: "Jobs not found" }, { status: 404 });
    }

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while fetching jobs data" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;
    const requestBody = await request.json();

    const { employerId, form } = requestBody;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (!employerId) {
      return NextResponse.json(
        {
          error:
            "No profile, Auth user needs to have a profile before creating a job",
        },
        { status: 400 },
      );
    }

    const job = await prisma.job.create({
      data: {
        userId,
        employerId,
        ...form,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while creating job" },
      { status: 500 },
    );
  }
}
