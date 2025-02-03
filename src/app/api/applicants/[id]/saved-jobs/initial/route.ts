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
    const { size = "" } = Object.fromEntries(searchParams);
    // Parse size to integer
    const take = parseInt(size) || 8;
    // Fetch initial list of saved jobs from the database that match to userId
    const savedJobs = await prisma.savedJob.findMany({
      where: { userId },
      include: {
        job: {
          include: {
            employer: true,
          },
        },
      },
      take,
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
