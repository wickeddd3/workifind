import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;

  try {
    const job = await prisma.job.findUnique({
      where: { slug },
      include: {
        employer: true,
        jobApplications: true,
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ job }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching job data" },
      { status: 500 },
    );
  }
}
