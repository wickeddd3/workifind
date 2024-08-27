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
    const jobApplications = await prisma.jobApplication.findMany({
      where: { applicantId: parseInt(id) },
      include: {
        job: true,
      },
      take,
      skip,
    });

    if (!jobApplications) {
      return NextResponse.json(
        { error: "Job applications not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ jobApplications }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while fetching job applications data" },
      { status: 500 },
    );
  }
}
