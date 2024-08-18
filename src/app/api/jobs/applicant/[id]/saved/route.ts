import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  try {
    const savedJobs = await prisma.savedJob.findMany({
      where: { applicantId: parseInt(id) },
      include: {
        job: true,
      },
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
