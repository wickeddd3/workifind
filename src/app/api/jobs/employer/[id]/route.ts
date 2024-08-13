import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  try {
    const jobs = await prisma.job.findMany({
      where: { authorId: parseInt(id) },
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
