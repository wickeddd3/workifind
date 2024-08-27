import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const searchParams = request.nextUrl.searchParams;
  const takeParam = searchParams.get("take");
  const skipParam = searchParams.get("skip");
  const take = takeParam ? parseInt(takeParam) : 5;
  const skip = skipParam ? parseInt(skipParam) : 0;

  try {
    const jobs = await prisma.job.findMany({
      where: { authorId: parseInt(id) },
      include: {
        jobApplications: true,
      },
      take,
      skip,
    });

    if (!jobs) {
      return NextResponse.json({ error: "Jobs not found" }, { status: 404 });
    }

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while fetching jobs data" },
      { status: 500 },
    );
  }
}
