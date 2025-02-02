import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;

    const jobsCount = await prisma.job.count({
      where: { userId },
    });

    if (!jobsCount) {
      return NextResponse.json({ error: "No jobs count" }, { status: 404 });
    }

    return NextResponse.json(jobsCount, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching jobs count" },
      { status: 500 },
    );
  }
}
