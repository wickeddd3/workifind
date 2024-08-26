import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const searchParams = request.nextUrl.searchParams;
  const takeParam = searchParams.get("take") ?? "0";
  const take = parseInt(takeParam) || 6;

  try {
    const savedJobs = await prisma.savedJob.findMany({
      where: { applicantId: parseInt(id) },
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

    return NextResponse.json({ savedJobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while fetching saved jobs data" },
      { status: 500 },
    );
  }
}
