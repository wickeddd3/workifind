import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  try {
    const savedJobsCount = await prisma.savedJob.count({
      where: { applicantId: parseInt(id) },
    });

    if (!savedJobsCount) {
      return NextResponse.json(
        { error: "No saved jobs count" },
        { status: 404 },
      );
    }

    return NextResponse.json({ savedJobsCount }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching saved jobs count" },
      { status: 500 },
    );
  }
}
