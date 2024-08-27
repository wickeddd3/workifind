import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  try {
    const jobsCount = await prisma.job.count({
      where: { authorId: parseInt(id) },
    });

    if (!jobsCount) {
      return NextResponse.json({ error: "No jobs count" }, { status: 404 });
    }

    return NextResponse.json({ jobsCount }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching jobs count" },
      { status: 500 },
    );
  }
}
